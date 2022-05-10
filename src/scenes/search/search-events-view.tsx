import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';
import { useNavigation } from '@react-navigation/native';
import { breakerEventsSelector } from '../../common/breaker';
import { SectionHeader, EventCard, EmptyState } from '../../components';
import { t } from '../../i18n/i18n';
import { Users, Event_Status_Enum } from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import {
  eventBreakerSelector,
  eventDetailSelector,
  scheduleEventSelector,
  useSearchEventsHook,
} from './search-modal.logic';
import { SearchEventsViewProps } from './search-modal.props';
import { eventStatusSelector } from '../../common/event';
import { ROUTES_IDS } from '../../navigators';

export const SearchEventsView = ({
  breakers,
}: SearchEventsViewProps): JSX.Element => {
  const navigation = useNavigation();
  const { event, setEvent, hasNoEvents, onPressFollow } =
    useSearchEventsHook(breakers);

  if (hasNoEvents) {
    return (
      <EmptyState
        title={t('emptyResults.noEventSearchResultTitle')}
        description={t('emptyResults.noEventSearchResultDescription')}
      />
    );
  }
  return (
    <>
      <ScrollView style={[s.h_100]} contentContainerStyle={[s.pb4, s.ml3]}>
        {breakers.map((user, index: number) => {
          const breaker = user as Users;
          const breakerEvents = breakerEventsSelector(breaker);
          if (isEmpty(breakerEvents)) {
            return null;
          }
          return (
            <View key={index}>
              <SectionHeader
                {...eventBreakerSelector(breaker)}
                containerStyle={[s.mr3]}
              />
              <FlatList
                keyExtractor={item => item.id}
                horizontal
                data={breakerEvents}
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
