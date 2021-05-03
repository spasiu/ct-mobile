import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { SectionHeader, EventCard, Loading } from '../../components';
import { t } from '../../i18n/i18n';
import { indexedMap } from '../../utils/ramda';

import {
  useScheduledEventsQuery,
  NewScheduledEventsDocument,
} from '../../services/api/requests';

import {
  eventBreakerSelector,
  eventSelector,
  ScheduledEventBreakerQueryType,
} from './schedule-screen-utils';

export const EventsView = () => {
  const {
    loading,
    data,
    subscribeToMore: scheduledEventsSubscription,
  } = useScheduledEventsQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return <Loading />;
  }

  scheduledEventsSubscription({
    document: NewScheduledEventsDocument,
    updateQuery: (prev, { subscriptionData }) => subscriptionData.data || prev,
  });

  return (
    <ScrollView style={[s.h_100]} contentContainerStyle={[s.pb4, s.ml3]}>
      {indexedMap((breaker: ScheduledEventBreakerQueryType, index: number) => {
        return (
          <View key={index}>
            <SectionHeader
              actionText={t('buttons.seeAll')}
              containerStyle={[s.mr3]}
              {...eventBreakerSelector(breaker)}
            />
            <FlatList
              keyExtractor={item => item.id}
              horizontal
              data={breaker.Events}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <EventCard containerStyle={[s.mr3]} {...eventSelector(item)} />
              )}
            />
          </View>
        );
      }, data?.Users)}
    </ScrollView>
  );
};
