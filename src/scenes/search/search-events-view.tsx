import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';
import { useNavigation } from '@react-navigation/native';

import { breakerEventsSelector } from '../../common/breaker';
import { SectionHeader, EventCard, EmptyState } from '../../components';
import { t } from '../../i18n/i18n';
import { indexedMap } from '../../utils/ramda';
import {
  Users,
  useFollowEventMutation,
  useUnfollowEventMutation,
  Event_Status_Enum,
} from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import {
  optimisticUnfollowEventResponse,
  updateUnfollowEventCache,
  optimisticFollowEventResponse,
  updateFollowEventCache,
} from '../../utils/cache';

import {
  eventBreakerSelector,
  eventDetailSelector,
  scheduleEventSelector,
  shouldShowEventsEmptyState,
} from './search-modal.utils';
import { SearchEventsViewProps } from './search-modal.props';
import { eventStatusSelector } from '../../common/event';
import { ROUTES_IDS } from '../../navigators';

export const SearchEventsView = ({
  breakers,
}: SearchEventsViewProps): JSX.Element => {
  const navigation = useNavigation();
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();

  const hasNoEvents = shouldShowEventsEmptyState(breakers);
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
        {indexedMap((user, index: number) => {
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
                              update: cache =>
                                updateUnfollowEventCache(cache, item),
                              variables: followData,
                            })
                          : followEvent({
                              optimisticResponse: optimisticFollowEventResponse(
                                item,
                                authUser?.uid as string,
                              ),
                              update: (cache, followResponse) =>
                                updateFollowEventCache(
                                  cache,
                                  followResponse,
                                  item,
                                ),
                              variables: {
                                follow: followData,
                              },
                            });
                      }}
                    />
                  );
                }}
              />
            </View>
          );
        }, breakers)}
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
