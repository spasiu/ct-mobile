import { NetworkStatus } from '@apollo/client';
import React from 'react';
import { FlatList, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { userImageSelector } from '../../common/user-profile';

import {
  TitleBar,
  Container,
  ContainerTypes,
  SearchInput,
  FilterItem,
  Loading,
  BreakerCard,
  Avatar,
  FilterItemStatusTypes,
  EmptyState,
  FilterItemTypes,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

import {
  breakerCardSelector,
  useBreakersScreenHook,
} from './breakers-screen.logic';
import { BreakersScreenProps } from './breakers-screen.props';

export const BreakersScreen = ({
  navigation,
}: BreakersScreenProps): JSX.Element => {
  const {
    userBreakersFilterActive,
    setUserBreakersFilterActive,
    user,
    searchTerm,
    setSearchTerm,
    loading,
    data,
    refetch,
    networkStatus,
    breakers,
  } = useBreakersScreenHook();
  const cardWidth = sizes.w5 + sizes.w3 + sizes.w2;
  return (
    <Container
      containerType={ContainerTypes.fixed}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.mh3, s.mb4]}>
        <TitleBar
          title={t('breakers.title')}
          rightElement={
            <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
              <FilterItem
                style={[s.mr3]}
                type={FilterItemTypes.pill_alt}
                text={t('buttons.showFollowing')}
                status={
                  userBreakersFilterActive
                    ? FilterItemStatusTypes.selected
                    : FilterItemStatusTypes.default
                }
                onPress={() =>
                  setUserBreakersFilterActive(!userBreakersFilterActive)
                }
              />
              <Avatar
                src={userImageSelector(user)}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)
                }
              />
            </View>
          }
        />
        <SearchInput
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>
      {loading && !data ? (
        <Loading />
      ) : (
        <FlatList
          onRefresh={() => refetch && refetch()}
          refreshing={networkStatus === NetworkStatus.refetch}
          ListEmptyComponent={() => (
            <EmptyState
              title={t('emptyResults.noFollowedBreakersTitle')}
              description={t('emptyResults.noFollowedBreakersDescription')}
            />
          )}
          keyExtractor={item => item.id}
          style={[s.flx_i, s.ph3]}
          data={breakers}
          renderItem={({ item }) => {
            const breakerCard = breakerCardSelector(item);
            return (
              <View style={[s.flx_i, s.aic, s.mb4]}>
                <BreakerCard
                  {...breakerCard}
                  onPress={() =>
                    navigation.navigate(ROUTES_IDS.BREAKER_DETAIL_SCREEN, {
                      breaker: item,
                    })
                  }
                  cardWidth={cardWidth}
                  containerStyle={[s.flx_i, { width: cardWidth }]}
                  cardSize="large"
                  breakerId={item.id}
                />
              </View>
            );
          }}
        />
      )}
    </Container>
  );
};
