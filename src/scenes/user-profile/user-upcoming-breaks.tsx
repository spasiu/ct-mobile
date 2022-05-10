import React from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';
import { styles as s } from 'react-native-style-tachyons';

import { breakIdSelector, handleBreakPress } from '../../common/break';
import { BreakCard, EmptyState, IconButton } from '../../components';
import { t } from '../../i18n/i18n';
import { BreakDetailModal } from '../break-detail/break-detail-modal';

import { LiveScreenNavigationProp } from '../live/live-screen.props';
import {
  useUserUpcomingBreaksHook,
  breakScheduleSelector,
} from './user-profile-screen.logic';

const downArrow = require('../../assets/down-arrow.png');

export const UserUpcomingBreaks = (): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const { breakId, setBreakId, limit, setLimit, onFollow, breaks } =
    useUserUpcomingBreaksHook();

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
      {breaks.map((breakItem, index) => {
        const breakerBreakDetail = breakScheduleSelector(breakItem);
        return index < limit ? (
          <BreakCard
            onPressBuy={() => setBreakId(breakIdSelector(breakItem))}
            onPress={() => handleBreakPress(breakItem, navigation, setBreakId)}
            key={`breaker-break-${index}`}
            {...breakerBreakDetail}
            onPressFollow={() => onFollow(breakItem, breakerBreakDetail)}
          />
        ) : null;
      })}
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
