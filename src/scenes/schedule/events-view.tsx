import React, { useContext, useState, useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';

import { usersSelector } from '../../common/user-profile';
import { breakerEventsSelector } from '../../common/breaker';
import {
  SectionHeader,
  EventCard,
  Loading,
  EmptyState,
} from '../../components';
import { t } from '../../i18n/i18n';
import { indexedMap } from '../../utils/ramda';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  useScheduledEventsQuery,
  NewScheduledEventsDocument,
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
import { FilterContext, FilterContextType } from '../../providers/filter';

import {
  eventBreakerSelector,
  eventDetailSelector,
  scheduleEventSelector,
  eventBreakerDetailSelector,
  getBreakTypeFilter,
  shouldShowEventsEmptyState,
  getSportTypeFilter,
} from './schedule-screen.utils';
import { eventStatusSelector } from '../../common/event';

export const EventsView = (): JSX.Element => {
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { breakTypeFilter, sportTypeFilter } = useContext(
    FilterContext,
  ) as FilterContextType;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const navigation = useNavigation();
  const { loading, data, subscribeToMore } = useScheduledEventsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: authUser?.uid,
      breakTypeFilter: getBreakTypeFilter(breakTypeFilter),
      sportTypeFilter: getSportTypeFilter(sportTypeFilter),
    },
  });

  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NewScheduledEventsDocument,
      variables: {
        userId: authUser?.uid,
        breakTypeFilter: getBreakTypeFilter(breakTypeFilter),
        sportTypeFilter: getSportTypeFilter(sportTypeFilter),
      },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakTypeFilter, sportTypeFilter]);

  if (loading && !data) {
    return <Loading />;
  }

  const breakers = usersSelector(data);
  const hasNoEvents = shouldShowEventsEmptyState(breakers);
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
