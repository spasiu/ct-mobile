import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { BreakCard, Loading } from '../../components';
import {
  useScheduledBreaksQuery,
  NewScheduledBreaksDocument,
} from '../../services/api/requests';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

import {
  breaksScheduleSelector,
  breakDetailSelector,
} from './schedule-screen-utils';

export const BreaksView = () => {
  const navigation = useNavigation();

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
    <FlatList
      style={[s.h_100, s.ph3]}
      data={data?.Breaks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <BreakCard
            onPress={() =>
              navigation.navigate(ROUTES_IDS.BREAK_DETAIL_MODAL, {
                ...breakDetailSelector(item),
              })
            }
            {...breaksScheduleSelector(item)}
          />
        );
      }}
    />
  );
};