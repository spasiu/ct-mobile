import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/core';
import { BreakCard, EmptyState, Loading } from '../../components';
import { Breaks } from '../../services/api/requests';
import { t } from '../../i18n/i18n';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import { LiveScreenNavigationProp } from '../live/live-screen.props';
import {
  breakScheduleSelector,
  useBreaksViewHook,
} from './schedule-screen.logic';
import { breakIdSelector, handleBreakPress } from '../../common/break';

export const BreaksView = (): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const { loading, data, breakId, setBreakId, onPressFollow } =
    useBreaksViewHook();

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
              onPressFollow={() => onPressFollow(eventBreak, breakSchedule)}
            />
          );
        }}
      />
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId(undefined)}
        />
      ) : null}
    </>
  );
};
