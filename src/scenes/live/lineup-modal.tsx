import React, { useContext, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { BreakCard } from '../../components';

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

export const LineupModal = ({
  event,
  isVisible,
  breaks,
  breaker,
  onPressClose = () => undefined,
  ...modalProps
}: UpcomingBreaksProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakId, setBreakId] = useState('');

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
        data={breaks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const breakCardDetails = breakCardSelector(item, breaker, event);
          return (
            <BreakCard
              breakStatus={item.status}
              {...breakCardDetails}
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
      <BreakDetailModal
        breakId={breakId}
        isVisible={Boolean(breakId)}
        onPressClose={() => setBreakId('')}
      />
    </OverScreenModal>
  );
};
