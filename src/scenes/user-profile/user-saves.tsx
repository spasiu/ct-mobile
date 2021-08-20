import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { FilterItem, FilterItemStatusTypes } from '../../components';
import { t } from '../../i18n/i18n';

import {
  SearchType,
  SEARCH_TYPES,
  TEXT_KEY_FOR_SEARCH_TYPE,
} from '../../common/search';
import { filter } from 'ramda';

import { UserUpcomingBreaks } from './user-upcoming-breaks';
import { UserUpcomingEvents } from './user-upcoming-events';
import { UserUpcomingHits } from './user-upcoming-hits';

export const UserSaves = (): JSX.Element => {
  const [searchFilter, setSearchFilter] = useState<SearchType>(
    SearchType.Breaks,
  );

  return (
    <View style={[s.w_100, s.mb3]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={[s.h2, s.mb3]}
        contentContainerStyle={[s.aic, s.pr3]}
        horizontal={true}
        data={filter(tab => SearchType.Breakers !== tab, SEARCH_TYPES)}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const filterOption = item as SearchType;
          const isSelected = searchFilter === filterOption;
          return (
            <FilterItem
              style={[s.mr2]}
              onPress={() => setSearchFilter(item)}
              status={
                isSelected
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              text={t(TEXT_KEY_FOR_SEARCH_TYPE[filterOption])}
            />
          );
        }}
      />
      <View>
        {searchFilter === SearchType.Breaks ? <UserUpcomingBreaks /> : null}
        {searchFilter === SearchType.Events ? <UserUpcomingEvents /> : null}
        {searchFilter === SearchType.Hits ? <UserUpcomingHits /> : null}
      </View>
    </View>
  );
};
