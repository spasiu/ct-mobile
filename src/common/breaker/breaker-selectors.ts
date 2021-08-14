import { pathOr, head } from 'ramda';

import {
  BreakerProfiles,
  Events,
  SaveBreaker,
  Users,
} from '../../services/api/requests';

export const breakerProfileSelector = (
  breaker: Users,
): Partial<BreakerProfiles> => pathOr({}, ['BreakerProfile'], breaker);

export const breakerBioSelector = (breaker: Users): string => {
  const profile = breakerProfileSelector(breaker);
  return pathOr('', ['bio'], profile);
};

export const breakerVideoSelector = (breaker: Users): string => {
  const profile = breakerProfileSelector(breaker);
  return pathOr('', ['video'], profile);
};

export const breakerEventsSelector = (breaker: Users): Events[] =>
  pathOr([], ['Events'], breaker);

export const breakerFollowersSelector = (breaker: Users): SaveBreaker[] =>
  pathOr([], ['Followers'], breaker);

export const breakerFollowedByUser = (breaker: Users): boolean => {
  const follows = breakerFollowersSelector(breaker);
  return follows.length > 0;
};

export const breakerFollowedByUserIdSelector = (breaker: Users): string => {
  const follows = breakerFollowersSelector(breaker);
  return pathOr('', ['id'], head(follows));
};
