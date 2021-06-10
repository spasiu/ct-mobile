import * as Yup from 'yup';

import { t } from '../../i18n/i18n';

export const SIGN_UP_FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export const SIGN_UP_FORM_INITIAL_VALUES = {
  [SIGN_UP_FORM_FIELDS.EMAIL]: '',
  [SIGN_UP_FORM_FIELDS.PASSWORD]: '',
};

const MIN_CHAR_COUNT = 8;
const MAX_CHAR_COUNT = 250;
const MIN_LOWERCASE_CHAR_COUNT = 1;
const MIN_UPPERCASE_CHAR_COUNT = 1;
const MIN_NUMBER_COUNT = 1;
const MIN_SYMBOLS_COUNT = 1;

export const SIGN_UP_FORM_SCHEMA = Yup.object().shape({
  [SIGN_UP_FORM_FIELDS.EMAIL]: Yup.string()
    .email(t('forms.invalidEmail'))
    .required(t('forms.requiredField')),
  [SIGN_UP_FORM_FIELDS.PASSWORD]: Yup.string()
    .min(MIN_CHAR_COUNT, t('forms.fieldTooShort', { number: MIN_CHAR_COUNT }))
    .max(MAX_CHAR_COUNT, t('forms.fieldTooLong', { number: MAX_CHAR_COUNT }))
    .minLowercase(
      MIN_LOWERCASE_CHAR_COUNT,
      t('forms.fieldLowercase', { number: MIN_LOWERCASE_CHAR_COUNT }),
    )
    .minUppercase(
      MIN_UPPERCASE_CHAR_COUNT,
      t('forms.fieldUppercase', { number: MIN_UPPERCASE_CHAR_COUNT }),
    )
    .minNumbers(
      MIN_NUMBER_COUNT,
      t('forms.fieldNumbers', { number: MIN_NUMBER_COUNT }),
    )
    .minSymbols(
      MIN_SYMBOLS_COUNT,
      t('forms.fieldSymbols', { number: MIN_SYMBOLS_COUNT }),
    )
    .required(t('forms.requiredField')),
});

export const logo = require('../../assets/candt-logo.png');
export const appleLogo = require('../../assets/apple-logo.png');
export const googleLogo = require('../../assets/google-logo.png');
