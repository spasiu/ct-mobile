import { pathOr } from 'ramda';

import { Addresses } from '../../services/api/requests';

export const addressLineOneSelector = (address: Addresses): string =>
  pathOr('', ['line1'], address);

export const addressLineTwoSelector = (address: Addresses): string =>
  pathOr('', ['line2'], address);

export const addressCitySelector = (address: Addresses): string =>
  pathOr('', ['city'], address);

export const addressPostalCodeSelector = (address: Addresses): string =>
  pathOr('', ['postal_zip_code'], address);

export const addressStateSelector = (address: Addresses): string =>
  pathOr('', ['state_provice_region'], address);

export const addressCountrySelector = (address: Addresses): string =>
  pathOr('', ['country'], address);

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
