import React, { useContext } from 'react';
import { FollowButton } from '.';
import { FollowButtonTypes } from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { UserContext, UserContextType } from '../../providers/user';

import {
  useFollowBreakerMutation,
  useUnfollowBreakerMutation,
} from '../../services/api/requests';

export const FollowButtonBreaker = ({ breakerId }: { breakerId: string }) => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { handleModifyBreakersFollowed, userFollowsBreaker } = useContext(
    UserContext,
  ) as UserContextType;

  const [followBreaker] = useFollowBreakerMutation({
    onError: () => handleModifyBreakersFollowed(breakerId),
  });
  const [unfollowBreaker] = useUnfollowBreakerMutation({
    onError: () => handleModifyBreakersFollowed(breakerId),
  });

  return (
    <FollowButton
      onPress={() => {
        const followData = {
          user_id: authUser?.uid,
          breaker_id: breakerId,
        };

        if (userFollowsBreaker(breakerId)) {
          handleModifyBreakersFollowed(breakerId);
          unfollowBreaker({
            variables: followData,
          });
        } else {
          handleModifyBreakersFollowed(breakerId);
          followBreaker({
            variables: {
              follow: followData,
            },
          });
        }
      }}
      type={
        userFollowsBreaker(breakerId)
          ? FollowButtonTypes.selected
          : FollowButtonTypes.default
      }
    />
  );
};
