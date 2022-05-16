import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';
import { breakerEventsSelector } from '../../common/breaker';
import {
  SectionHeader,
  EventCard,
  Loading,
  EmptyState,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { Users, Event_Status_Enum } from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { EventDetailModal } from '../event-detail/event-detail-modal';

import {
  eventBreakerSelector,
  eventDetailSelector,
  scheduleEventSelector,
  eventBreakerDetailSelector,
  useEventsViewHook,
} from './schedule-screen.logic';
import { eventStatusSelector } from '../../common/event';

export const EventsView = (): JSX.Element => {
  const navigation = useNavigation();
  const {
    loading,
    data,
    hasNoEvents,
    event,
    setEvent,
    breakers,
    onPressFollow,
  } = useEventsViewHook();
  if (loading && !data) {
    return <Loading />;
  }
  if (hasNoEvents) {
    return (
      <EmptyState
        title={t('emptyResults.noEventsTitle')}
        description={t('emptyResults.noEventsDescription')}
      />
    );
  }
  return (
    <>
      <ScrollView style={[s.h_100]} contentContainerStyle={[s.pb4, s.ml3]}>
        {breakers.map((user: Users, index: number) => {
          const breaker = user as Users;
          const breakerEvents = breakerEventsSelector(breaker);

          if (isEmpty(breakerEvents)) {
            return null;
          }
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
                renderItem={({ item }) => {
                  const eventData = scheduleEventSelector(item);
                  return (
                    <EventCard
                      {...eventData}
                      eventId={item.id}
                      onPress={() => {
                        const eventStatus = eventStatusSelector(item);
                        if (eventStatus === Event_Status_Enum.Live) {
                          navigation.navigate(ROUTES_IDS.LIVE_MODAL, {
                            eventId: item.id,
                          });
                        } else {
                          setEvent(eventDetailSelector(item, breaker));
                        }
                      }}
                      containerStyle={[s.mr3]}
                      onPressFollow={() => onPressFollow(item, eventData)}
                    />
                  );
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      {!isEmpty(event) ? (
        <EventDetailModal
          isVisible={!isEmpty(event)}
          onPressClose={() => setEvent({})}
          modalTitle={t('event.detailTitle')}
          {...(event as EventDetailModalProps)}
        />
      ) : null}
    </>
  );
};
