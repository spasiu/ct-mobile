import { useContext, useState, useEffect } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NetworkStatus } from '@apollo/client';
import {
  userImageSelector,
  userNameSelector,
  userSelector,
} from '../../common/user-profile';
import {
  eventBreakerSelector,
  eventCardStatusSelector,
  eventDescriptionSelector,
  eventFollowedByUserSelector,
  eventIdSelector,
  eventImageSelector,
  eventsSelector,
  eventTimeSelector,
  eventTitleSelector,
} from '../../common/event';

import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import {
  useFollowBreakMutation,
  useLoggedUserQuery,
  useNewUserUpcomingBreaksSubscription,
  useUnfollowBreakMutation,
  useUpdateUserMutation,
  useNewUserUpcomingEventsSubscription,
  useFollowEventMutation,
  useUnfollowEventMutation,
  useHitsQuery,
  Hits,
  Breaks,
  Events,
  Users,
  FollowEventMutation,
  UnfollowEventMutation,
  UnfollowBreakMutation,
  FollowBreakMutation,
} from '../../services/api/requests';
import { FilterContext, FilterContextType } from '../../providers/filter';
import { isEmpty } from 'ramda';
import {
  NotificationContext,
  NotificationContextType,
} from '../../providers/notification';
import {
  userProfileScreenHookType,
  userSavesHookType,
  useUserUpcomingBreaksHookType,
  useUserUpcomingEventsHookType,
  useUserUpcomingHitsHookType,
} from './user-profile-screen.props';
import { SearchType } from '../../common/search';
import {
  breakBreakerSelector,
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breaksSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { hitsSelector } from '../../common/hit';
import { BreakCardProps, EventCardProps } from 'components';
import { formatScheduledStatus } from '../../utils/date';
import functions from '@react-native-firebase/functions';
import { ApolloCache, FetchResult } from '@apollo/client';
import {
  optimisticUnfollowEventResponse,
  updateUnfollowEventCache,
  optimisticFollowEventResponse,
  updateFollowEventCache,
  optimisticUnfollowBreakResponse,
  updateUnfollowBreakCache,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
} from '../../utils/cache';

export const breakScheduleSelector = (
  eventBreak: Breaks,
): Pick<
  BreakCardProps,
  | 'eventDate'
  | 'status'
  | 'price'
  | 'spotsLeft'
  | 'title'
  | 'breakType'
  | 'breakerImage'
  | 'league'
  | 'userFollows'
> => ({
  eventDate: formatScheduledStatus(breakTimeSelector(eventBreak)),
  status: breakCardStatusSelector(eventBreak),
  price: breakPriceSelector(eventBreak),
  spotsLeft: breakSpotsSelector(eventBreak),
  title: breakTitleSelector(eventBreak),
  breakType: breakTypeSelector(eventBreak),
  breakerImage: userImageSelector(breakBreakerSelector(eventBreak)),
  league: breakSportSelector(eventBreak),
  userFollows: breakFollowedByUserSelector(eventBreak),
});

export const upcomingEventSelector = (event: Events): EventCardProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    eventDate: formatScheduledStatus(eventTime),
    title: eventTitleSelector(event),
    status: eventCardStatusSelector(event),
    image: eventImageSelector(event),
    userFollows: eventFollowedByUserSelector(event),
  };
};

export const eventDetailSelector = (event: Events): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  const eventBreaker = eventBreakerSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: userNameSelector(eventBreaker),
      image: userImageSelector(eventBreaker as Users),
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
  };
};

export const deleteUser = functions().httpsCallable('deleteUser');

export const useUserProfileScreenHook = (): userProfileScreenHookType => {
  const {
    logout,
    uploadPhoto,
    user: authUser,
  } = useContext(AuthContext) as AuthContextType;
  const { cards, getCards, getDefaultPaymentCard, cleanPaymentInfo } =
    useContext(PaymentContext) as PaymentContextType;
  const { cleanFilters } = useContext(FilterContext) as FilterContextType;

  const { cleanNotificationData } = useContext(
    NotificationContext,
  ) as NotificationContextType;

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (isEmpty(cards)) {
      getCards(authUser as FirebaseAuthTypes.User);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading, refetch, networkStatus } = useLoggedUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const [updateUserMutation] = useUpdateUserMutation({
    onError: () => setUploadingPhoto(false),
    onCompleted: () => {
      refetch();
      setUploadingPhoto(false);
    },
  });

  const isRefetching = networkStatus === NetworkStatus.refetch;
  const user = userSelector(data);
  return {
    logout,
    uploadPhoto,
    userId: authUser?.uid,
    cards,
    getCards,
    getDefaultPaymentCard,
    cleanPaymentInfo,
    cleanFilters,
    cleanNotificationData,
    uploadingPhoto,
    setUploadingPhoto,
    confirmDelete,
    setConfirmDelete,
    data,
    loading,
    refetch,
    networkStatus,
    updateUserMutation,
    isRefetching,
    user,
  };
};

export const useUserSavesHook = (): userSavesHookType => {
  const [searchFilter, setSearchFilter] = useState<SearchType>(
    SearchType.Breaks,
  );
  return { searchFilter, setSearchFilter };
};

export const useUserUpcomingBreaksHook = (): useUserUpcomingBreaksHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakId, setBreakId] = useState<string>();
  const [limit, setLimit] = useState(3);
  const { data } = useNewUserUpcomingBreaksSubscription({
    variables: { userId: authUser?.uid },
  });
  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();
  const breaks = breaksSelector(data);
  const onFollow = (
    breakItem: Breaks,
    breakerBreakDetail: Pick<
      BreakCardProps,
      | 'title'
      | 'status'
      | 'eventDate'
      | 'price'
      | 'spotsLeft'
      | 'breakType'
      | 'breakerImage'
      | 'league'
      | 'userFollows'
    >,
  ): void => {
    const followData = {
      user_id: authUser?.uid,
      break_id: breakItem.id,
    };
    breakerBreakDetail.userFollows
      ? unfollowBreak({
          optimisticResponse: optimisticUnfollowBreakResponse(
            breakItem,
            authUser?.uid as string,
          ),
          update: (cache: ApolloCache<UnfollowBreakMutation>) =>
            updateUnfollowBreakCache(cache, breakItem),
          variables: followData,
        })
      : followBreak({
          optimisticResponse: optimisticFollowBreakResponse(
            breakItem,
            authUser?.uid as string,
          ),
          update: (
            cache: ApolloCache<FollowBreakMutation>,
            followResponse: FetchResult<
              FollowBreakMutation,
              Record<string, any>,
              Record<string, any>
            >,
          ) => updateFollowBreakCache(cache, followResponse, breakItem),
          variables: {
            follow: followData,
          },
        });
  };
  return {
    breakId,
    setBreakId,
    limit,
    setLimit,
    onFollow,
    breaks,
  };
};

export const useUserUpcomingEventsHook = (): useUserUpcomingEventsHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { loading, data } = useNewUserUpcomingEventsSubscription({
    variables: { userId: authUser?.uid },
  });
  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();
  const events = eventsSelector(data);
  const onFollow = (item: Events, eventData: EventCardProps) => {
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
          update: (cache: ApolloCache<UnfollowEventMutation>) =>
            updateUnfollowEventCache(cache, item),
          variables: followData,
        })
      : followEvent({
          optimisticResponse: optimisticFollowEventResponse(
            item,
            authUser?.uid as string,
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
  };
  return {
    event,
    setEvent,
    onFollow,
    events,
    loading,
  };
};

export const useUserUpcomingHitsHook = (): useUserUpcomingHitsHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [hitDetail, setHitDetail] = useState<Partial<Hits>>({});

  const { data } = useHitsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      searchInput: '%%',
      userHitsFilter: {
        _eq: authUser?.uid as string,
      },
    },
  });

  const hits = hitsSelector(data);

  return { hits, hitDetail, setHitDetail };
};
