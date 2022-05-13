import { useContext } from 'react';
import { showMessage } from 'react-native-flash-message';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useUpdateUserPreferencesMutation } from '../../services/api/requests';
import {
  EditBreakPreferencesScreenNavigationProps,
  useEditBreakPreferencesScreenHookType,
} from './edit-break-preferences-screen.props';

export const useEditBreakPreferencesScreenHook = (
  navigation: EditBreakPreferencesScreenNavigationProps,
): useEditBreakPreferencesScreenHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [updateUserPreferences, { loading }] = useUpdateUserPreferencesMutation(
    {
      onError: () =>
        showMessage({
          message: t('errors.could_not_set_preferences'),
          type: 'danger',
        }),
      onCompleted: () => navigation.navigate(ROUTES_IDS.USER_PROFILE_SCREEN),
    },
  );
  return { userId: authUser?.uid, updateUserPreferences, loading };
};
