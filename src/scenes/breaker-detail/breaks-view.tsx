import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { BreakCard, Loading } from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  useBreakerBreaksQuery,
  BreakerBreaksDocument,
} from '../../services/api/requests';
import { indexedMap } from '../../utils/ramda';

import {
  breakerBreakSelector,
  breakDetailSelector,
} from './breaker-detail-screen-utils';

export const BreaksView = ({ breaker }) => {
  const navigation = useNavigation();

  const {
    loading,
    data,
    subscribeToMore: scheduledBreaksSubscription,
  } = useBreakerBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: breaker.id },
  });

  if (loading && !data) {
    return <Loading />;
  }

  scheduledBreaksSubscription({
    document: BreakerBreaksDocument,
    variables: { id: breaker.id },
    updateQuery: (prev, { subscriptionData }) => subscriptionData.data || prev,
  });

  return (
    <View style={[s.mh3]}>
      {indexedMap((item, index) => {
        return (
          <BreakCard
            onPress={() =>
              navigation.navigate(ROUTES_IDS.BREAK_DETAIL_MODAL, {
                ...breakDetailSelector(item),
              })
            }
            key={`breaker-break-${index}`}
            {...breakerBreakSelector(item, breaker.image)}
          />
        );
      }, data?.Breaks)}
    </View>
  );
};
