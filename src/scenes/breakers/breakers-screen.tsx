import { NetworkStatus } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import {
  usersSelector,
  userSelector,
  userImageSelector,
} from '../../common/user-profile';

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
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  BreakersDocument,
  useBreakersLazyQuery,
  useFollowBreakerMutation,
  useUnfollowBreakerMutation,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import {
  optimisticFollowBreakerResponse,
  optimisticUnfollowBreakerResponse,
  updateFollowBreakerCache,
  updateUnfollowBreakerCache,
} from '../../utils/cache';

import { breakerCardSelector, getBreakerFilter } from './breakers-screen-utils';
import { BreakersScreenProps } from './breakers-screen.props';

export const BreakersScreen = ({
  navigation,
}: BreakersScreenProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [userBreakersFilterActive, setUserBreakersFilterActive] = useState(
    false,
  );
  const [searchTerm, setSearchTerm] = useState('');

  const [
    getBreakers,
    { loading, data, refetch, networkStatus },
  ] = useBreakersLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: authUser?.uid as string,
      breakerFilter: getBreakerFilter(
        userBreakersFilterActive,
        authUser?.uid as string,
        searchTerm,
      ),
    },
  });

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const [followBreaker] = useFollowBreakerMutation({
    refetchQueries: [
      {
        query: BreakersDocument,
        variables: {
          userId: authUser?.uid as string,
          breakerFilter: getBreakerFilter(
            userBreakersFilterActive,
            authUser?.uid as string,
            searchTerm,
          ),
        },
      },
    ],
  });
  const [unfollowBreaker] = useUnfollowBreakerMutation({
    refetchQueries: [
      {
        query: BreakersDocument,
        variables: {
          userId: authUser?.uid as string,
          breakerFilter: getBreakerFilter(
            userBreakersFilterActive,
            authUser?.uid as string,
            searchTerm,
          ),
        },
      },
    ],
  });

  useEffect(() => {
    getBreakers({
      variables: {
        userId: authUser?.uid as string,
        breakerFilter: getBreakerFilter(
          userBreakersFilterActive,
          authUser?.uid as string,
          searchTerm,
        ),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, userBreakersFilterActive]);

  const user = userSelector(users);
  const breakers = usersSelector(data);
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
                  onPressFollow={() => {
                    const followData = {
                      user_id: authUser?.uid,
                      breaker_id: item.id,
                    };

                    breakerCard.userFollows
                      ? unfollowBreaker({
                          optimisticResponse: optimisticUnfollowBreakerResponse(
                            item,
                            authUser?.uid as string,
                          ),
                          update: cache =>
                            updateUnfollowBreakerCache(cache, item),
                          variables: followData,
                        })
                      : followBreaker({
                          optimisticResponse: optimisticFollowBreakerResponse(
                            item,
                            authUser?.uid as string,
                          ),
                          update: (cache, followResponse) =>
                            updateFollowBreakerCache(
                              cache,
                              followResponse,
                              item,
                            ),
                          variables: {
                            follow: followData,
                          },
                        });
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </Container>
  );
};
