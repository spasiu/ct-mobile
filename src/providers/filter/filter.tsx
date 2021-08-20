import React, { createContext, useState } from 'react';

import {
  BreakTypeFilterOptions,
  FilterProviderProps,
  SportTypeFilterOptions,
} from './filter-types';
import { ALL_FILTER_OPTION } from './filter.presets';

export const FilterContext = createContext({});

export const FilterProvider = ({
  children,
}: FilterProviderProps): JSX.Element => {
  const [
    breakTypeFilter,
    setBreakTypeFilter,
  ] = useState<BreakTypeFilterOptions>(ALL_FILTER_OPTION);

  const [
    sportTypeFilter,
    setSportTypeFilter,
  ] = useState<SportTypeFilterOptions>(ALL_FILTER_OPTION);

  return (
    <FilterContext.Provider
      value={{
        breakTypeFilter,
        setBreakTypeFilter,
        sportTypeFilter,
        setSportTypeFilter,
      }}>
      {children}
    </FilterContext.Provider>
  );
};
