import * as Yup from 'yup';

import { t } from '../../i18n/i18n';

export const LOGIN_FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export const LOGIN_FORM_INITIAL_VALUES = {
  [LOGIN_FORM_FIELDS.EMAIL]: '',
  [LOGIN_FORM_FIELDS.PASSWORD]: '',
};

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
  [LOGIN_FORM_FIELDS.EMAIL]: Yup.string()
    .email(t('forms.invalidEmail'))
    .required(t('forms.requiredField')),
  [LOGIN_FORM_FIELDS.PASSWORD]: Yup.string().required(t('forms.requiredField')),
});

export const appleLogo = require('../../assets/apple-logo.png');
export const googleLogo = require('../../assets/google-logo.png');
