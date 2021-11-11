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
  getValidAuthTokenHandler,
} from './auth-handlers';

import { AuthProviderProps } from './auth.types';

export const AuthContext = createContext({});

export const AuthProvider = ({
  children,
  user,
  onboardingComplete,
  setOnboardingComplete,
}: AuthProviderProps): JSX.Element => {
  const client = useApolloClient();

  const getValidAuthToken = async () => {
    await getValidAuthTokenHandler(user);
  };

  const setOnboardingStatusComplete = async () => {
    await setOnboardingCompleteOnFirestore(user);
    setOnboardingComplete(true);
  };

  const checkOnboardingStatus = async () => {
    const onboardingStatus = await checkOnboardingStatusOnFirestore(user);
    setOnboardingComplete(onboardingStatus);
  };

  const logout = async () => {
    setOnboardingComplete(false);
    await logoutHandler(client);
  };

  const uploadPhoto = async (photo: ImagePickerResponse) => await uploadPhotoHandler(photo, user?.uid as string);

  return (
    <AuthContext.Provider
      value={{
        user,
        onboardingComplete,
        getValidAuthToken: getValidAuthToken,
        signUpWithEmail: emailSignUpHandler,
        signInWithEmail: emailSignInHandler,
        signInWithGoogle: googleSignInHandler,
        signInWithApple: appleSignInHandler,
        setOnboardingStatusComplete,
        checkOnboardingStatus,
        resetPassword: resetPasswordHandler,
        logout,
        uploadPhoto,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
