import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { breaksSelector } from '../../common/break';

import { hitsSelector } from '../../common/hit';
import { usersSelector } from '../../common/user-profile';

import {
  BackButton,
  Container,
  ContainerTypes,
  FilterItem,
  FilterItemStatusTypes,
  HitsView,
  Loading,
  NavigationBar,
  SearchInput,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  Breaks,
  Hits,
  Users,
  useSearchLazyQuery,
} from '../../services/api/requests';
import { SearchBreakersView } from './search-breakers-view';
import { SearchBreaksView } from './search-breaks-view';
import { SearchEventsView } from './search-events-view';

import {
  SearchType,
  SEARCH_TYPES,
  TEXT_KEY_FOR_SEARCH_TYPE,
} from '../../common/search';
import {
  searchEventBreakersSelector,
  eventBreakerDetailSelector,
  noBreakersHaveEvents,
} from './search-modal.utils';
import { SearchModalProps } from './search-modal.props';
import { find, isEmpty, pathOr } from 'ramda';
import { isSearchTermValid } from '../../utils/search';

export const SearchModal = ({ navigation }: SearchModalProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState<SearchType>(
    SearchType.Breaks,
  );

  const [startSearch, { data, loading }] = useSearchLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (isSearchTermValid(searchTerm)) {
      startSearch({
        variables: {
          searchInput: `%${searchTerm}%`,
          userId: authUser?.uid,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const firstTabWithContent = find(searchType => {
      const tabData = pathOr([], [searchType], data) as
        | Users[]
        | Breaks[]
        | Hits[];
      const nestedEventsEmpty =
        searchType === SearchType.Events
          ? noBreakersHaveEvents(tabData as Users[])
          : false;

      return !isEmpty(tabData) && !nestedEventsEmpty;
    }, SEARCH_TYPES);

    if (firstTabWithContent) {
      setSearchFilter(firstTabWithContent);
    }
  }, [data]);

  const hits = hitsSelector(data);
  const breaks = breaksSelector(data);
  const eventBreakers = searchEventBreakersSelector(data);
  const breakers = usersSelector(data);
  return (
    <Container
      style={[s.mh0]}
      containerType={ContainerTypes.fixed}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.flx_i]}>
        <NavigationBar>
          <View style={[s.flx_i, s.flx_row, s.aic]}>
            <BackButton
              onPress={() => navigation.goBack()}
              style={[s.flx_ratio(0.12)]}
            />
            <View style={[s.flx_ratio(0.88)]}>
              <SearchInput
                value={searchTerm}
                autoFocus={true}
                style={[s.flx_i, s.mv3]}
                autoCapitalize={'none'}
                onChangeText={text => setSearchTerm(text)}
              />
            </View>
          </View>
        </NavigationBar>
        {!isSearchTermValid(searchTerm) ? (
          <View style={[s.flx_i, s.aic, s.mt3]}>
            <Text style={[s.ff_alt_sb, s.f5]}>{t('search.emptyState')}</Text>
          </View>
        ) : (
          <>
            {loading ? (
              <Loading containerStyle={[s.mt4]} />
            ) : (
              <>
                <View>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={[s.h2, s.pl3, s.mv3]}
                    contentContainerStyle={[s.aic, s.pr3]}
                    horizontal={true}
                    data={SEARCH_TYPES}
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
                </View>
                <View style={[s.flx_i]}>
                  {searchFilter === SearchType.Hits ? (
                    <HitsView hits={hits} />
                  ) : null}
                  {searchFilter === SearchType.Events ? (
                    <SearchEventsView breakers={eventBreakers} />
                  ) : null}
                  {searchFilter === SearchType.Breaks ? (
                    <SearchBreaksView breaks={breaks} />
                  ) : null}
                  {searchFilter === SearchType.Breakers ? (
                    <SearchBreakersView
                      breakers={breakers}
                      onPressBreaker={breaker =>
                        navigation.navigate(ROUTES_IDS.BREAKERS_TAB, {
                          screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                          initial: false,
                          params: eventBreakerDetailSelector(breaker),
                        })
                      }
                    />
                  ) : null}
                </View>
              </>
            )}
          </>
        )}
      </View>
    </Container>
  );
};
