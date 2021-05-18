import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { SectionHeader, EventCard, Loading } from '../../components';
import { t } from '../../i18n/i18n';
import { indexedMap } from '../../utils/ramda';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  useScheduledEventsQuery,
  NewScheduledEventsDocument,
  Users,
} from '../../services/api/requests';

import {
  eventBreakerSelector,
  eventDetailSelector,
  eventSelector,
} from './schedule-screen-utils';

export const EventsView = () => {
  const navigation = useNavigation();
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
      {indexedMap((breaker: Users, index: number) => {
        return (
          <View key={index}>
            <SectionHeader
              actionText={t('buttons.seeAll')}
              containerStyle={[s.mr3]}
              onActionPressed={() =>
                navigation.navigate(ROUTES_IDS.BREAKERS_TAB, {
                  screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                  initial: false,
                  params: {
                    id: breaker.id,
                    breaker: breaker.Profile,
                    startOnEventsView: true,
                  },
                })
              }
              {...eventBreakerSelector(breaker)}
            />
            <FlatList
              keyExtractor={item => item.id}
              horizontal
              data={breaker.Events}
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
                  {...eventSelector(item)}
                />
              )}
            />
          </View>
        );
      }, data?.Users)}
    </ScrollView>
  );
};
