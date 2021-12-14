import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/core';

import { BreakCard, EmptyState, Loading } from '../../components';
import {
  useBreakerBreaksQuery,
  BreakerBreaksDocument,
  Breaks,
  useFollowBreakMutation,
  useUnfollowBreakMutation,
} from '../../services/api/requests';
import { indexedMap } from '../../utils/ramda';

import { breakerDetailBreakSelector } from './breaker-detail-screen.utils';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import {
  breakIdSelector,
  breaksSelector,
  handleBreakPress,
  breakStatusSelector,
} from '../../common/break';
import { SimpleBreaker } from './breaker-detail-screen.props';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  optimisticFollowBreakResponse,
  optimisticUnfollowBreakResponse,
  updateFollowBreakCache,
  updateUnfollowBreakCache,
} from '../../utils/cache';
import { isEmpty } from 'ramda';
import { t } from '../../i18n/i18n';

import { LiveScreenNavigationProp } from '../live/live-screen.props';

export const BreaksView = ({
  breaker,
}: {
  breaker: SimpleBreaker;
}): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const [breakId, setBreakId] = useState('');
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const { loading, data, subscribeToMore } = useBreakerBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: breaker.id, userId: authUser?.uid },
  });

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  useEffect(() => {
    subscribeToMore({
      document: BreakerBreaksDocument,
      variables: { id: breaker.id, userId: authUser?.uid },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !data) {
    return <Loading />;
  }

  const breaks = breaksSelector(data);
  if (isEmpty(breaks)) {
    return (
      <EmptyState
        title={t('emptyResults.noBreakScheduledForBreakerTitle')}
        description={t('emptyResults.noBreakScheduledForBreakerDescription')}
      />
    );
  }
  return (
    <View style={[s.mh3]}>
      {indexedMap((item, index) => {
        const breakItem = item as Breaks;
        const breakerBreakDetail = breakerDetailBreakSelector(
          breakItem,
          breaker.image,
        );
        return (
          <BreakCard
            breakStatus={breakStatusSelector(breakItem)}
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
