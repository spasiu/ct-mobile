import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { EventCard, Loading } from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { t } from '../../i18n/i18n';
import {
  useBreakerEventsQuery,
  BreakerEventsDocument,
} from '../../services/api/requests';

import {
  breakerEventSelector,
  eventDetailSelector,
} from './breaker-screen-utils';

export const EventsView = ({ breaker }) => {
  const navigation = useNavigation();

  const {
    loading,
    data,
    subscribeToMore: breakerEventsSubscription,
  } = useBreakerEventsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: breaker.id },
  });

  if (loading && !data) {
    return <Loading />;
  }

  breakerEventsSubscription({
    document: BreakerEventsDocument,
    variables: { id: breaker.id },
    updateQuery: (prev, { subscriptionData }) => subscriptionData.data || prev,
  });

  return (
    <FlatList
      keyExtractor={item => item.id}
      style={[s.ml3, s.mb4]}
      horizontal
      data={data.Events}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <EventCard
          onPress={() =>
            navigation.navigate(ROUTES_IDS.EVENT_DETAIL_MODAL, {
              modalTitle: t('event.detailTitle'),
              ...eventDetailSelector(item, breaker),
            })
          }
          containerStyle={[s.mr3]}
          {...breakerEventSelector(item)}
        />
      )}
    />
  );
};
