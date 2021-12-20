import React, { useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/core';

import { BreakCard, EmptyState } from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
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
import { LiveScreenNavigationProp } from '../live/live-screen.props';

import { breakScheduleSelector } from './search-modal.utils';
import { SearchBreaksViewProps } from './search-modal.props';
import {
  breakIdSelector,
  handleBreakPress,
} from '../../common/break';

export const SearchBreaksView = ({
  breaks,
}: SearchBreaksViewProps): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const [breakId, setBreakId] = useState('');
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  return (
    <>
      <FlatList
        ListEmptyComponent={() => (
          <EmptyState
            title={t('emptyResults.noBreakSearchResultTitle')}
            description={t('emptyResults.noBreakSearchResultDescription')}
          />
        )}
        style={[s.h_100, s.ph3]}
        data={breaks}
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
