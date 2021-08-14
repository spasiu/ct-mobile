import * as Yup from 'yup';

import { t } from '../../i18n/i18n';
import { isRegionCodeValid } from '../../utils/countries';

export const ADDRESS_FORM_FIELDS = {
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  FIRST_LINE: 'line1',
  SECOND_LINE: 'line2',
  CITY: 'city',
  POSTAL_CODE: 'postal_zip_code',
  STATE_PROVINCE_REGION: 'state_provice_region',
  COUNTRY: 'country',
} as const;

export const ADDRESS_FORM_SCHEMA = Yup.object().shape({
  [ADDRESS_FORM_FIELDS.FIRST_NAME]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [ADDRESS_FORM_FIELDS.LAST_NAME]: Yup.string().required(
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
  [ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]: Yup.string()
    .required(t('forms.requiredField'))
    .test('validCountryRegion', t('forms.fieldInvalidRegion'), (value, ctx) => {
      const country = ctx.parent[ADDRESS_FORM_FIELDS.COUNTRY];
      return isRegionCodeValid(country, value);
    }),
  [ADDRESS_FORM_FIELDS.COUNTRY]: Yup.string().required(
    t('forms.requiredField'),
  ),
});
