import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { EmptyState, EventCard, Loading } from '../../components';
import { t } from '../../i18n/i18n';
import { Event_Status_Enum } from '../../services/api/requests';

import {
  breakerEventDetailSelector,
  eventDetailSelector,
  useEventsViewHook,
} from './breaker-detail-screen.logic';
import { isEmpty } from 'ramda';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { eventStatusSelector } from '../../common/event';
import { SimpleBreaker } from './breaker-detail-screen.props';
import { ROUTES_IDS } from '../../navigators';

export const EventsView = ({
  breaker,
}: {
  breaker: SimpleBreaker;
}): JSX.Element => {
  const navigation = useNavigation();
  const { loading, data, events, event, setEvent, onPressFollow } =
    useEventsViewHook(breaker);
  if (loading && !data) {
    return <Loading />;
  }
  if (isEmpty(events)) {
    return (
      <EmptyState
        title={t('emptyResults.noEventScheduledForBreakerTitle')}
        description={t('emptyResults.noEventScheduledForBreakerDescription')}
      />
    );
  }
  return (
    <>
      <FlatList
        keyExtractor={item => item.id}
        style={[s.ml3, s.mb4]}
        horizontal
        data={events}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const eventData = breakerEventDetailSelector(item);
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
