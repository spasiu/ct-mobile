import {
  userNameSelector,
  userImageSelector,
  userIdSelector,
} from '../../common/user-profile';
import { breakerProfileSelector } from '../../common/breaker';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventIdSelector,
  eventDescriptionSelector,
} from '../../common/event';
import {
  BreakCardProps,
  EventCardProps,
  SectionHeaderProps,
} from '../../components';
import { BreakersStackParamList } from '../../navigators/stacks/breakers-stack';
import { ProtectedStackParamList } from '../../navigators/stacks/protected-stack';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { Breaks, Events, Users } from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import {
  breakCardStatusSelector,
  breakDescriptionSelector,
  breakImageSelector,
  breakPriceSelector,
  breakSpotsSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import { Sports } from '../../common/sports';

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
> => {
  const breakerImage = breakImageSelector(eventBreak);
  return {
    eventDate: breakTimeSelector(eventBreak),
    status: breakCardStatusSelector(eventBreak),
    price: breakPriceSelector(eventBreak),
    spotsLeft: breakSpotsSelector(eventBreak),
    title: breakTitleSelector(eventBreak),
    breakType: breakTypeSelector(eventBreak),
    breakerImage: { uri: breakerImage },
    league: Sports.baseball,
  };
};

export const eventBreakerSelector = (breaker: Users): SectionHeaderProps => {
  const breakerImage = userImageSelector(breaker);
  return {
    title: userNameSelector(breaker),
    image: { uri: breakerImage },
  };
};

export const eventBreakerDetailSelector = (
  breaker: Users,
): BreakersStackParamList[typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN] => {
  return {
    id: userIdSelector(breaker),
    breaker: breakerProfileSelector(breaker),
    startOnEventsView: true,
  };
};

export const scheduleEventSelector = (event: Events): EventCardProps => {
  const eventTime = eventTimeSelector(event);
  const image = eventImageSelector(event);
  return {
    eventDate: formatScheduledStatus(eventTime),
    title: eventTitleSelector(event),
    status: eventCardStatusSelector(event),
    image: { uri: image || 'https://source.unsplash.com/600x801/?sports' },
    league: Sports.baseball,
  };
};

export const breakDetailSelector = (
  eventBreak: Breaks,
): ProtectedStackParamList[typeof ROUTES_IDS.BREAK_DETAIL_MODAL] => {
  const breakImage = breakImageSelector(eventBreak);
  return {
    productImage: {
      uri: breakImage || 'https://source.unsplash.com/600x801/?sports',
    },
    productTitle: breakTitleSelector(eventBreak),
    productDescription: breakDescriptionSelector(eventBreak),
    price: breakPriceSelector(eventBreak),
  };
};

export const eventDetailSelector = (
  event: Events,
  breaker: Users,
): Partial<ProtectedStackParamList[typeof ROUTES_IDS.EVENT_DETAIL_MODAL]> => {
  const breakerImage = userImageSelector(breaker);
  const image = eventImageSelector(event);
  const eventTime = eventTimeSelector(event);
  return {
    id: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: { uri: image || 'https://source.unsplash.com/600x801/?sports' },
    breaker: {
      name: userNameSelector(breaker),
      image: { uri: breakerImage },
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
    league: 'baseball',
  };
};
