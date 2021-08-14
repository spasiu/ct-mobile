import React, { createContext, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import {
  emailSignUpHandler,
  emailSignInHandler,
  googleSignInHandler,
  appleSignInHandler,
  checkOnboardingStatusHandler,
  resetPasswordHandler,
  setOnboardingCompleteHandler,
  logoutHandler,
  uploadPhotoHandler,
} from './auth-handlers';

import { AuthProviderProps, AuthUser } from './auth.types';
import { ImagePickerResponse } from 'react-native-image-picker';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<AuthUser>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const client = useApolloClient();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        onboardingComplete,
        signUpWithEmail: emailSignUpHandler,
        signInWithEmail: emailSignInHandler,
        signInWithGoogle: googleSignInHandler,
        signInWithApple: appleSignInHandler,
        setOnboardingStatusComplete: async () => {
          await setOnboardingCompleteHandler(user);
          setOnboardingComplete(true);
        },
        checkOnboardingStatus: async (authUser: AuthUser) => {
          const onboardingStatus = await checkOnboardingStatusHandler(
            authUser,
            onboardingComplete,
          );
          setOnboardingComplete(onboardingStatus);
        },
        resetPassword: resetPasswordHandler,
        logout: async () => {
          await logoutHandler(client);
        },
        uploadPhoto: async (photo: ImagePickerResponse) =>
          await uploadPhotoHandler(photo, user?.uid as string),
      }}>
      {children}
    </AuthContext.Provider>
  );
};
