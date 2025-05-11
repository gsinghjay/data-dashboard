import requests
import os
import zipfile
from pathlib import Path
import time
import pandas as pd

# --- Configuration ---
BASE_DOWNLOAD_DIR = Path("acs_pums_data")
YEARS_TO_DOWNLOAD = range(2005, 2024)  # 2005 to 2023 inclusive

# --- Year-specific configurations ---
# For PUMS_DATA_URL_TEMPLATE, None means use the default below.
# For PUMS_CSV_TEMPLATES_IN_ZIP: list of lists of CSV name pairs to try.
# {yy} will be replaced by the 2-digit year.
YEAR_CONFIGS = {
    "default": {
        "pums_data_url_template": "https://www2.census.gov/programs-surveys/acs/data/pums/{year}/1-Year/csv_pus.zip",
        "pums_csv_templates_in_zip": [
            ["psam_pusa.csv", "psam_pusb.csv"],  # Common for recent years (e.g., 2017+, verify!)
            ["ss{yy}pusa.csv", "ss{yy}pusb.csv"] # Common for mid-years (e.g., 2007-2016, verify!)
        ],
        "data_dict_url_templates": [ # List of patterns to try for data dictionaries
            "https://www2.census.gov/programs-surveys/acs/tech_docs/pums/data_dict/PUMS_Data_Dictionary_{year}.pdf",
            "https://www2.census.gov/programs-surveys/acs/tech_docs/pums/PUMS_Data_Dictionary_{year}.pdf",
            "https://www2.census.gov/programs-surveys/acs/tech_docs/pums/data_dict/{year}_PUMS_Data_Dictionary.pdf",
            "https://www2.census.gov/acs/www/Downloads/PUMS/PUMSDataDict{yy}.pdf"
        ]
    },
    2020: { # Updated with specific experimental path
        "pums_data_url_template": "https://www2.census.gov/programs-surveys/acs/experimental/2020/data/pums/1-Year/csv_pus.zip",
        "pums_csv_templates_in_zip": [
            ["psam_pusa.csv", "psam_pusb.csv"] # VERIFY CSV NAMES INSIDE THIS 2020 EXPERIMENTAL ZIP
        ],
        "data_dict_url_templates": [ # Try to find the 2020 experimental dictionary
            "https://www2.census.gov/programs-surveys/acs/experimental/2020/tech_docs/pums/PUMS_Data_Dictionary_2020_Experimental.pdf", # HYPOTHETICAL
            "https://www2.census.gov/programs-surveys/acs/tech_docs/pums/data_dict/PUMS_Data_Dictionary_2020.pdf"
        ]
    },
    2005: {
        # We are NOT using separate_ab_zips for 2005 based on this new directory listing
        "use_separate_ab_zips": False, # Set to False
        "pums_data_url_template": "https://www2.census.gov/programs-surveys/acs/data/pums/2005/csv_pus.zip", # Direct URL to the main PUMS zip for 2005
        "pums_csv_templates_in_zip": [ # List of pairs of CSV names to look for *inside* the above csv_pus.zip
            ["pusa.csv", "pusb.csv"],        # Most likely for 2005 based on older conventions
            ["ss05pusa.csv", "ss05pusb.csv"] # Less likely if not prefixed in the zip, but good to check
        ],
        "data_dict_url_templates": [] # USER ACTION: Find and add the actual 2005 Data Dictionary URL(s) here
                                      # e.g., ["https://www.census.gov/acs/www/Downloads/PUMS/PUMSDataDict05.pdf"] (This is a guess)
    },
    2006: {
        "use_separate_ab_zips": True,
        "pums_data_url_part_a": "https://www2.census.gov/programs-surveys/acs/data/pums/2006/csv_pusa.zip",
        "pums_data_url_part_b": "https://www2.census.gov/programs-surveys/acs/data/pums/2006/csv_pusb.zip",
        "pums_csv_in_zip_part_a": "ss06pusa.csv", # Exact name of CSV inside csv_pusa.zip for 2006
        "pums_csv_in_zip_part_b": "ss06pusb.csv", # Exact name of CSV inside csv_pusb.zip for 2006
        "data_dict_url_templates": ["https://www2.census.gov/programs-surveys/acs/data/pums/2006/PUMS_Data_Dictionary_2006.pdf"] # Replace with actual 2006 dictionary URL
    }
}
OUTPUT_CSV_FILENAME_TEMPLATE = "person_records_{year}.csv"

def download_file(url, save_path, year_for_debug=""):
    """Downloads a file from a URL to a specified path."""
    try:
        print(f"  Attempting download for {year_for_debug}: {url}")
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, stream=True, headers=headers, timeout=120)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=81920):
                f.write(chunk)
        print(f"  Successfully downloaded: {save_path.name}")
        return True
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            print(f"  NOT FOUND (404) for {year_for_debug}: {url}")
        else:
            print(f"  HTTP Error downloading {url} for {year_for_debug}: {e}")
    except requests.exceptions.RequestException as e:
        print(f"  Error downloading {url} for {year_for_debug}: {e}")
    return False

def extract_single_csv_from_zip(zip_path, expected_csv_name_in_zip, target_csv_save_path, year):
    """Extracts a single named CSV from a ZIP to a target path."""
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            archive_file_list = zip_ref.namelist()
            print(f"    Files in {zip_path.name} for year {year}: {archive_file_list}")

            actual_csv_member = None
            for member in archive_file_list:
                if member.lower() == expected_csv_name_in_zip.lower():
                    actual_csv_member = member
                    break
            
            if actual_csv_member:
                print(f"    Extracting '{actual_csv_member}' to '{target_csv_save_path.name}'")
                with zip_ref.open(actual_csv_member) as source_csv_in_zip:
                    with open(target_csv_save_path, 'wb') as target_file:
                        target_file.write(source_csv_in_zip.read())
                print(f"    Successfully extracted '{actual_csv_member}' to '{target_csv_save_path.name}'")
                return True
            else:
                print(f"    ERROR: CSV '{expected_csv_name_in_zip}' not found in {zip_path.name}. Available: {archive_file_list}")
                return False
    except zipfile.BadZipFile:
        print(f"  Error: Bad ZIP file {zip_path.name}")
    except Exception as e:
        print(f"  An error occurred during extraction of {expected_csv_name_in_zip} for {year}: {e}")
    return False

def extract_and_combine_pums_csvs(zip_path, csv_templates_in_zip, year_dir, combined_csv_path, year):
    """Extracts and combines person-level CSVs (A/B parts) from a single ZIP archive."""
    yy = str(year)[2:]
    extracted_parts_paths = [] # Store paths of successfully extracted CSV parts
    
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            archive_file_list = zip_ref.namelist()
            print(f"    Files in {zip_path.name}: {archive_file_list}")

            found_pair = False
            for template_pair in csv_templates_in_zip:
                file_a_name_template = template_pair[0]
                file_b_name_template = template_pair[1]

                file_a_name = file_a_name_template.format(yy=yy) if "{yy}" in file_a_name_template else file_a_name_template
                file_b_name = file_b_name_template.format(yy=yy) if "{yy}" in file_b_name_template else file_b_name_template

                actual_file_a = None
                actual_file_b = None

                for name_in_archive in archive_file_list:
                    if name_in_archive.lower() == file_a_name.lower():
                        actual_file_a = name_in_archive
                    if name_in_archive.lower() == file_b_name.lower():
                        actual_file_b = name_in_archive
                
                if actual_file_a and actual_file_b:
                    print(f"    Found pair: '{actual_file_a}' and '{actual_file_b}' using templates '{file_a_name}', '{file_b_name}'")
                    current_attempt_extracted_paths = []
                    try:
                        temp_path_a = year_dir / actual_file_a
                        zip_ref.extract(actual_file_a, path=year_dir)
                        current_attempt_extracted_paths.append(temp_path_a)

                        temp_path_b = year_dir / actual_file_b
                        zip_ref.extract(actual_file_b, path=year_dir)
                        current_attempt_extracted_paths.append(temp_path_b)
                        
                        extracted_parts_paths = current_attempt_extracted_paths # Success for this pair
                        found_pair = True
                        break # Found a working pair
                    except Exception as e:
                        print(f"    Error extracting {actual_file_a} or {actual_file_b}: {e}")
                        for part_path in current_attempt_extracted_paths: # Clean up this attempt's files
                            if part_path.exists(): part_path.unlink()
                        extracted_parts_paths = [] # Reset for next template pair
                        continue # Try next template pair
                else:
                    if actual_file_a and not actual_file_b:
                        print(f"    Found file A ('{actual_file_a}') but not file B ('{file_b_name}') for template pair.")
                    elif not actual_file_a and actual_file_b:
                        print(f"    Found file B ('{actual_file_b}') but not file A ('{file_a_name}') for template pair.")

            if not found_pair:
                print(f"    Could not find a suitable A/B pair of CSVs in {zip_path.name} using provided templates: {csv_templates_in_zip}")
                return False

            if len(extracted_parts_paths) == 2:
                print(f"    Combining {extracted_parts_paths[0].name} and {extracted_parts_paths[1].name}...")
                df_a = pd.read_csv(extracted_parts_paths[0], low_memory=False)
                df_b = pd.read_csv(extracted_parts_paths[1], low_memory=False)
                combined_df = pd.concat([df_a, df_b], ignore_index=True)
                combined_df.to_csv(combined_csv_path, index=False)
                print(f"    Successfully combined and saved to: {combined_csv_path.name}")
                return True
            else:
                print(f"    Error: Did not get exactly two CSV parts ({len(extracted_parts_paths)} found) to combine.")
                return False
    except zipfile.BadZipFile:
        print(f"  Error: Bad ZIP file {zip_path.name}")
        return False
    except Exception as e:
        print(f"  An error occurred during extraction/combination from single ZIP for {year}: {e}")
        return False
    finally:
        for part_path in extracted_parts_paths: 
            if part_path.exists():
                print(f"    Cleaning up temporary extracted file: {part_path.name}")
                part_path.unlink()

def main():
    BASE_DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Starting download process. Files will be saved in: {BASE_DOWNLOAD_DIR.resolve()}")
    print("---")

    for year in YEARS_TO_DOWNLOAD:
        print(f"Processing Year: {year}")
        year_dir = BASE_DOWNLOAD_DIR / str(year)
        year_dir.mkdir(parents=True, exist_ok=True)
        yy = str(year)[2:]

        # Start with a copy of the default config
        current_year_config = YEAR_CONFIGS["default"].copy()
        # If a specific config exists for the year, update the current_year_config
        if year in YEAR_CONFIGS:
            for key, value in YEAR_CONFIGS[year].items():
                if value is not None: # Allow specific None in year_config to NOT override a default key if needed
                    current_year_config[key] = value
        
        dict_url_templates = current_year_config.get("data_dict_url_templates", []) # Ensure it's a list

        # --- 1. PUMS Data ---
        final_combined_csv_path = year_dir / OUTPUT_CSV_FILENAME_TEMPLATE.format(year=year)

        if final_combined_csv_path.exists():
            print(f"  Combined PUMS CSV already exists: {final_combined_csv_path.name}")
        else:
            if current_year_config.get("use_separate_ab_zips"):
                # Strategy for years like 2005/2006 with separate ZIPs for pusa and pusb
                url_a = current_year_config.get("pums_data_url_part_a")
                url_b = current_year_config.get("pums_data_url_part_b")
                csv_name_in_zip_a = current_year_config.get("pums_csv_in_zip_part_a")
                csv_name_in_zip_b = current_year_config.get("pums_csv_in_zip_part_b")

                if not (url_a and url_b and csv_name_in_zip_a and csv_name_in_zip_b):
                    print(f"  Configuration for separate A/B ZIPs is incomplete for {year}. Skipping PUMS.")
                else:
                    zip_a_path = year_dir / Path(url_a).name
                    zip_b_path = year_dir / Path(url_b).name
                    
                    downloaded_a_zip = zip_a_path.exists()
                    if not downloaded_a_zip:
                        downloaded_a_zip = download_file(url_a, zip_a_path, year_for_debug=f"{year} PUMS ZIP Part A")
                    
                    downloaded_b_zip = zip_b_path.exists()
                    if not downloaded_b_zip:
                        downloaded_b_zip = download_file(url_b, zip_b_path, year_for_debug=f"{year} PUMS ZIP Part B")

                    if not (downloaded_a_zip and downloaded_b_zip):
                        print(f"  Skipping PUMS for {year}, failed to download Part A or Part B ZIP.")
                        if zip_a_path.exists() and not downloaded_b_zip : zip_a_path.unlink() # Clean up A if B failed
                        if zip_b_path.exists() and not downloaded_a_zip : zip_b_path.unlink() # Clean up B if A failed
                        time.sleep(1); print("---"); continue


                    temp_csv_a_path = year_dir / f"temp_{Path(csv_name_in_zip_a).name}" # Use filename from template
                    temp_csv_b_path = year_dir / f"temp_{Path(csv_name_in_zip_b).name}" # Use filename from template
                    
                    extracted_a = False
                    extracted_b = False

                    if zip_a_path.exists(): # Re-check existence after download attempt
                        extracted_a = extract_single_csv_from_zip(zip_a_path, csv_name_in_zip_a, temp_csv_a_path, year)
                    if zip_b_path.exists(): # Re-check existence
                        extracted_b = extract_single_csv_from_zip(zip_b_path, csv_name_in_zip_b, temp_csv_b_path, year)

                    if extracted_a and extracted_b and temp_csv_a_path.exists() and temp_csv_b_path.exists():
                        print(f"    Combining {temp_csv_a_path.name} and {temp_csv_b_path.name}...")
                        try:
                            df_a = pd.read_csv(temp_csv_a_path, low_memory=False)
                            df_b = pd.read_csv(temp_csv_b_path, low_memory=False)
                            combined_df = pd.concat([df_a, df_b], ignore_index=True)
                            combined_df.to_csv(final_combined_csv_path, index=False)
                            print(f"    Successfully combined and saved to: {final_combined_csv_path.name}")
                        except Exception as e:
                            print(f"    ERROR combining DataFrames for {year}: {e}")
                        finally: # Ensure cleanup even if combination fails
                            if temp_csv_a_path.exists(): temp_csv_a_path.unlink()
                            if temp_csv_b_path.exists(): temp_csv_b_path.unlink()
                            if zip_a_path.exists(): zip_a_path.unlink()
                            if zip_b_path.exists(): zip_b_path.unlink()
                    else:
                        print(f"  Failed to extract one or both CSV parts for {year}. Cleaning up partial files.")
                        if temp_csv_a_path.exists(): temp_csv_a_path.unlink()
                        if temp_csv_b_path.exists(): temp_csv_b_path.unlink()
                        # Keep zips if extraction failed but download succeeded, for manual inspection
            else:
                # Strategy for years with a single main ZIP (e.g., csv_pus.zip) containing two CSVs
                pums_url_template = current_year_config.get("pums_data_url_template")
                pums_csv_templates = current_year_config.get("pums_csv_templates_in_zip")

                if not pums_url_template:
                    print(f"  PUMS URL template not defined for {year}. Skipping PUMS data.")
                else:
                    pums_url = pums_url_template.format(year=year, yy=yy)
                    zip_filename = Path(pums_url).name
                    zip_save_path = year_dir / zip_filename

                    downloaded_main_zip = zip_save_path.exists()
                    if not downloaded_main_zip:
                        downloaded_main_zip = download_file(pums_url, zip_save_path, year_for_debug=f"{year} PUMS ZIP")
                    
                    if not downloaded_main_zip:
                        print(f"  Skipping PUMS data for {year} due to main ZIP download failure.")
                        time.sleep(1); print("---"); continue
                    
                    if zip_save_path.exists(): # Re-check existence
                        if extract_and_combine_pums_csvs(zip_save_path, pums_csv_templates, year_dir, final_combined_csv_path, year):
                            print(f"  Successfully processed PUMS data for {year}.")
                            if zip_save_path.exists():
                                print(f"    Cleaning up ZIP file: {zip_save_path.name}")
                                zip_save_path.unlink()
                        else:
                            print(f"  Failed to extract/combine PUMS data for {year} from single ZIP.")
                    else: # Should not happen if download_main_zip was true
                        print(f"  PUMS ZIP file mysteriously unavailable for {year} at {zip_save_path}")

        # --- 2. Data Dictionary ---
        dict_downloaded_for_year = False
        # More specific glob patterns
        existing_dicts = list(year_dir.glob(f"PUMS_Data_Dictionary_{year}.pdf")) + \
                         list(year_dir.glob(f"PUMS_Data_Dictionary_{yy}.pdf")) + \
                         list(year_dir.glob(f"PUMSDataDict{yy}.pdf")) + \
                         list(year_dir.glob(f"{year}_PUMS_Data_Dictionary.pdf"))


        if existing_dicts:
            # Deduplicate just in case glob patterns overlap
            unique_existing_dicts = list(set(existing_dicts))
            print(f"  Data Dictionary already seems to exist for {year}: {unique_existing_dicts[0].name}")
            dict_downloaded_for_year = True
        
        if not dict_downloaded_for_year:
            if not dict_url_templates:
                print(f"  No data dictionary URL templates defined for {year}.")
            else:
                for i, dict_url_template in enumerate(dict_url_templates):
                    dict_url = dict_url_template.format(year=year, yy=yy)
                    dict_filename_candidate = Path(dict_url).name
                    if '?' in dict_filename_candidate:
                        dict_filename_candidate = dict_filename_candidate.split('?')[0]
                    # Ensure filename is somewhat unique if template is generic
                    if dict_filename_candidate.lower() in ["pums_data_dictionary.pdf", "pumsdatadic.pdf", "datadictionary.pdf"]:
                        dict_filename_candidate = f"PUMS_Data_Dictionary_{year}_{i}.pdf" # Add index to avoid overwrite on generic names

                    dict_save_path = year_dir / dict_filename_candidate
                    
                    if dict_save_path.exists(): # Check again before download
                         print(f"  Data Dictionary already exists (found before download attempt): {dict_save_path.name}")
                         dict_downloaded_for_year = True
                         break

                    print(f"  Trying Data Dictionary URL ({i+1}/{len(dict_url_templates)}): {dict_url}")
                    if download_file(dict_url, dict_save_path, year_for_debug=f"{year} Dictionary"):
                        dict_downloaded_for_year = True
                        break 
                    time.sleep(0.5) 

        if not dict_downloaded_for_year:
            print(f"  Could not download Data Dictionary for {year} using provided templates.")

        print("---")
        time.sleep(1) # Shorter delay between years is probably fine.

    print("\nAll specified years processed.")
    print(f"Data should be in: {BASE_DOWNLOAD_DIR.resolve()}")
    print("Please review the output above for any errors or warnings.")
    print("USER ACTION REQUIRED: Fill in the 'None' placeholders in YEAR_CONFIGS for 2005 & 2006 with your research findings (URLs and internal CSV names).")
    print("Also, verify the CSV names inside the ZIP for 2020 to ensure 'psam_pusa.csv' and 'psam_pusb.csv' are correct for that experimental data.")

if __name__ == "__main__":
    main()