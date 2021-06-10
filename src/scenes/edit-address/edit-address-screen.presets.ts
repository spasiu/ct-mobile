import * as Yup from 'yup';

import { t } from '../../i18n/i18n';

export const ADDRESS_FORM_FIELDS = {
  RECIPIENT: 'recipient',
  FIRST_LINE: 'line1',
  SECOND_LINE: 'line2',
  CITY: 'city',
  POSTAL_CODE: 'postal_zip_code',
  STATE_PROVINCE_REGION: 'state_provice_region',
  COUNTRY: 'country',
} as const;

export const ADDRESS_FORM_SCHEMA = Yup.object().shape({
  [ADDRESS_FORM_FIELDS.RECIPIENT]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [ADDRESS_FORM_FIELDS.FIRST_LINE]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [ADDRESS_FORM_FIELDS.SECOND_LINE]: Yup.string(),
  [ADDRESS_FORM_FIELDS.CITY]: Yup.string().required(t('forms.requiredField')),
  [ADDRESS_FORM_FIELDS.POSTAL_CODE]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [ADDRESS_FORM_FIELDS.COUNTRY]: Yup.string().required(
    t('forms.requiredField'),
  ),
});
