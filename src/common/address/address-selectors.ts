import { omit, pathOr } from 'ramda';

import { Addresses } from '../../services/api/requests';

export const addressRecipientFirstNameSelector = (address: Addresses): string =>
  pathOr('', ['first_name'], address);

export const addressRecipientLastNameSelector = (address: Addresses): string =>
  pathOr('', ['last_name'], address);

export const addressLineOneSelector = (address: Addresses): string =>
  pathOr('', ['line1'], address);

export const addressLineTwoSelector = (address: Addresses): string =>
  pathOr('', ['line2'], address);

export const addressCitySelector = (address: Addresses): string =>
  pathOr('', ['city'], address);

export const addressPostalCodeSelector = (address: Addresses): string =>
  pathOr('', ['postal_zip_code'], address);

export const addressStateSelector = (address: Addresses): string =>
  pathOr('', ['state_province_region'], address);

export const addressCountrySelector = (address: Addresses): string =>
  pathOr('', ['country'], address);

export const addressIsDefaultSelector = (address: Addresses): boolean =>
  pathOr(false, ['is_default'], address);

export const addressRecipientSelector = (address: Addresses): string => {
  const firstName = addressRecipientFirstNameSelector(address);
  const lastName = addressRecipientLastNameSelector(address);
  return `${firstName} ${lastName}`;
};

export const addressCityAndStateOneLine = (address: Addresses): string => {
  const city = addressCitySelector(address);
  const state = addressStateSelector(address);
  return `${city}, ${state}`;
};

export const addressPostalCodeAndCountryOneLine = (
  address: Addresses,
): string => {
  const postalCode = addressPostalCodeSelector(address);
  const country = addressCountrySelector(address);
  return `${postalCode}, ${country}`;
};

export const addressSingleLineSelector = (
  address: Addresses | undefined,
): string => {
  return address
    ? `${addressLineOneSelector(address)}, ${
        addressLineTwoSelector(address)
          ? addressLineTwoSelector(address) + ', '
          : ''
      }${addressCitySelector(address)}, ${addressStateSelector(
        address,
      )}, ${addressPostalCodeSelector(address)}, ${addressCountrySelector(
        address,
      )}`
    : '';
};

export const addressCleanSelector = (address: Addresses): Addresses => {
  return omit(['is_default', '__typename', 'id'], address) as Addresses;
};

export const addressWithoutRecipientSelector = (
  address: Addresses,
): Addresses => omit(['first_name', 'last_name'], address) as Addresses;
