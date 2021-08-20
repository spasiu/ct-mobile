import {
  breakerBioSelector,
  breakerFollowedByUser,
} from '../../common/breaker';
import { userImageSelector, userNameSelector } from '../../common/user-profile';

import { BreakerCardProps } from '../../components';

import { Users, Users_Bool_Exp } from '../../services/api/requests';

export const breakerCardSelector = (breaker: Users): BreakerCardProps => ({
  title: userNameSelector(breaker),
  image: userImageSelector(breaker),
  description: breakerBioSelector(breaker),
  userFollows: breakerFollowedByUser(breaker),
});

export const getBreakerFilter = (
  followFilter: boolean,
  userId: string,
  searchTerm = '',
): Users_Bool_Exp => {
  const searchQuery = searchTerm
    ? {
        _or: [
          { username: { _ilike: `%${searchTerm}%` } },
          { first_name: { _ilike: `%${searchTerm}%` } },
          { last_name: { _ilike: `%${searchTerm}%` } },
        ],
      }
    : {};
  const breakerFilter = {
    is_breaker: { _eq: true },
    ...searchQuery,
  };

  return followFilter
    ? { ...breakerFilter, Followers: { user_id: { _eq: userId } } }
    : breakerFilter;
};
