import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { BreakCard, Loading } from '../../components';
import {
  useScheduledBreaksQuery,
  NewScheduledBreaksDocument,
  Breaks,
} from '../../services/api/requests';

import { BreakDetailModal } from '../break-detail/break-detail-modal';

import { breakScheduleSelector } from './schedule-screen.utils';

export const BreaksView = (): JSX.Element => {
  const [breakId, setBreakId] = useState('');

  const {
    loading,
    data,
    subscribeToMore: scheduledBreaksSubscription,
  } = useScheduledBreaksQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return <Loading />;
  }

  scheduledBreaksSubscription({
    document: NewScheduledBreaksDocument,
    updateQuery: (prev, { subscriptionData }) => subscriptionData.data || prev,
  });

  return (
    <>
      <FlatList
        style={[s.h_100, s.ph3]}
        data={data?.Breaks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const eventBreak = item as Breaks;
          return (
            <BreakCard
              {...breakScheduleSelector(eventBreak)}
              onPressBuy={() => setBreakId(item.id)}
              onPress={() => setBreakId(item.id)}
            />
          );
        }}
      />
      <BreakDetailModal
        breakId={breakId}
        isVisible={Boolean(breakId)}
        onPressClose={() => setBreakId('')}
      />
    </>
  );
};
