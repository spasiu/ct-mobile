import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { pipe, split, head, replace } from 'ramda';
import { ImagePickerResponse } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { showMessage } from 'react-native-flash-message';

import { t } from '../../i18n/i18n';

import { COMPLETE_PROFILE_FORM_FIELDS } from './complete-profile-screen.presets';

const getFirstName = pipe(split(' '), head);

export const getSuggestedName = (
  user: FirebaseAuthTypes.User | null,
): {
  [COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]: string;
  [COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]: string;
} => {
  if (user && user.displayName) {
    const { displayName } = user;
    const firstName = getFirstName(displayName) as string;
    const lastName = replace(firstName, '', displayName);

    return {
      [COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]: firstName,
      [COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]: lastName,
    };
  }

  return {
    [COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]: '',
    [COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]: '',
  };
};

export const getSuggestedUserPhotoURL = (
  user: FirebaseAuthTypes.User | null,
): { [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: string } => {
  if (user && user.photoURL) {
    return {
      [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: user.photoURL,
    };
  }

  return {
    [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: '',
  };
};

export const handlePhotoUpload = async (
  photo: ImagePickerResponse,
): Promise<string> => {
  try {
    const { fileName, uri } = photo;
    if (uri) {
      const reference = storage().ref(fileName);
      await reference.putFile(uri);
      const url = await storage().ref(fileName).getDownloadURL();
      return url;
    }
    showError();
    return '';
  } catch (e) {
    showError();
    return '';
  }
};

export const showError = (): void => {
  showMessage({
    message: t('errors.generic'),
    type: 'danger',
  });
};
