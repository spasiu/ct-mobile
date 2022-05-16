import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { errorDuplicateUsernameSelector } from '../../common/error';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { pipe, split, head, replace, pathOr } from 'ramda';
import { useContext, useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { t } from '../../i18n/i18n';
import {
  UpdateUserMutation,
  Users,
  useUpdateUserMutation,
} from '../../services/api/requests';

import { COMPLETE_PROFILE_FORM_FIELDS } from './complete-profile-screen.presets';
import {
  CompleteProfileScreenNavigationProp,
  useCompleteProfileScreenHookType,
} from './complete-profile-screen.props';

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

export const useCompleteProfileScreenHook = (
  navigation: CompleteProfileScreenNavigationProp,
): useCompleteProfileScreenHookType => {
  const { user, uploadPhoto, logout } = useContext(
    AuthContext,
  ) as AuthContextType;
  const { createUserOnPaymentPlatform } = useContext(
    PaymentContext,
  ) as PaymentContextType;
  const [activeField, setActiveField] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [updateUserMutation, { loading }] = useUpdateUserMutation({
    onError: e => {
      if (errorDuplicateUsernameSelector(e.graphQLErrors)) {
        showError(t('errors.duplicatedUsername'));
      } else {
        showError(t('errors.could_not_create_user'));
      }
    },
    onCompleted: async data => {
      setProcessing(true);
      const updatedUser = getUserFromUpdate(data);
      const created = await createUserOnPaymentPlatform(
        updatedUser[COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME] || '',
        updatedUser[COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME] || '',
      );
      setProcessing(false);
      if (created) {
        navigation.navigate(ROUTES_IDS.ONBOARDING_INSTRUCTIONS_SCREEN);
      }
    },
  });
  const firstNameField = useRef<TextInput>(null);
  const lastNameField = useRef<TextInput>(null);
  return {
    user,
    updateUserMutation,
    uploadingPhoto,
    setUploadingPhoto,
    uploadPhoto,
    activeField,
    setActiveField,
    firstNameField,
    lastNameField,
    loading,
    processing,
    logout,
  };
};
