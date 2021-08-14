import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { BreakCard, Loading } from '../../components';
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

import { BreakDetailModal } from '../break-detail/break-detail-modal';

import { breakScheduleSelector } from './schedule-screen.utils';

export const BreaksView = (): JSX.Element => {
  const [breakId, setBreakId] = useState('');
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const { loading, data, subscribeToMore } = useScheduledBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: authUser?.uid,
    },
  });

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  useEffect(() => {
    subscribeToMore({
      document: NewScheduledBreaksDocument,
      variables: {
        userId: authUser?.uid,
      },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !data) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        style={[s.h_100, s.ph3]}
        data={data?.Breaks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const eventBreak = item as Breaks;
          const breakSchedule = breakScheduleSelector(eventBreak);
          return (
            <BreakCard
              {...breakSchedule}
              onPressBuy={() => setBreakId(eventBreak.id)}
              onPress={() => setBreakId(eventBreak.id)}
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
