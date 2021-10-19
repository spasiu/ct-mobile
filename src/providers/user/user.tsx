import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserSavedBreakersQuery } from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../auth';

import { UserProviderProps } from './user.types';

export const UserContext = createContext({});

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [liveTermsAccepted, setLiveTermsAccepted] = useState(false);
  const [breakersFollowed, setBreakersFollowed] = useState<string[]>([]);

  const userFollowsBreaker = (breakerId: string) => {
    return breakersFollowed.includes(breakerId);
  };

  const handleModifyBreakersFollowed = (breakerId: string) => {
    userFollowsBreaker(breakerId)
      ? setBreakersFollowed(
          breakersFollowed.filter(breaker => breaker !== breakerId),
        )
      : setBreakersFollowed([...breakersFollowed, breakerId]);
  };

  const { data: breakersFollowedData } = useUserSavedBreakersQuery({
    fetchPolicy: 'cache-only',
    variables: { userId: authUser?.uid },
  });

  useEffect(() => {
    const data = breakersFollowedData?.Users[0].SavedBreakers.map(
      obj => obj.breaker_id,
    );
    data && setBreakersFollowed(data);
  }, [breakersFollowedData]);

  return (
    <UserContext.Provider
      value={{
        liveTermsAccepted,
        setLiveTermsAccepted,
        breakersFollowed,
        handleModifyBreakersFollowed,
        userFollowsBreaker,
      }}>
      {children}
    </UserContext.Provider>
  );
};
