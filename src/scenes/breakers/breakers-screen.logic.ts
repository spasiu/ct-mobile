import {
  breakerBioSelector,
  breakerFollowedByUser,
} from '../../common/breaker';
import { BreakerCardProps } from '../../components';
import { Users, Users_Bool_Exp } from '../../services/api/requests';
import { useContext, useEffect, useState } from 'react';
import {
  usersSelector,
  userSelector,
  userNameSelector,
  userImageSelector,
} from '../../common/user-profile';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  useBreakersLazyQuery,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { useBreakersScreenHookType } from './breakers-screen.props';

export const breakerCardSelector = (breaker: Users): BreakerCardProps => ({
  breakerId: breaker.id,
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

export const useBreakersScreenHook = (): useBreakersScreenHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [userBreakersFilterActive, setUserBreakersFilterActive] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [getBreakers, { loading, data, refetch, networkStatus }] =
    useBreakersLazyQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: authUser?.uid as string,
        breakerFilter: getBreakerFilter(
          userBreakersFilterActive,
          authUser?.uid as string,
          searchTerm,
        ),
      },
    });

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  useEffect(() => {
    getBreakers({
      variables: {
        userId: authUser?.uid as string,
        breakerFilter: getBreakerFilter(
          userBreakersFilterActive,
          authUser?.uid as string,
          searchTerm,
        ),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, userBreakersFilterActive]);

  const user = userSelector(users);
  const breakers = usersSelector(data);
  return {
    userBreakersFilterActive,
    setUserBreakersFilterActive,
    user,
    searchTerm,
    setSearchTerm,
    loading,
    data,
    refetch,
    networkStatus,
    breakers,
  };
};
