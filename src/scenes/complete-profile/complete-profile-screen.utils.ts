import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { pipe, split, head, replace, pathOr } from 'ramda';
import { showMessage } from 'react-native-flash-message';

import { t } from '../../i18n/i18n';
import { UpdateUserMutation, Users } from '../../services/api/requests';

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
    /* we are disabling the pre-load of image from google for now
      return {
        [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: user.photoURL,
      };
    */
  }

  return {
    [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: '',
  };
};

export const showError = (message = ''): void => {
  showMessage({
    message: message ? message : t('errors.generic'),
    type: 'danger',
  });
};

export const getUserFromUpdate = (data: UpdateUserMutation): Partial<Users> => {
  const users = pathOr([], ['update_Users', 'returning'], data) as Users[];
  return head(users) || {};
};
