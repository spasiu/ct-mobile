import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import { EmptyState, EventCard, Loading } from '../../components';
import { t } from '../../i18n/i18n';
import {
  Event_Status_Enum,
  FollowEventMutation,
  UnfollowEventMutation,
} from '../../services/api/requests';

import { isEmpty } from 'ramda';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { eventStatusSelector } from '../../common/event';

import {
  optimisticFollowEventResponse,
  optimisticUnfollowEventResponse,
  updateFollowEventCache,
  updateUnfollowEventCache,
} from '../../utils/cache';

import { ROUTES_IDS } from '../../navigators';
import {
  useUserUpcomingEventsHook,
  upcomingEventSelector,
  eventDetailSelector,
} from './user-profile-screen.logic';
import { ApolloCache, FetchResult } from '@apollo/client';

export const UserUpcomingEvents = (): JSX.Element => {
  const navigation = useNavigation();
  const {
    userId,
    event,
    setEvent,
    followEvent,
    unfollowEvent,
    events,
    loading,
  } = useUserUpcomingEventsHook();

  if (loading && !events) {
    return <Loading />;
  }

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
              eventId={item.id}
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
                  user_id: userId,
                  event_id: item.id,
                };

                eventData.userFollows
                  ? unfollowEvent({
                      optimisticResponse: optimisticUnfollowEventResponse(
                        item,
                        userId as string,
                      ),
                      update: (cache: ApolloCache<UnfollowEventMutation>) =>
                        updateUnfollowEventCache(cache, item),
                      variables: followData,
                    })
                  : followEvent({
                      optimisticResponse: optimisticFollowEventResponse(
                        item,
                        userId as string,
                      ),
                      update: (
                        cache: ApolloCache<FollowEventMutation>,
                        followResponse: FetchResult<
                          FollowEventMutation,
                          Record<string, any>,
                          Record<string, any>
                        >,
                      ) => updateFollowEventCache(cache, followResponse, item),
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
