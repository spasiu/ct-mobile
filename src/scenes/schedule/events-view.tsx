import React, { useContext, useState, useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';

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
  useFollowEventMutation,
  useUnfollowEventMutation,
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
  eventBreakerDetailSelector,
} from './schedule-screen.utils';

export const EventsView = (): JSX.Element => {
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const navigation = useNavigation();
  const { loading, data, subscribeToMore } = useScheduledEventsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: authUser?.uid,
    },
  });

  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();

  useEffect(() => {
    subscribeToMore({
      document: NewScheduledEventsDocument,
      variables: {
        userId: authUser?.uid,
      },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !data) {
    return <Loading />;
  }

  return (
    <>
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
                renderItem={({ item }) => {
                  const eventData = scheduleEventSelector(item);
                  return (
                    <EventCard
                      {...eventData}
                      onPress={() =>
                        setEvent(eventDetailSelector(item, breaker))
                      }
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
        }, usersSelector(data))}
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
