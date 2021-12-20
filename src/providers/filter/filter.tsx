import React, { createContext, useState } from 'react';
import { ItemTypeFilterOptions } from '.';

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

  const [itemTypeFilter, setItemTypeFilter] = useState<ItemTypeFilterOptions>('Events');

  return (
    <FilterContext.Provider
      value={{
        breakTypeFilter,
        setBreakTypeFilter,
        sportTypeFilter,
        setSportTypeFilter,
        itemTypeFilter,
        setItemTypeFilter,
        cleanFilters: () => {
          setBreakTypeFilter(ALL_FILTER_OPTION);
          setSportTypeFilter(ALL_FILTER_OPTION);
        },
      }}>
      {children}
    </FilterContext.Provider>
  );
};
