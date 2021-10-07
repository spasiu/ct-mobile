import React, { createContext, useState } from 'react';
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
  // temp flag to limit views of terms on live screen
  const [liveTermsAccepted, setLiveTermsAccepted] = useState(false);

  const client = useApolloClient();

  const getAuthToken = async () => {
    await getAuthTokenHandler(user, setToken);
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
    setToken('');
    setOnboardingComplete(false);
    await logoutHandler(client);
  };

  const uploadPhoto = async (photo: ImagePickerResponse) => {
    await uploadPhotoHandler(photo, user?.uid as string);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onboardingComplete,
        getAuthToken,
        signUpWithEmail: emailSignUpHandler,
        signInWithEmail: emailSignInHandler,
        signInWithGoogle: googleSignInHandler,
        signInWithApple: appleSignInHandler,
        setOnboardingStatusComplete,
        checkOnboardingStatus,
        resetPassword: resetPasswordHandler,
        logout,
        uploadPhoto,
        liveTermsAccepted,
        setLiveTermsAccepted,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
