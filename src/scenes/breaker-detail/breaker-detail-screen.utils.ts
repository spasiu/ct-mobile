import { map, filter } from 'ramda';

import {
  BreakCardProps,
  EventCardProps,
  SocialIconTypes,
} from '../../components';
import {
  BreakerProfiles,
  BreakerProfiles_Select_Column,
  Breaks,
  Events,
  Users,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { SOCIAL_PROFILES } from '../../common/breaker/social-profile-options';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import {
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
  breakerFollowedByUser,
  breakerProfileSelector,
  breakerVideoSelector,
} from '../../common/breaker';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventIdSelector,
  eventDescriptionSelector,
  eventFollowedByUserSelector,
} from '../../common/event';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import {
  BreakerProfileComponentProps,
  SimpleBreaker,
} from './breaker-detail-screen.props';

const getSocialProfiles = (breaker: BreakerProfiles) =>
  map(profile => {
    return {
      name: profile as keyof typeof SocialIconTypes,
      url: breaker[profile as BreakerProfiles_Select_Column],
    };
  }, SOCIAL_PROFILES);

export const breakerDetailScreenSelector = (
  breaker: Users,
): BreakerProfileComponentProps => {
  const breakerProfile = breakerProfileSelector(breaker);
  const social = filter(
    profile => profile.url,
    getSocialProfiles(breakerProfile as BreakerProfiles),
  );
  return {
    id: breaker.id,
    name: userNameSelector(breaker),
    image: userImageSelector(breaker),
    video: breakerVideoSelector(breaker),
    description: breakerBioSelector(breaker),
    userFollows: breakerFollowedByUser(breaker),
    social,
  };
};

export const breakerDetailBreakSelector = (
  eventBreak: Breaks,
  breakerImage: string,
): BreakCardProps => {
  const breakTime = breakTimeSelector(eventBreak);
  return {
    eventDate: formatScheduledStatus(breakTime),
    status: breakCardStatusSelector(eventBreak),
    price: breakPriceSelector(eventBreak),
    spotsLeft: breakSpotsSelector(eventBreak),
    title: breakTitleSelector(eventBreak),
    breakType: breakTypeSelector(eventBreak),
    league: breakSportSelector(eventBreak),
    breakerImage,
    userFollows: breakFollowedByUserSelector(eventBreak),
  };
};

export const breakerEventDetailSelector = (event: Events): EventCardProps => {
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
  breaker: SimpleBreaker,
): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: breaker.name as string,
      image: breaker.image as string,
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
  };
};
