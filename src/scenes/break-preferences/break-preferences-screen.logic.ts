import {
  userSelector,
  userBreakPreferencesSelector,
} from '../../common/user-profile';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useContext, useEffect } from 'react';
import {
  UserPreferences,
  useUserPreferencesLazyQuery,
} from '../../services/api/requests';

export const useBreakPreferencesScreenHook = (): {
  breakPreferences: Partial<UserPreferences>;
} => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [getUserPreferences, { data }] = useUserPreferencesLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  useEffect(() => {
    getUserPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = userSelector(data);
  const breakPreferences = userBreakPreferencesSelector(user);
  return { breakPreferences };
};
