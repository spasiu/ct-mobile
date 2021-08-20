import { BreakType } from '../../common/break';
import { Sports } from '../../common/sports';
import { ALL_FILTER_OPTION } from './filter.presets';

export interface FilterProviderProps {
  children: React.ReactNode;
}

export type FilterContextType = {
  breakTypeFilter: BreakTypeFilterOptions;
  setBreakTypeFilter: (breakType: BreakTypeFilterOptions) => void;
  sportTypeFilter: SportTypeFilterOptions;
  setSportTypeFilter: (sportType: SportTypeFilterOptions) => void;
};

export type BreakTypeFilterOptions = BreakType | typeof ALL_FILTER_OPTION;
export type SportTypeFilterOptions = Sports | typeof ALL_FILTER_OPTION;
