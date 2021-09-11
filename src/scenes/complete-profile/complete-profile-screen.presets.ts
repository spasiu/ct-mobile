import * as Yup from 'yup';

import { t } from '../../i18n/i18n';

export const COMPLETE_PROFILE_FORM_FIELDS = {
  USER_PHOTO: 'image',
  USERNAME: 'username',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
} as const;

const MIN_CHAR_COUNT = 4;
const MAX_CHAR_COUNT = 14;

export const COMPLETE_PROFILE_SCHEMA = Yup.object().shape({
  [COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]: Yup.string(),
  [COMPLETE_PROFILE_FORM_FIELDS.USERNAME]: Yup.string()
    .required(t('forms.requiredField'))
    .min(MIN_CHAR_COUNT, t('forms.fieldTooShort', { number: MIN_CHAR_COUNT }))
    .max(MAX_CHAR_COUNT, t('forms.fieldTooLong', { number: MAX_CHAR_COUNT }))
    .matches(/^[a-z0-9_]+$/, t('forms.fieldForbiddenCharacters')),
  [COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]: Yup.string().required(
    t('forms.requiredField'),
  ),
});
