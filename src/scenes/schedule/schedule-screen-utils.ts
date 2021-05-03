import { pathOr } from 'ramda';

import {
  BreakCardProps,
  EventCardProps,
  SectionHeaderProps,
} from '../../components';
import {
  ScheduledBreakFragment,
  ScheduledEventFragment,
  Breaks,
  Events,
  Users,
  Break_Type_Enum,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';

export type ScheduledBreakQueryType = { __typename?: 'Breaks' } & Pick<
  Breaks,
  'id'
> &
  ScheduledBreakFragment;

export type ScheduledEventQueryType = { __typename?: 'Events' } & Pick<
  Events,
  'id' | 'title' | 'status' | 'image' | 'start_time'
>;

export type ScheduledEventBreakerQueryType = { __typename?: 'Users' } & Pick<
  Users,
  'id'
> &
  ScheduledEventFragment;

export const breaksScheduleSelector = (
  breaks: ScheduledBreakQueryType,
): BreakCardProps => {
  const eventPath = ['Event'];
  const profilePath = [...eventPath, 'User', 'Profile'];

  const eventDate = pathOr('', [...eventPath, 'start_time'], breaks);
  const status = pathOr('', [...eventPath, 'status'], breaks);
  const breakerImage = pathOr('', [...profilePath, 'image'], breaks);
  return {
    eventDate: formatScheduledStatus(eventDate),
    status: status.toLowerCase(),
    price: breaks.price,
    spotsLeft: breaks.spots,
    title: breaks.title,
    breakType: breaks.break_type,
    breakerImage: { uri: breakerImage },
    league: 'baseball',
  };
};

export const eventBreakerSelector = (
  breaker: ScheduledEventBreakerQueryType,
): SectionHeaderProps => {
  const profilePath = ['Profile'];

  const firstName = pathOr('', [...profilePath, 'first_name'], breaker);
  const lastName = pathOr('', [...profilePath, 'last_name'], breaker);
  const breakerImage = pathOr('', [...profilePath, 'image'], breaker);
  return {
    title: `${firstName} ${lastName}`.trim(),
    image: { uri: breakerImage },
  };
};

export const eventSelector = ({
  title,
  image,
  status,
  start_time,
}: ScheduledEventQueryType): EventCardProps => {
  return {
    eventDate: formatScheduledStatus(start_time),
    league: 'baseball',
    status: status.toLowerCase(),
    image: { uri: image || 'https://source.unsplash.com/600x801/?sports' },
    title,
  };
};

const ALL_FILTER_OPTION = 'ALL';
export const EVENT_TYPES = [
  ALL_FILTER_OPTION,
  ...Object.values(Break_Type_Enum),
];

export const TEXT_KEY_FOR_BREAK_TYPE = {
  [Break_Type_Enum.HitDraft]: 'filter.breakTypes.hitDraft',
  [Break_Type_Enum.Personal]: 'filter.breakTypes.personal',
  [Break_Type_Enum.PickYourDivision]: 'filter.breakTypes.pickYourDivision',
  [Break_Type_Enum.PickYourTeam]: 'filter.breakTypes.pickYourTeam',
  [Break_Type_Enum.RandomDivision]: 'filter.breakTypes.randomDivision',
  [Break_Type_Enum.RandomTeam]: 'filter.breakTypes.randomTeam',
  [ALL_FILTER_OPTION]: 'filter.all',
};
