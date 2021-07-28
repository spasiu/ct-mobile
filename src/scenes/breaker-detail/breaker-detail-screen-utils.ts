import { map, filter } from 'ramda';

import { BreakCardProps, EventCardProps } from '../../components';
import { BreakerProfiles, Breaks, Events } from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { SOCIAL_PROFILES } from '../../common/breaker/social-profile-options';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import {
  breakCardStatusSelector,
  breakPriceSelector,
  breakSpotsSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import {
  breakerBioSelector,
  breakerProfileSelector,
  breakerVideoSelector,
} from '../../common/breaker';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
} from '../../common/event';
import { Sports } from '../../common/sports';

const getSocialProfiles = (breaker: BreakerProfiles) =>
  map(profile => {
    return {
      name: profile,
      url: breaker[profile],
    };
  }, SOCIAL_PROFILES);

export const breakerDetailScreenSelector = breaker => {
  const breakerProfile = breakerProfileSelector(breaker);
  const social = filter(
    profile => profile.url,
    getSocialProfiles(breakerProfile),
  );
  return {
    id: breaker.id,
    name: userNameSelector(breaker),
    image: userImageSelector(breaker),
    video: breakerVideoSelector(breaker),
    description: breakerBioSelector(breaker),
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
    league: Sports.baseball,
    breakerImage,
  };
};

export const breakerEventDetailSelector = (event: Events): EventCardProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventDate: formatScheduledStatus(eventTime),
    title: eventTitleSelector(event),
    status: eventCardStatusSelector(event),
    image: eventImageSelector(event),
    league: Sports.baseball,
  };
};

export const breakDetailSelector = ({
  price,
  title,
  description,
  image,
}: Breaks) => {
  return {
    productImage: {
      uri: image || 'https://source.unsplash.com/600x801/?sports',
    },
    productTitle: title,
    productDescription: description,
    price,
  };
};

export const eventDetailSelector = (event, breaker) => {
  const { id, image, title, status, description, start_time } = event;
  return {
    id,
    title,
    image: { uri: image || 'https://source.unsplash.com/600x801/?sports' },
    breaker,
    status: status.toLowerCase(),
    description,
    league: 'baseball',
    eventDate: formatScheduledStatus(start_time),
  };
};
