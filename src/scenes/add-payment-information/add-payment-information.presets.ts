import * as Yup from 'yup';

import { t } from '../../i18n/i18n';

const CARD_EXPIRY_FIELD = 'cardExpiry';
const CARD_EXPIRY_MONTH = 'month';
const CARD_EXPIRY_YEAR = 'year';

const BILLING_ADDRESS_FIELD = 'billingAddress';
const BILLING_ADDRESS_FIRST_LINE = 'street';
const BILLING_ADDRESS_SECOND_LINE = 'stree2';
const BILLING_ADDRESS_CITY = 'city';
const BILLING_ADDRESS_POSTAL_CODE = 'zip';
const BILLING_ADDRESS_STATE = 'state';
const BILLING_ADDRESS_COUNTRY = 'country';

export const PAYMENT_FORM_FIELDS = {
  CREDIT_CARD_NUMBER: 'cardNum',
  CARD_EXPIRY_MONTH: `${CARD_EXPIRY_FIELD}.${CARD_EXPIRY_MONTH}`,
  CARD_EXPIRY_YEAR: `${CARD_EXPIRY_FIELD}.${CARD_EXPIRY_YEAR}`,
  HOLDER_NAME: 'holderName',
  ADDRESS_FIRST_LINE: `${BILLING_ADDRESS_FIELD}.${BILLING_ADDRESS_FIRST_LINE}`,
  ADDRESS_SECOND_LINE: `${BILLING_ADDRESS_FIELD}.${BILLING_ADDRESS_SECOND_LINE}`,
  CITY: `${BILLING_ADDRESS_FIELD}.${BILLING_ADDRESS_CITY}`,
  POSTAL_CODE: `${BILLING_ADDRESS_FIELD}.${BILLING_ADDRESS_POSTAL_CODE}`,
  STATE_PROVINCE_REGION: `${BILLING_ADDRESS_FIELD}.${BILLING_ADDRESS_STATE}`,
  COUNTRY: `${BILLING_ADDRESS_FIELD}.${BILLING_ADDRESS_COUNTRY}`,
} as const;

export const PAYMENT_FORM_INITIAL_VALUES = {
  [PAYMENT_FORM_FIELDS.CREDIT_CARD_NUMBER]: '',
  [CARD_EXPIRY_FIELD]: {
    [CARD_EXPIRY_MONTH]: NaN,
    [CARD_EXPIRY_YEAR]: NaN,
  },
  [PAYMENT_FORM_FIELDS.HOLDER_NAME]: '',
  [BILLING_ADDRESS_FIELD]: {
    [BILLING_ADDRESS_FIRST_LINE]: '',
    [BILLING_ADDRESS_SECOND_LINE]: '',
    [BILLING_ADDRESS_CITY]: '',
    [BILLING_ADDRESS_POSTAL_CODE]: '',
    [BILLING_ADDRESS_STATE]: '',
    [BILLING_ADDRESS_COUNTRY]: '',
  },
};

export const PAYMENT_FORM_SCHEMA = Yup.object().shape({
  [PAYMENT_FORM_FIELDS.CREDIT_CARD_NUMBER]: Yup.number().required(
    t('forms.requiredField'),
  ),
  [PAYMENT_FORM_FIELDS.HOLDER_NAME]: Yup.string().required(
    t('forms.requiredField'),
  ),
  [CARD_EXPIRY_FIELD]: Yup.object().shape({
    [CARD_EXPIRY_MONTH]: Yup.number().required(t('forms.requiredField')),
    [CARD_EXPIRY_YEAR]: Yup.number().required(t('forms.requiredField')),
  }),
  [BILLING_ADDRESS_FIELD]: Yup.object().shape({
    [BILLING_ADDRESS_FIRST_LINE]: Yup.string().required(
      t('forms.requiredField'),
    ),
    [BILLING_ADDRESS_SECOND_LINE]: Yup.string(),
    [BILLING_ADDRESS_CITY]: Yup.string().required(t('forms.requiredField')),
    [BILLING_ADDRESS_POSTAL_CODE]: Yup.string().required(
      t('forms.requiredField'),
    ),
    [BILLING_ADDRESS_STATE]: Yup.string().required(t('forms.requiredField')),
    [BILLING_ADDRESS_COUNTRY]: Yup.string().required(t('forms.requiredField')),
  }),
});
