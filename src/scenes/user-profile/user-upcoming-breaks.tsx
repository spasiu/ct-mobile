import React from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';
import { styles as s } from 'react-native-style-tachyons';

import { breakIdSelector, handleBreakPress } from '../../common/break';
import { BreakCard, EmptyState, IconButton } from '../../components';
import { t } from '../../i18n/i18n';
import { Breaks, FollowBreakMutation, UnfollowBreakMutation } from '../../services/api/requests';
import {
  optimisticUnfollowBreakResponse,
  updateUnfollowBreakCache,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
} from '../../utils/cache';
import { indexedMap } from '../../utils/ramda';
import { BreakDetailModal } from '../break-detail/break-detail-modal';

import { LiveScreenNavigationProp } from '../live/live-screen.props';
import {
  useUserUpcomingBreaksHook,
  breakScheduleSelector,
} from './user-profile-screen.logic';
import { ApolloCache, FetchResult } from '@apollo/client';

const downArrow = require('../../assets/down-arrow.png');

export const UserUpcomingBreaks = (): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const {
    userId,
    breakId,
    setBreakId,
    limit,
    setLimit,
    followBreak,
    unfollowBreak,
    breaks,
  } = useUserUpcomingBreaksHook();

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
        return index < limit ? (
          <BreakCard
            onPressBuy={() => setBreakId(breakIdSelector(breakItem))}
            onPress={() => handleBreakPress(breakItem, navigation, setBreakId)}
            key={`breaker-break-${index}`}
            {...breakerBreakDetail}
            onPressFollow={() => {
              const followData = {
                user_id: userId,
                break_id: breakItem.id,
              };

              breakerBreakDetail.userFollows
                ? unfollowBreak({
                    optimisticResponse: optimisticUnfollowBreakResponse(
                      breakItem,
                      userId as string,
                    ),
                    update: (cache: ApolloCache<UnfollowBreakMutation>) =>
                      updateUnfollowBreakCache(cache, breakItem),
                    variables: followData,
                  })
                : followBreak({
                    optimisticResponse: optimisticFollowBreakResponse(
                      breakItem,
                      userId as string,
                    ),
                    update: (
                      cache: ApolloCache<FollowBreakMutation>,
                      followResponse: FetchResult<
                        FollowBreakMutation,
                        Record<string, any>,
                        Record<string, any>
                      >,
                    ) =>
                      updateFollowBreakCache(cache, followResponse, breakItem),
                    variables: {
                      follow: followData,
                    },
                  });
            }}
          />
        ) : null;
      }, breaks)}
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId(undefined)}
        />
      ) : null}
      {limit < breaks.length ? (
        <IconButton style={[s.asc]} onPress={() => setLimit(limit + 3)}>
          <Image
            resizeMode={'contain'}
            source={downArrow}
            style={[s.tint_black, s.icon_xs]}
          />
        </IconButton>
      ) : null}
    </View>
  );
};
