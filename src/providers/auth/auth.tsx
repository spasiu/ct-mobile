import React, { createContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { ImagePickerResponse } from 'react-native-image-picker';

import {
  checkOnboardingStatusOnFirestore,
  setOnboardingCompleteOnFirestore,
} from '../../services/firestore/onboarding';

import {
  emailSignUpHandler,
  emailSignInHandler,
  googleSignInHandler,
  appleSignInHandler,
  resetPasswordHandler,
  logoutHandler,
  uploadPhotoHandler,
  getAuthTokenHandler,
} from './auth-handlers';

import { AuthProviderProps } from './auth.types';

export const AuthContext = createContext({});

export const AuthProvider = ({
  children,
  user,
  setToken,
  onboardingComplete,
  setOnboardingComplete,
}: AuthProviderProps): JSX.Element => {
  const client = useApolloClient();
  return (
    <AuthContext.Provider
      value={{
        user,
        onboardingComplete,
        getAuthToken: async () => await getAuthTokenHandler(user, setToken),
        signUpWithEmail: emailSignUpHandler,
        signInWithEmail: emailSignInHandler,
        signInWithGoogle: googleSignInHandler,
        signInWithApple: appleSignInHandler,
        setOnboardingStatusComplete: async () => {
          await setOnboardingCompleteOnFirestore(user);
          setOnboardingComplete(true);
        },
        checkOnboardingStatus: async () => {
          const onboardingStatus = await checkOnboardingStatusOnFirestore(
            user,
            onboardingComplete,
          );
          setOnboardingComplete(onboardingStatus);
        },
        resetPassword: resetPasswordHandler,
        logout: async () => {
          setToken('');
          setOnboardingComplete(false);
          await logoutHandler(client);
        },
        uploadPhoto: async (photo: ImagePickerResponse) =>
          await uploadPhotoHandler(photo, user?.uid as string),
      }}>
      {children}
    </AuthContext.Provider>
  );
};
