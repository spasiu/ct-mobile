import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { showMessage } from 'react-native-flash-message';
import { ApolloClient } from '@apollo/client';
import { ImagePickerResponse } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Intercom from '@intercom/intercom-react-native';

import { t } from '../../i18n/i18n';
import { hasHasuraClaim } from '../../utils/hasura';

import { AuthUser } from './auth.types';

export const emailSignUpHandler = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
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
    Intercom.logout();
    await auth().signOut();
    client.clearStore();
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
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

const MAX_RETRIES = 5;
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const getValidAuthTokenHandler = async (user: AuthUser, retry = 0): Promise<void> => {
  if (user) {
    try {
      user.getIdToken(true);
      const result = await user.getIdTokenResult();
      if (!hasHasuraClaim(result)) throw new Error('Hasura claims not defined');
      return;
    } catch (e) {
      if (retry > MAX_RETRIES) {
        throw e;
      }
      await wait(2 ** retry * 100);
      return getValidAuthTokenHandler(user, retry + 1);
    }
  }
}
