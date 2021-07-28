import { pathOr } from 'ramda';

import { BreakerProfiles, Events, Users } from '../../services/api/requests';

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
