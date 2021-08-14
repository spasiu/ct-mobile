import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { showMessage } from 'react-native-flash-message';
import { ApolloClient } from '@apollo/client';
import { ImagePickerResponse } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import Intercom from '@intercom/intercom-react-native';

import { t } from '../../i18n/i18n';

import { AuthUser } from './auth.types';

export const emailSignUpHandler = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    const currentUser = auth().currentUser;
    if (currentUser) {
      await currentUser.sendEmailVerification();
    }
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      showMessage({
        message: t('errors.emailInUse'),
        type: 'danger',
      });
    } else {
      showMessage({
        message: t('errors.generic'),
        type: 'danger',
      });
    }
  }
};

export const emailSignInHandler = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    const currentUser = auth().currentUser;
    if (currentUser && !currentUser.emailVerified) {
      showMessage({
        message: t('errors.validateEmail'),
        type: 'warning',
      });
      await currentUser.sendEmailVerification();
    }
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
  }
};

export const googleSignInHandler = async (): Promise<void> => {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
  }
};

export const appleSignInHandler = async (): Promise<void> => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, nonce } = appleAuthRequestResponse;
    if (!identityToken) {
      throw 'Apple Sign-In Failed';
    }

    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    await auth().signInWithCredential(appleCredential);
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
  }
};

export const resetPasswordHandler = async (email: string): Promise<boolean> => {
  try {
    await auth().sendPasswordResetEmail(email);
    return true;
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return false;
  }
};

export const logoutHandler = async (
  client: ApolloClient<unknown>,
): Promise<void> => {
  try {
    // Intercom.logout();
    await auth().signOut();
    client.clearStore();
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
  }
};

export const checkOnboardingStatusHandler = async (
  user: AuthUser,
  onboardingComplete: boolean,
): Promise<boolean> => {
  try {
    if (!user) {
      return false;
    }

    if (onboardingComplete) {
      return true;
    }

    const userDocument = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();

    if (userDocument.exists) {
      const userData = userDocument.data() as { onboardingComplete: boolean };
      return userData.onboardingComplete;
    }

    return false;
  } catch (e) {
    return false;
  }
};

export const setOnboardingCompleteHandler = async (
  user: AuthUser,
): Promise<void> => {
  try {
    if (user) {
      await firestore().collection('Users').doc(user.uid).set(
        {
          onboardingComplete: true,
        },
        { merge: true },
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const uploadPhotoHandler = async (
  photo: ImagePickerResponse,
  userId: string,
): Promise<string> => {
  try {
    const { fileName, uri } = photo;
    if (uri && fileName) {
      const avatarPath = `users/${userId}/${fileName}`;
      const reference = storage().ref(avatarPath);
      await reference.putFile(uri);
      return `/${avatarPath}`;
    }
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return '';
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return '';
  }
};
