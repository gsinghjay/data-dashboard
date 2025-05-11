export interface EducationGroup {
  id: number;
  name: string;
  schl_codes: string;
  display_order: number;
}

export interface State {
  code: string;
  name: string;
}

export interface FertilityRate {
  id: number;
  year: number;
  state_code: string;
  state_name: string;
  education_group: string;
  women_count: number;
  births: number;
  fertility_rate: number;
}

export interface UserSelection {
  year: number | number[];
  state: string | string[];
  educationGroup: string | string[];
  visualizationType: 'bar' | 'line' | 'map' | 'pie';
}

export interface FertilityDataState {
  loading: boolean;
  error: string | null;
  educationGroups: EducationGroup[];
  states: State[];
  fertilityRates: FertilityRate[];
  userSelection: UserSelection;
}

export interface DataContextType {
  state: FertilityDataState;
  setYear: (year: number | number[]) => void;
  setState: (state: string | string[]) => void;
  setEducationGroup: (educationGroup: string | string[]) => void;
  setVisualizationType: (type: 'bar' | 'line' | 'map' | 'pie') => void;
  fetchData: () => Promise<void>;
} 