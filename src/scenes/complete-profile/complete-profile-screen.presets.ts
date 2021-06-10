import * as Yup from 'yup';
import { ImageLibraryOptions } from 'react-native-image-picker';

import { t } from '../../i18n/i18n';

export const COMPLETE_PROFILE_FORM_FIELDS = {
  USER_PHOTO: 'image',
  USERNAME: 'username',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
} as const;

const MIN_CHAR_COUNT = 6;

export const COMPLETE_PROFILE_SCHEMA = Yup.object().shape({
  [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: Yup.string(),
  [COMPLETE_PROFILE_FORM_FIELDS.USERNAME]: Yup.string()
    .required(t('forms.requiredField'))
    .min(MIN_CHAR_COUNT, t('forms.fieldTooShort', { number: 6 }))
    .matches(/^[a-z0-9_]+$/, t('forms.fieldForbiddenCharacters')),
  [COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]: Yup.string().required(
    t('forms.requiredField'),
  ),
});

export const CAMERA_CONFIG: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 180,
  maxHeight: 180,
};
