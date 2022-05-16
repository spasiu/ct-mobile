import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useContext, useState } from 'react';
import { RESET_PASSWORD_FORM_FIELDS } from './reset-password-screen.presets';
import {
  ResetPasswordScreenNavigationProp,
  useResetPasswordScreenHookType,
} from './reset-password-screen.props';

export const useResetPasswordScreenHook = (
  navigation: ResetPasswordScreenNavigationProp,
): useResetPasswordScreenHookType => {
  const { resetPassword } = useContext(AuthContext) as AuthContextType;
  const [activeField, setActiveField] = useState('');
  const [processing, setProcessing] = useState(false);
  const submit = async (values: { email: string }) => {
    setProcessing(true);
    const email = values[RESET_PASSWORD_FORM_FIELDS.EMAIL];
    const isEmailSent = await resetPassword(email);
    setProcessing(false);
    if (isEmailSent) {
      navigation.navigate(ROUTES_IDS.RESET_PASSWORD_CONFIRMATION_SCREEN, {
        email,
      });
    }
  };
  return { submit, activeField, setActiveField, processing };
};
