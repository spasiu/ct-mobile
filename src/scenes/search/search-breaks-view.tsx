import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/core';

import { BreakCard, EmptyState } from '../../components';
import { Breaks } from '../../services/api/requests';
import { t } from '../../i18n/i18n';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import { LiveScreenNavigationProp } from '../live/live-screen.props';

import {
  breakScheduleSelector,
  useSearchBreaksHook,
} from './search-modal.logic';
import { SearchBreaksViewProps } from './search-modal.props';
import { breakIdSelector, handleBreakPress } from '../../common/break';

export const SearchBreaksView = ({
  breaks,
}: SearchBreaksViewProps): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const { breakId, setBreakId, onPressFollow } = useSearchBreaksHook();
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
