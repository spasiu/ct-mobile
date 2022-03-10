import React, { useContext, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { BreakCard, StatusBadgeTypes } from '../../components';

import { t } from '../../i18n/i18n';
import { OverScreenModal } from '../../components';
import {
  useFollowBreakMutation,
  useUnfollowBreakMutation,
} from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  optimisticFollowBreakResponse,
  optimisticUnfollowBreakResponse,
  updateFollowBreakCache,
  updateUnfollowBreakCache,
} from '../../utils/cache';
import { breakCardSelector } from './live-screen.utils';
import { UpcomingBreaksProps } from './live-screen.props';
import { formatScheduledStatus } from '../../utils/date';
import { eventTimeSelector } from '../../common/event';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import { Break_Status_Enum } from '../../services/api/requests';
export const LineupModal = ({
  event,
  isVisible,
  breaks,
  breaker,
  onPressClose = () => undefined,
  ...modalProps
}: UpcomingBreaksProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakId, setBreakId] = useState<string>();

  const completed = breaks.filter(b => b.status === Break_Status_Enum.Completed);
  const upcoming = breaks.filter(b => b.status !== Break_Status_Enum.Completed);

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();
  return (
    <OverScreenModal
      title={t('event.allBreaksLineupTitle')}
      isVisible={isVisible}
      onPressClose={onPressClose}
      {...modalProps}>
      <Text style={[s.ff_b, s.f5, s.mb2, s.mt3, s.ph3]}>
        {t('event.breakLineupTitle')}
      </Text>
      <FlatList
        style={[s.flx_i, s.mv3, s.ph3]}
        data={[...upcoming, ...completed]}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          const breakCardDetails = breakCardSelector(item, breaker, event);
          return (
            <BreakCard
              {...breakCardDetails}
              status={
                (item.status !== Break_Status_Enum.Completed) &&
                (index === 0 && item.status !== Break_Status_Enum.Live && item.status !== Break_Status_Enum.Notified) ||
                (index === 1 && (upcoming[0]?.status === Break_Status_Enum.Live || upcoming[0]?.status === Break_Status_Enum.Notified)) ?
                StatusBadgeTypes.upNext :
                breakCardDetails.status
              }
              eventDate={formatScheduledStatus(eventTimeSelector(event))}
              onPressBuy={() => setBreakId(item.id)}
              onPress={() => setBreakId(item.id)}
              onPressFollow={() => {
                const followData = {
                  user_id: authUser?.uid,
                  break_id: item.id,
                };

                breakCardDetails.userFollows
                  ? unfollowBreak({
                      optimisticResponse: optimisticUnfollowBreakResponse(
                        item,
                        authUser?.uid as string,
                      ),
                      update: cache => updateUnfollowBreakCache(cache, item),
                      variables: followData,
                    })
                  : followBreak({
                      optimisticResponse: optimisticFollowBreakResponse(
                        item,
                        authUser?.uid as string,
                      ),
                      update: (cache, followResponse) =>
                        updateFollowBreakCache(cache, followResponse, item),
                      variables: {
                        follow: followData,
                      },
                    });
              }}
            />
          );
        }}
      />
      { breakId && <BreakDetailModal
        breakId={breakId}
        isVisible={Boolean(breakId)}
        onPressClose={() => setBreakId(undefined)}
      />}
    </OverScreenModal>
  );
};
