import { ImageSourcePropType } from 'react-native';
import { pathOr, map, filter } from 'ramda';

import { BreakCardProps, EventCardProps } from '../../components';
import {
  Profiles_Select_Column,
  Breaks,
  Events,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';

const SOCIAL_PROFILES = [
  Profiles_Select_Column.Instagram,
  Profiles_Select_Column.Tiktok,
  Profiles_Select_Column.Twitter,
  Profiles_Select_Column.Facebook,
  Profiles_Select_Column.Linkedin,
];

const getSocialProfiles = breaker =>
  map(profile => {
    return {
      name: profile,
      url: breaker[profile],
    };
  }, SOCIAL_PROFILES);

export const breakerProfileSelector = breaker => {
  const firstName = pathOr('', ['first_name'], breaker);
  const lastName = pathOr('', ['last_name'], breaker);
  const breakerImage = pathOr('', ['image'], breaker);
  const description = pathOr('', ['bio'], breaker);
  const video = pathOr('', ['video'], breaker);

  const social = filter(
    profile => profile.url,
    getSocialProfiles({
      ...breaker,
      twitter: 'https://twitter.com/cardsntreasure',
      facebook: 'https://www.facebook.com/cardsandtreasure/',
      instagram: 'https://www.instagram.com/cardsandtreasure/',
    }),
  );
  return {
    name: `${firstName} ${lastName}`.trim(),
    image: { uri: breakerImage },
    social,
    video,
    description,
  };
};

export const breakerBreakSelector = (
  breaks: Breaks,
  breakerImage: ImageSourcePropType,
): BreakCardProps => {
  const eventPath = ['Event'];

  const eventDate = pathOr('', [...eventPath, 'start_time'], breaks);
  const status = pathOr('', [...eventPath, 'status'], breaks);
  return {
    eventDate: formatScheduledStatus(eventDate),
    status: status.toLowerCase(),
    price: breaks.price,
    spotsLeft: breaks.spots,
    title: breaks.title,
    breakType: breaks.break_type,
    breakerImage,
    league: 'baseball',
  };
};

export const breakerEventSelector = ({
  title,
  image,
  status,
  start_time,
}: Events): EventCardProps => {
  return {
    eventDate: formatScheduledStatus(start_time),
    league: 'baseball',
    status: status.toLowerCase(),
    image: { uri: image || 'https://source.unsplash.com/600x801/?sports' },
    title,
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
