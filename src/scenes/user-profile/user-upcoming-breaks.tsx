import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';

import {
  breakIdSelector,
  breaksSelector,
  handleBreakPress,
} from '../../common/break';
import { BreakCard, EmptyState } from '../../components';
import { t } from '../../i18n/i18n';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  Breaks,
  NewUserUpcomingBreaksDocument,
  useFollowBreakMutation,
  useUnfollowBreakMutation,
  useUserUpcomingBreaksQuery,
} from '../../services/api/requests';
import {
  optimisticUnfollowBreakResponse,
  updateUnfollowBreakCache,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
} from '../../utils/cache';
import { indexedMap } from '../../utils/ramda';
import { BreakDetailModal } from '../break-detail/break-detail-modal';

import { breakScheduleSelector } from './user-profile-screen.utils';
import { LiveScreenNavigationProp } from '../live/live-screen.props';

export const UserUpcomingBreaks = (): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakId, setBreakId] = useState('');

  const { data, subscribeToMore } = useUserUpcomingBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: authUser?.uid,
    },
  });
  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NewUserUpcomingBreaksDocument,
      variables: {
        userId: authUser?.uid,
      },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breaks = breaksSelector(data);
  if (isEmpty(breaks)) {
    return (
      <EmptyState
        title={t('emptyResults.noBreaksFollowedByUserTitle')}
        description={t('emptyResults.noBreaksFollowedByUserDescription')}
      />
    );
  }
  return (
    <View>
      {indexedMap((item, index) => {
        const breakItem = item as Breaks;
        const breakerBreakDetail = breakScheduleSelector(breakItem);
        return (
          <BreakCard
            onPressBuy={() => setBreakId(breakIdSelector(breakItem))}
            onPress={() => handleBreakPress(breakItem, navigation, setBreakId)}
            key={`breaker-break-${index}`}
            {...breakerBreakDetail}
            onPressFollow={() => {
              const followData = {
                user_id: authUser?.uid,
                break_id: breakItem.id,
              };

              breakerBreakDetail.userFollows
                ? unfollowBreak({
                    optimisticResponse: optimisticUnfollowBreakResponse(
                      breakItem,
                      authUser?.uid as string,
                    ),
                    update: cache => updateUnfollowBreakCache(cache, breakItem),
                    variables: followData,
                  })
                : followBreak({
                    optimisticResponse: optimisticFollowBreakResponse(
                      breakItem,
                      authUser?.uid as string,
                    ),
                    update: (cache, followResponse) =>
                      updateFollowBreakCache(cache, followResponse, breakItem),
                    variables: {
                      follow: followData,
                    },
                  });
            }}
          />
        );
      }, breaks)}
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId('')}
        />
      ) : null}
    </View>
  );
};
