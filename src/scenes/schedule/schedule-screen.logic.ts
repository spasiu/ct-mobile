import { userNameSelector, userImageSelector } from '../../common/user-profile';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventDescriptionSelector,
  eventIdSelector,
  eventFollowedByUserSelector,
  formatEvents,
} from '../../common/event';
import { EventCardProps, SectionHeaderProps } from '../../components';
import { BreakersStackParamList } from '../../navigators/stacks/breakers-stack';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  Breaks,
  Break_Type_Enum_Comparison_Exp,
  Events,
  String_Comparison_Exp,
  useFollowBreakMutation,
  useFollowEventMutation,
  useNewScheduledBreaksSubscription,
  useNewScheduledEventsSubscription,
  Users,
  useUnfollowBreakMutation,
  useUnfollowEventMutation,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import {
  breakBreakerSelector,
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
  PickBreakCard,
} from '../../common/break';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { none } from 'ramda';
import { breakerEventsSelector } from '../../common/breaker';
import {
  BreakTypeFilterOptions,
  FilterContext,
  FilterContextType,
  SportTypeFilterOptions,
} from '../../providers/filter';
import { ALL_FILTER_OPTION } from '../../providers/filter/filter.presets';
import { Sports } from '../../common/sports';
import { useContext, useState, useEffect } from 'react';
import {
  FilterType,
  useBreaksViewHookType,
  useEventViewHookType,
  useScheduleScreenHookType,
} from './schedule-screen.props';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  optimisticUnfollowEventResponse,
  updateUnfollowEventCache,
  optimisticFollowEventResponse,
  updateFollowEventCache,
  optimisticFollowBreakResponse,
  optimisticUnfollowBreakResponse,
  updateFollowBreakCache,
  updateUnfollowBreakCache,
} from '../../utils/cache';

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

export const eventBreakerSelector = (breaker: Users): SectionHeaderProps => {
  return {
    title: userNameSelector(breaker),
    image: userImageSelector(breaker),
  };
};

export const eventBreakerDetailSelector = (
  breaker: Users,
): BreakersStackParamList[typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN] => {
  return {
    breaker,
    startOnEventsView: true,
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

export const getBreakTypeFilter = (
  breakType: BreakTypeFilterOptions,
): Break_Type_Enum_Comparison_Exp => {
  if (breakType === ALL_FILTER_OPTION) {
    return {};
  }

  return { _eq: breakType };
};

export const getSportTypeFilter = (
  sportType: SportTypeFilterOptions,
): String_Comparison_Exp => {
  if (sportType === ALL_FILTER_OPTION) {
    return {};
  }

  return { _eq: sportType };
};

export const shouldShowEventsEmptyState = (breakers: Users[]): boolean => {
  return none(breaker => {
    const events = breakerEventsSelector(breaker);
    return events.length !== 0;
  }, breakers);
};

export const useScheduleScreenHook = (): useScheduleScreenHookType => {
  const {
    breakTypeFilter,
    sportTypeFilter,
    setBreakTypeFilter,
    setSportTypeFilter,
    itemTypeFilter,
    setItemTypeFilter,
  } = useContext(FilterContext) as FilterContextType;
  const [breaksView, setBreaksView] = useState(itemTypeFilter === 'Breaks');
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState<FilterType[]>([]);

  useEffect(() => {
    setBreaksView(itemTypeFilter === 'Breaks');
  }, [itemTypeFilter]);

  useEffect(() => {
    setFilters(
      [sportTypeFilter, breakTypeFilter].filter(
        filter => filter !== ALL_FILTER_OPTION,
      ),
    );
  }, [sportTypeFilter, breakTypeFilter]);

  const isSport = (filter: string): filter is Sports =>
    Object.values(Sports).includes(filter as Sports);

  return {
    breaksView,
    setBreaksView,
    setItemTypeFilter,
    filters,
    isSport,
    openModal,
    setOpenModal,
    sportTypeFilter,
    setSportTypeFilter,
    breakTypeFilter,
    setBreakTypeFilter,
  };
};

export const useEventsViewHook = (): useEventViewHookType => {
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { breakTypeFilter, sportTypeFilter } = useContext(
    FilterContext,
  ) as FilterContextType;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useNewScheduledEventsSubscription({
    variables: {
      userId: authUser?.uid,
      breakTypeFilter: getBreakTypeFilter(breakTypeFilter),
      sportTypeFilter: getSportTypeFilter(sportTypeFilter),
    },
  });

  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();

  const breakers = formatEvents(data);
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
  };

  return {
    loading,
    data,
    hasNoEvents,
    event,
    setEvent,
    breakers,
    onPressFollow,
  };
};

export const useBreaksViewHook = (): useBreaksViewHookType => {
  const [breakId, setBreakId] = useState<string>();
  const { breakTypeFilter, sportTypeFilter } = useContext(
    FilterContext,
  ) as FilterContextType;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useNewScheduledBreaksSubscription({
    variables: {
      userId: authUser?.uid as string,
      breakTypeFilter: getBreakTypeFilter(breakTypeFilter),
      sportTypeFilter: getSportTypeFilter(sportTypeFilter),
    },
  });

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
          update: cache => updateUnfollowBreakCache(cache, eventBreak),
          variables: followData,
        })
      : followBreak({
          optimisticResponse: optimisticFollowBreakResponse(
            eventBreak,
            authUser?.uid as string,
          ),
          update: (cache, followResponse) =>
            updateFollowBreakCache(cache, followResponse, eventBreak),
          variables: {
            follow: followData,
          },
        });
  };
  return { loading, data, breakId, setBreakId, onPressFollow };
};
