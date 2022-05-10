import { find, isEmpty, none, pathOr } from 'ramda';
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
  PickBreakCard,
} from '../../common/break';
import {
  breakerBioSelector,
  breakerEventsSelector,
  breakerFollowedByUser,
} from '../../common/breaker';
import {
  eventCardStatusSelector,
  eventDescriptionSelector,
  eventFollowedByUserSelector,
  eventIdSelector,
  eventImageSelector,
  eventTimeSelector,
  eventTitleSelector,
} from '../../common/event';
import {
  hitImageFrontSelector,
  hitPlayerSelector,
  hitsSelector,
} from '../../common/hit';
import {
  userImageSelector,
  userNameSelector,
  usersSelector,
} from '../../common/user-profile';
import {
  BreakerCardProps,
  EventCardProps,
  HitCardProps,
  SectionHeaderProps,
} from '../../components';
import { BreakersStackParamList, ROUTES_IDS } from '../../navigators';
import {
  Breaks,
  Events,
  FollowBreakMutation,
  Hits,
  SearchQuery,
  UnfollowBreakMutation,
  UnfollowEventMutation,
  useFollowBreakMutation,
  useFollowEventMutation,
  Users,
  useSearchLazyQuery,
  useUnfollowBreakMutation,
  useUnfollowEventMutation,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { SearchType, SEARCH_TYPES } from '../../common/search';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useContext, useState, useEffect } from 'react';
import { isSearchTermValid } from '../../utils/search';
import {
  useSearchModalHookType,
  useSearchBreaksHookType,
  useSearchEventsHookType,
} from './search-modal.props';
import {
  optimisticUnfollowEventResponse,
  updateUnfollowEventCache,
  optimisticFollowEventResponse,
  updateFollowEventCache,
  optimisticUnfollowBreakResponse,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
  updateUnfollowBreakCache,
} from '../../utils/cache';
import { ApolloCache, FetchResult } from '@apollo/client';

export const hitCardSelector = (hit: Hits): HitCardProps => {
  return {
    title: hitPlayerSelector(hit),
    image: hitImageFrontSelector(hit),
  };
};

export const searchEventBreakersSelector = (
  searchResponse: SearchQuery | undefined,
): Users[] => pathOr([], [SearchType.Events], searchResponse);

export const eventBreakerSelector = (breaker: Users): SectionHeaderProps => {
  return {
    title: userNameSelector(breaker),
    image: userImageSelector(breaker),
  };
};

export const eventDetailSelector = (
  event: Events,
  breaker: Users,
): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: userNameSelector(breaker),
      image: userImageSelector(breaker),
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
  };
};

export const scheduleEventSelector = (event: Events): EventCardProps => {
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

export const shouldShowEventsEmptyState = (breakers: Users[]): boolean => {
  return none(breaker => {
    const events = breakerEventsSelector(breaker);
    return events.length !== 0;
  }, breakers);
};

export const breakScheduleSelector = (eventBreak: Breaks): PickBreakCard => ({
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

export const breakerCardSelector = (breaker: Users): BreakerCardProps => ({
  breakerId: breaker.id,
  title: userNameSelector(breaker),
  image: userImageSelector(breaker),
  description: breakerBioSelector(breaker),
  userFollows: breakerFollowedByUser(breaker),
});

export const eventBreakerDetailSelector = (
  breaker: Users,
): BreakersStackParamList[typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN] => {
  return {
    breaker,
    startOnEventsView: true,
  };
};

export const noBreakersHaveEvents = (breakers: Users[]): boolean => {
  return none(breaker => {
    const events = breakerEventsSelector(breaker);
    return events.length !== 0;
  }, breakers);
};

export const useSearchModalHook = (): useSearchModalHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState<SearchType>(
    SearchType.Breaks,
  );

  const [startSearch, { data, loading }] = useSearchLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (isSearchTermValid(searchTerm)) {
      startSearch({
        variables: {
          searchInput: `%${searchTerm}%`,
          userId: authUser?.uid,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const firstTabWithContent = find(searchType => {
      const tabData = pathOr([], [searchType], data) as
        | Users[]
        | Breaks[]
        | Hits[];
      const nestedEventsEmpty =
        searchType === SearchType.Events
          ? noBreakersHaveEvents(tabData as Users[])
          : false;

      return !isEmpty(tabData) && !nestedEventsEmpty;
    }, SEARCH_TYPES);

    if (firstTabWithContent) {
      setSearchFilter(firstTabWithContent);
    }
  }, [data]);

  const hits = hitsSelector(data);
  const breaks = breaksSelector(data);
  const eventBreakers = searchEventBreakersSelector(data);
  const breakers = usersSelector(data);
  return {
    searchTerm,
    setSearchTerm,
    loading,
    searchFilter,
    setSearchFilter,
    hits,
    eventBreakers,
    breaks,
    breakers,
  };
};

export const useSearchEventsHook = (
  breakers: Users[],
): useSearchEventsHookType => {
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();
  const hasNoEvents = shouldShowEventsEmptyState(breakers);
  const onPressFollow = (item: Events, eventData: EventCardProps) => {
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
            cache: ApolloCache<UnfollowEventMutation>,
            followResponse: FetchResult<
              UnfollowEventMutation,
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
    onPressFollow,
    hasNoEvents,
  };
};

export const useSearchBreaksHook = (): useSearchBreaksHookType => {
  const [breakId, setBreakId] = useState<string>();
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();
  const onPressFollow = (eventBreak: Breaks, breakSchedule: PickBreakCard) => {
    const followData = {
      user_id: authUser?.uid,
      break_id: eventBreak.id,
    };
    breakSchedule.userFollows
      ? unfollowBreak({
          optimisticResponse: optimisticUnfollowBreakResponse(
            eventBreak,
            authUser?.uid as string,
          ),
          update: (cache: ApolloCache<UnfollowBreakMutation>) =>
            updateUnfollowBreakCache(cache, eventBreak),
          variables: followData,
        })
      : followBreak({
          optimisticResponse: optimisticFollowBreakResponse(
            eventBreak,
            authUser?.uid as string,
          ),
          update: (
            cache: ApolloCache<FollowBreakMutation>,
            followResponse: FetchResult<
              FollowBreakMutation,
              Record<string, any>,
              Record<string, any>
            >,
          ) => updateFollowBreakCache(cache, followResponse, eventBreak),
          variables: {
            follow: followData,
          },
        });
  };
  return { breakId, setBreakId, onPressFollow };
};
