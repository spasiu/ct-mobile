import React, { useState, useEffect } from 'react';
import { head } from 'ramda';
import {
  getAllCountries,
  FlagType,
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import Emoji from 'node-emoji';

import { FormInput } from '../form-input';
import { CountryPicker } from '../country-picker';

import { t } from '../../i18n/i18n';
import { getUserCountry } from '../../utils/countries';

import { CountryInputProps } from './country-input.props';

export const CountryInput = ({
  value = '',
  errorMessage = '',
  onFocus = () => undefined,
  onBlur = () => undefined,
  onSelected = () => undefined,
  status,
}: CountryInputProps): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [country, setCountry] = useState<Partial<Country>>({
    name: '',
    flag: '',
  });

  useEffect(() => {
    const userCountry = value || getUserCountry();
    getAllCountries(FlagType.EMOJI, 'common', undefined, undefined, [
      userCountry as CountryCode,
    ]).then((countries: Country[]) => {
      const firstCountry = head(countries) as Country;
      setCountry(firstCountry);
      onSelected(firstCountry.cca2);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CountryPicker
        countryCode={country.cca2 as CountryCode}
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
        preferredCountries={[country.cca2 as CountryCode]}
      />
      <FormInput
        status={status}
        value={`${Emoji.get(country.flag as string)} ${country.name}`}
        errorMessage={errorMessage}
        placeholder={t('forms.countryLabel')}
        onTouchStart={() => {
          onFocus();
          setOpenModal(true);
        }}
        isPicker={true}
      />
    </>
  );
};
