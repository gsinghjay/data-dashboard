# Useful grep and awk Commands for Data Analysis

## Basic Data Exploration

### View CSV Headers
```bash
# View headers for all processed files
head -n 1 etl/data/processed/processed_fda_substances.csv
head -n 1 etl/data/processed/processed_gras_notices.csv
head -n 1 etl/data/processed/processed_who_obesity_data.csv
head -n 1 etl/data/processed/processed_cdc_obesity_data.csv

# List column names with line numbers for reference
head -n 1 etl/data/processed/processed_gras_notices.csv | tr ',' '\n' | nl
```

## FDA Substances Analysis

### Count Records
```bash
# Total FDA substances (minus header)
wc -l etl/data/processed/processed_fda_substances.csv | awk '{print $1-1}'
```

### Technical Effects Distribution
```bash
# Count substances by technical effect
grep -i "FLAVOR" etl/data/processed/processed_fda_substances.csv | wc -l
grep -i "TEXTURE" etl/data/processed/processed_fda_substances.csv | wc -l
grep -i "PROCESSING" etl/data/processed/processed_fda_substances.csv | wc -l
grep -i "NUTRIENT" etl/data/processed/processed_fda_substances.csv | wc -l
grep -i "COLOR" etl/data/processed/processed_fda_substances.csv | wc -l
grep -i "PRESERVATIVE" etl/data/processed/processed_fda_substances.csv | wc -l
```

### Year Range Analysis
```bash
# Extract and sort approval years
cut -d',' -f43 etl/data/processed/processed_fda_substances.csv | grep -E '^[0-9]{4}\.0$' | sed 's/\.0$//' | sort -n | head -n1
cut -d',' -f43 etl/data/processed/processed_fda_substances.csv | grep -E '^[0-9]{4}\.0$' | sed 's/\.0$//' | sort -n | tail -n1
```

## GRAS Notices Analysis

### Count Records
```bash
# Total GRAS notices (minus header)
wc -l etl/data/processed/processed_gras_notices.csv | awk '{print $1-1}'
```

### Date Analysis
```bash
# Extract year range from filing dates
cut -d',' -f7 etl/data/processed/processed_gras_notices.csv | grep -E '[0-9]{4}-[0-9]{2}-[0-9]{2}' | cut -d'-' -f1 | sort -n | head -n1
cut -d',' -f7 etl/data/processed/processed_gras_notices.csv | grep -E '[0-9]{4}-[0-9]{2}-[0-9]{2}' | cut -d'-' -f1 | sort -n | tail -n1

# View sample of dates and years
tail -n +2 etl/data/processed/processed_gras_notices.csv | head -n 10 | cut -d',' -f1,7,30
```

## Obesity Data Analysis

### Count Records
```bash
# Count WHO and CDC records (minus headers)
echo "WHO data: $(( $(wc -l < etl/data/processed/processed_who_obesity_data.csv) - 1 ))"
echo "CDC data: $(( $(wc -l < etl/data/processed/processed_cdc_obesity_data.csv) - 1 ))"
```

### Calculate Obesity Rates
```bash
# Calculate average US obesity rates for 2011 and 2023
awk -F',' 'NR>1 && $1=="2011" && $11!="" {sum11+=$11; count11++}
           NR>1 && $1=="2023" && $11!="" {sum23+=$11; count23++}
           END {printf "2011: %.2f%%\n2023: %.2f%%\n", 
                sum11/count11, sum23/count23}' \
    etl/data/processed/processed_cdc_obesity_data.csv
```

### Year Range Analysis
```bash
# WHO data year range (using DIM_TIME column)
cut -d',' -f5 etl/data/processed/processed_who_obesity_data.csv | grep -E '^[0-9]{4}$' | sort -n | head -n1
cut -d',' -f5 etl/data/processed/processed_who_obesity_data.csv | grep -E '^[0-9]{4}$' | sort -n | tail -n1

# CDC data year range
cut -d',' -f1 etl/data/processed/processed_cdc_obesity_data.csv | grep -E '^[0-9]{4}$' | sort -n | head -n1
cut -d',' -f1 etl/data/processed/processed_cdc_obesity_data.csv | grep -E '^[0-9]{4}$' | sort -n | tail -n1
```

## Advanced AWK Calculations

### Statistical Analysis
```bash
# Calculate mean, variance, and standard deviation of obesity rates
awk -F',' '
    NR>1 && $11!="" { 
        sum += $11
        sumsq += $11 * $11
        count++
    }
    END {
        mean = sum/count
        variance = (sumsq - (sum*sum/count))/count
        stddev = sqrt(variance)
        printf "Mean: %.2f%%\nStd Dev: %.2f%%\nCount: %d\n", 
            mean, stddev, count
    }' etl/data/processed/processed_cdc_obesity_data.csv

# Calculate median obesity rate (requires sorted data)
awk -F',' '
    NR>1 && $11!="" {
        values[NR] = $11
        count++
    }
    END {
        if (count % 2) {
            median = values[int(count/2) + 1]
        } else {
            median = (values[count/2] + values[count/2 + 1])/2
        }
        printf "Median: %.2f%%\n", median
    }' <(sort -t',' -k11,11n etl/data/processed/processed_cdc_obesity_data.csv)
```

### Time Series Analysis
```bash
# Calculate year-over-year changes in obesity rates
awk -F',' '
    NR>1 && $1!="" && $11!="" {
        year = $1
        rate = $11
        if (last_year != "") {
            change = rate - last_rate
            pct_change = (change/last_rate) * 100
            printf "%d-%d: %.2f%% (%.2f%% change)\n", 
                last_year, year, rate, pct_change
        }
        last_year = year
        last_rate = rate
    }' <(sort -t',' -k1,1n etl/data/processed/processed_cdc_obesity_data.csv | uniq)

# Calculate 5-year moving average
awk -F',' '
    function update_moving_avg() {
        sum = 0
        count = 0
        for (i = 1; i <= 5; i++) {
            if (window[i] != "") {
                sum += window[i]
                count++
            }
        }
        return (count > 0) ? sum/count : 0
    }
    
    NR>1 && $1!="" && $11!="" {
        year = $1
        rate = $11
        idx = (year % 5) + 1
        window[idx] = rate
        avg = update_moving_avg()
        if (avg > 0) {
            printf "%d: %.2f%% (5-year avg)\n", year, avg
        }
    }' <(sort -t',' -k1,1n etl/data/processed/processed_cdc_obesity_data.csv)
```

### Demographic Analysis
```bash
# Calculate obesity rates by gender and age group
awk -F',' '
NR > 1 && $11 != "" {
    gender = $8
    age = $9
    rate = $11
    count[gender,age]++
    sum[gender,age] += rate
}
END {
    # Print Markdown table header and separator
    printf "\n| Gender   | Age Group       | Avg Rate | Count |\n"
    printf "|----------|-----------------|----------|-------|\n"
    for (key in sum) {
        split(key, parts, SUBSEP)
        if (parts[1] != "" && parts[2] != "") {
            avg = sum[key] / count[key]
            printf "| %-8s | %-15s | %8.2f | %5d |\n", parts[1], parts[2], avg, count[key]
        }
    }
}' etl/data/processed/processed_cdc_obesity_data.csv
```

### Geographic Analysis
```bash
# Calculate state-level statistics
awk -F',' '
    NR>1 && $3!="" && $11!="" {
        state = $3
        rate = $11
        count[state]++
        sum[state] += rate
        if (rate > max[state] || max[state] == "") max[state] = rate
        if (rate < min[state] || min[state] == "") min[state] = rate
    }
    END {
        printf "\nState-Level Obesity Statistics:\n"
        printf "%-20s %-10s %-10s %-10s %-10s\n", 
            "State", "Avg Rate", "Min Rate", "Max Rate", "Samples"
        printf "%s\n", "-----------------------------------------------------"
        for (state in sum) {
            avg = sum[state]/count[state]
            printf "%-20s %-10.2f %-10.2f %-10.2f %-10d\n", 
                state, avg, min[state], max[state], count[state]
        }
    }' etl/data/processed/processed_cdc_obesity_data.csv | sort -k2,2nr | head -n 10
```

### Correlation Analysis
```bash
# Calculate correlation between obesity rates and food recalls by state
awk -F',' '
    # First pass: Process obesity data
    FILENAME ~ /cdc_obesity_data/ && NR>1 {
        state = $3
        rate = $11
        if (rate != "") {
            obesity_sum[state] += rate
            obesity_count[state]++
        }
    }
    # Second pass: Process recall data
    FILENAME ~ /fsis_recalls/ && NR>1 {
        split($31, states, ";")
        for (i in states) {
            state = states[i]
            if (state != "") recalls[state]++
        }
    }
    END {
        # Calculate correlation
        printf "\nState-Level Correlation Analysis:\n"
        printf "%-20s %-15s %-15s\n", "State", "Avg Obesity", "Recalls"
        printf "%s\n", "------------------------------------------------"
        for (state in obesity_sum) {
            if (obesity_count[state] > 0) {
                avg_obesity = obesity_sum[state]/obesity_count[state]
                recall_count = recalls[state] ? recalls[state] : 0
                printf "%-20s %-15.2f %-15d\n", 
                    state, avg_obesity, recall_count
            }
        }
    }' etl/data/processed/processed_cdc_obesity_data.csv \
       etl/data/processed/processed_fsis_recalls.csv | sort -k2,2nr
```

### Tips for Complex AWK
1. **Arrays and Associative Arrays**
   - Use arrays for sequential data: `values[i] = $11`
   - Use associative arrays for grouping: `sum[state] += rate`
   - Multiple keys with SUBSEP: `count[gender,age]++`

2. **Functions**
   - Define functions for reusable code
   - Use descriptive names
   - Document parameters and return values

3. **Multiple File Processing**
   - Use `FILENAME` to identify source file
   - Process files in sequence
   - Combine data in the `END` block

4. **Performance Tips**
   - Use conditions to filter data early
   - Minimize string operations
   - Use numeric comparisons when possible
   - Consider using sort/uniq for preprocessing

## Tips and Notes

1. **Column Selection**
   - Use `cut -d',' -f<N>` to select specific CSV columns
   - Column numbers can be found using `tr ',' '\n' | nl`

2. **Pattern Matching**
   - Use `grep -E` for extended regex patterns
   - Common patterns:
     - Years: `'^[0-9]{4}$'`
     - Dates: `'[0-9]{4}-[0-9]{2}-[0-9]{2}'`
     - Floating point years: `'^[0-9]{4}\.0$'`

3. **Data Cleaning**
   - Use `sed 's/\.0$//'` to remove trailing .0 from years
   - Use `sort -n` for numerical sorting
   - Use `head -n1` and `tail -n1` to get range bounds

4. **Record Counting**
   - Remember to subtract 1 for header when using `wc -l`
   - Use `$(( ... ))` for arithmetic in bash 