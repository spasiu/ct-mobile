import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { usersSelector } from '../../common/user-profile';
import { breakerEventsSelector } from '../../common/breaker';
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
  scheduleEventSelector,
  eventBreakerDetailSelector,
} from './schedule-screen.utils';

export const EventsView = (): JSX.Element => {
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
      {indexedMap((user, index: number) => {
        const breaker = user as Users;
        return (
          <View key={index}>
            <SectionHeader
              {...eventBreakerSelector(breaker)}
              actionText={t('buttons.seeAll')}
              containerStyle={[s.mr3]}
              onActionPressed={() =>
                navigation.navigate(ROUTES_IDS.BREAKERS_TAB, {
                  screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                  initial: false,
                  params: eventBreakerDetailSelector(breaker),
                })
              }
            />
            <FlatList
              keyExtractor={item => item.id}
              horizontal
              data={breakerEventsSelector(breaker)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <EventCard
                  {...scheduleEventSelector(item)}
                  onPress={() =>
                    navigation.navigate(ROUTES_IDS.EVENT_DETAIL_MODAL, {
                      modalTitle: t('event.detailTitle'),
                      ...eventDetailSelector(item, breaker),
                    })
                  }
                  containerStyle={[s.mr3]}
                />
              )}
            />
          </View>
        );
      }, usersSelector(data))}
    </ScrollView>
  );
};
