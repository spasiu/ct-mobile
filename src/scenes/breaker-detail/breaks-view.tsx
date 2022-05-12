import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/core';

import { BreakCard, EmptyState, Loading } from '../../components';
import { Breaks } from '../../services/api/requests';

import {
  breakerDetailBreakSelector,
  useBreaksViewHook,
} from './breaker-detail-screen.logic';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import { breakIdSelector, handleBreakPress } from '../../common/break';
import { SimpleBreaker } from './breaker-detail-screen.props';
import { isEmpty } from 'ramda';
import { t } from '../../i18n/i18n';
import { LiveScreenNavigationProp } from '../live/live-screen.props';

export const BreaksView = ({
  breaker,
}: {
  breaker: SimpleBreaker;
}): JSX.Element => {
  const navigation = useNavigation<LiveScreenNavigationProp>();
  const { breakId, setBreakId, loading, data, breaks, onPressFollow } =
    useBreaksViewHook(breaker);

  if (loading && !data) {
    return <Loading />;
  }
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
      {breaks.map((item: Breaks, index: number) => {
        const breakerBreakDetail = breakerDetailBreakSelector(
          item,
          breaker.image,
        );
        return (
          <BreakCard
            onPressBuy={() => setBreakId(breakIdSelector(item))}
            onPress={() => handleBreakPress(item, navigation, setBreakId)}
            key={`breaker-break-${index}`}
            {...breakerBreakDetail}
            onPressFollow={() => onPressFollow(item, breakerBreakDetail)}
          />
        );
      })}
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId(undefined)}
        />
      ) : null}
    </View>
  );
};
