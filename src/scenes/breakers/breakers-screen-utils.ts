import {
  breakerBioSelector,
  breakerFollowedByUser,
} from '../../common/breaker';
import { userImageSelector, userNameSelector } from '../../common/user-profile';

import { BreakerCardProps } from '../../components';

import { Users } from '../../services/api/requests';

export const breakerCardSelector = (breaker: Users): BreakerCardProps => ({
  title: userNameSelector(breaker),
  image: userImageSelector(breaker),
  description: breakerBioSelector(breaker),
  userFollows: breakerFollowedByUser(breaker),
});
