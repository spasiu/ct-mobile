import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/core';

import { BreakCard, EmptyState, Loading } from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  useScheduledBreaksQuery,
  NewScheduledBreaksDocument,
  Breaks,
  useFollowBreakMutation,
  useUnfollowBreakMutation,
} from '../../services/api/requests';
import {
  optimisticUnfollowBreakResponse,
  updateUnfollowBreakCache,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
} from '../../utils/cache';
import { t } from '../../i18n/i18n';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import { FilterContext, FilterContextType } from '../../providers/filter';
import { LiveScreenNavigationProp } from '../live/live-screen.props';

import {
  breakScheduleSelector,
  getBreakTypeFilter,
  getSportTypeFilter,
} from './schedule-screen.utils';
import { breakIdSelector, handleBreakPress } from '../../common/break';

export const BreaksView = (): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const [breakId, setBreakId] = useState('');
  const { breakTypeFilter, sportTypeFilter } = useContext(
    FilterContext,
  ) as FilterContextType;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const { loading, data, subscribeToMore } = useScheduledBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: authUser?.uid as string,
      breakTypeFilter: getBreakTypeFilter(breakTypeFilter),
      sportTypeFilter: getSportTypeFilter(sportTypeFilter),
    },
  });

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NewScheduledBreaksDocument,
      variables: {
        userId: authUser?.uid,
        breakTypeFilter: getBreakTypeFilter(breakTypeFilter),
        sportTypeFilter: getSportTypeFilter(sportTypeFilter),
      },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakTypeFilter, sportTypeFilter]);

  if (loading && !data) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        ListEmptyComponent={() => (
          <EmptyState
            title={t('emptyResults.noBreaksTitle')}
            description={t('emptyResults.noBreaksDescription')}
          />
        )}
        style={[s.h_100, s.ph3]}
        data={data?.Breaks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const eventBreak = item as Breaks;
          const breakSchedule = breakScheduleSelector(eventBreak);
          return (
            <BreakCard
              {...breakSchedule}
              onPressBuy={() => setBreakId(breakIdSelector(eventBreak))}
              onPress={() =>
                handleBreakPress(eventBreak, navigation, setBreakId)
              }
              onPressFollow={() => {
                const followData = {
                  user_id: authUser?.uid,
                  break_id: eventBreak.id,
                };

                breakSchedule.userFollows
                  ? unfollowBreak({
                      optimisticResponse: optimisticUnfollowBreakResponse(
                        eventBreak,
                        authUser?.uid as string,
                      ),
                      update: cache =>
                        updateUnfollowBreakCache(cache, eventBreak),
                      variables: followData,
                    })
                  : followBreak({
                      optimisticResponse: optimisticFollowBreakResponse(
                        eventBreak,
                        authUser?.uid as string,
                      ),
                      update: (cache, followResponse) =>
                        updateFollowBreakCache(
                          cache,
                          followResponse,
                          eventBreak,
                        ),
                      variables: {
                        follow: followData,
                      },
                    });
              }}
            />
          );
        }}
      />
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId('')}
        />
      ) : null}
    </>
  );
};
