import { useContext, useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { AuthContext, AuthContextType } from '../../providers/auth';
import appsFlyer from 'react-native-appsflyer';
import { useSignUpScreenHookType } from './sign-up-screen.props';

const logSignUpEvent = (method: string): Promise<string> =>
  appsFlyer.logEvent('af_complete_registration', {
    af_registration_method: method,
  });

export const useSignUpScreenHook = (): useSignUpScreenHookType => {
  const { signInWithGoogle, signInWithApple, signUpWithEmail } = useContext(
    AuthContext,
  ) as AuthContextType;

  const [activeField, setActiveField] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const signInApple = () =>
    signInWithApple().then(isAuthed => {
      if (isAuthed) logSignUpEvent('apple');
    });
  const signInGoogle = () =>
    signInWithGoogle().then(isAuthed => {
      if (isAuthed) logSignUpEvent('google');
    });
  const signUpEmail = (email: string, password: string) => {
    setProcessing(true);
    signUpWithEmail(email, password).then(isAuthed => {
      if (isAuthed) logSignUpEvent('apple');
    });
    setProcessing(false);
  };
  return {
    signInGoogle,
    signInApple,
    signUpEmail,
    password: passwordRef,
    processing,
    activeField,
    setActiveField,
  };
};
