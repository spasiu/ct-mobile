import { pathOr } from 'ramda';

import { BreakerCardProps } from '../../components';

import { Users, Profiles } from '../../services/api/requests';

const profilePath = ['Profile'];

export const breakerSelector = (breaker: Users): BreakerCardProps => {
  const firstName = pathOr('', [...profilePath, 'first_name'], breaker);
  const lastName = pathOr('', [...profilePath, 'last_name'], breaker);
  const breakerImage = pathOr('', [...profilePath, 'image'], breaker);
  const description = pathOr('', [...profilePath, 'bio'], breaker);
  return {
    title: `${firstName} ${lastName}`.trim(),
    image: { uri: breakerImage },
    description,
  };
};

export const breakerProfileSelector = (breaker: Users): Profiles | {} => {
  return pathOr({}, profilePath, breaker);
};
