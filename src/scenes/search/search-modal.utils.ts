import { none, pathOr } from 'ramda';
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
import { hitImageFrontSelector, hitPlayerSelector } from '../../common/hit';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import {
  BreakCardProps,
  BreakerCardProps,
  EventCardProps,
  HitCardProps,
  SectionHeaderProps,
} from '../../components';
import { BreakersStackParamList, ROUTES_IDS } from '../../navigators';
import {
  Breaks,
  Events,
  Hits,
  SearchQuery,
  Users,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { SearchType } from '../../common/search';

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
