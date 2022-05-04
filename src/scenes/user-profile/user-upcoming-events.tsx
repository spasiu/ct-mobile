import React, { useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { EmptyState, EventCard, Loading } from '../../components';
import { t } from '../../i18n/i18n';
import {
  useFollowEventMutation,
  useUnfollowEventMutation,
  Event_Status_Enum,
  useNewUserUpcomingEventsSubscription,
} from '../../services/api/requests';

import { isEmpty } from 'ramda';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { eventsSelector, eventStatusSelector } from '../../common/event';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  optimisticFollowEventResponse,
  optimisticUnfollowEventResponse,
  updateFollowEventCache,
  updateUnfollowEventCache,
} from '../../utils/cache';

import {
  upcomingEventSelector,
  eventDetailSelector,
} from './user-profile-screen.utils';
import { ROUTES_IDS } from '../../navigators';

export const UserUpcomingEvents = (): JSX.Element => {
  const navigation = useNavigation();
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});

  const { loading, data } = useNewUserUpcomingEventsSubscription({
    variables: { userId: authUser?.uid },
  });

  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();

  if (loading && !data) {
    return <Loading />;
  }

  const events = eventsSelector(data);
  if (isEmpty(events)) {
    return (
      <EmptyState
        title={t('emptyResults.noEventsFollowedByUserTitle')}
        description={t('emptyResults.noEventsFollowedByUserDescription')}
      />
    );
  }

  return (
    <>
      <FlatList
        keyExtractor={item => item.id}
        horizontal
        data={events}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const eventData = upcomingEventSelector(item);
          return (
            <EventCard
              {...eventData}
              onPress={() => {
                const eventStatus = eventStatusSelector(item);
                if (eventStatus === Event_Status_Enum.Live) {
                  navigation.navigate(ROUTES_IDS.LIVE_MODAL, {
                    eventId: item.id,
                  });
                } else {
                  setEvent(eventDetailSelector(item));
                }
              }}
              containerStyle={[s.mr3]}
              onPressFollow={() => {
                const followData = {
                  user_id: authUser?.uid,
                  event_id: item.id,
                };

                eventData.userFollows
                  ? unfollowEvent({
                      optimisticResponse: optimisticUnfollowEventResponse(
                        item,
                        authUser?.uid as string,
                      ),
                      update: cache => updateUnfollowEventCache(cache, item),
                      variables: followData,
                    })
                  : followEvent({
                      optimisticResponse: optimisticFollowEventResponse(
                        item,
                        authUser?.uid as string,
                      ),
                      update: (cache, followResponse) =>
                        updateFollowEventCache(cache, followResponse, item),
                      variables: {
                        follow: followData,
                      },
                    });
              }}
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
