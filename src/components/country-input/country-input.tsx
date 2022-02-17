import React, { useState, useEffect } from 'react';
import { head } from 'ramda';
import {
  getAllCountries,
  FlagType,
  Country
} from 'react-native-country-picker-modal';
import Emoji from 'node-emoji';

import { FormInput } from '../form-input';
import { CountryPicker } from '../country-picker';

import { t } from '../../i18n/i18n';
import { getUserCountry, PREFERRED_COUNTRIES } from '../../utils/countries';

import { CountryInputProps } from './country-input.props';

export const CountryInput = ({
  value,
  errorMessage = '',
  onFocus = () => undefined,
  onBlur = () => undefined,
  onSelected = () => undefined,
  status,
}: CountryInputProps): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [country, setCountry] = useState<Country>();
  const preferredCountries = [
    ...PREFERRED_COUNTRIES.filter(countryCode => countryCode !== country?.cca2),
  ];

  useEffect(() => {
    const userCountry = value || getUserCountry();
    getAllCountries(FlagType.EMOJI, 'common', undefined, undefined, [userCountry]).then((countries: Country[]) => {
      const firstCountry = head(countries);
      if (firstCountry) {
        setCountry(firstCountry);
        onSelected(firstCountry.cca2);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CountryPicker
        countryCode={country?.cca2}
        onClose={() => {
          setOpenModal(false);
          onBlur();
        }}
        isVisible={openModal}
        onSelect={(selectedCountry: Country) => {
          setCountry(selectedCountry);
          onSelected(selectedCountry.cca2);
          onBlur();
        }}
        preferredCountries={preferredCountries}
      />
      <FormInput
        status={status}
        value={`${Emoji.get(country?.flag || '')} ${country?.name || ''}`}
        errorMessage={errorMessage}
        placeholder={t('forms.countryLabel')}
        onTouchStart={() => {
          onFocus();
          setOpenModal(true);
        }}
        isPicker={true}
        openModal={()=> {
          onFocus();
          setOpenModal(true);
        }}
      />
    </>
  );
};
