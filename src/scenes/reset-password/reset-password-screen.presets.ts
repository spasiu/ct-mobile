import * as Yup from 'yup';

import { t } from '../../i18n/i18n';

export const RESET_PASSWORD_FORM_FIELDS = {
  EMAIL: 'email',
} as const;

export const RESET_PASSWORD_FORM_INITIAL_VALUES = {
  [RESET_PASSWORD_FORM_FIELDS.EMAIL]: '',
};

export const RESET_PASSWORD_FORM_SCHEMA = Yup.object().shape({
  [RESET_PASSWORD_FORM_FIELDS.EMAIL]: Yup.string()
    .email(t('forms.invalidEmail'))
    .required(t('forms.requiredField')),
});
