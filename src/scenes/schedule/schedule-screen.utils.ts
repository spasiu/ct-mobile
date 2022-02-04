import { userNameSelector, userImageSelector } from '../../common/user-profile';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventDescriptionSelector,
  eventIdSelector,
  eventFollowedByUserSelector,
} from '../../common/event';
import {
  BreakCardProps,
  EventCardProps,
  SectionHeaderProps,
} from '../../components';
import { BreakersStackParamList } from '../../navigators/stacks/breakers-stack';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  Breaks,
  Break_Type_Enum_Comparison_Exp,
  Events,
  String_Comparison_Exp,
  Users,
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
} from '../../common/break';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { none } from 'ramda';
import { breakerEventsSelector } from '../../common/breaker';
import {
  BreakTypeFilterOptions,
  SportTypeFilterOptions,
} from '../../providers/filter';
import { ALL_FILTER_OPTION } from '../../providers/filter/filter.presets';

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
> => {
  const breaker = breakBreakerSelector(eventBreak);
  const breakTime = breakTimeSelector(eventBreak);
  return {
    eventDate: formatScheduledStatus(breakTime),
    status: breakCardStatusSelector(eventBreak),
    price: breakPriceSelector(eventBreak),
    spotsLeft: breakSpotsSelector(eventBreak),
    title: breakTitleSelector(eventBreak),
    breakType: breakTypeSelector(eventBreak),
    breakerImage: userImageSelector(breaker as Users),
    league: breakSportSelector(eventBreak),
    userFollows: breakFollowedByUserSelector(eventBreak),
  };
};

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
