import React from 'react';
import { View } from 'react-native';
import RNCountryPicker, {
  CountryCode,
} from 'react-native-country-picker-modal';
import Modal from 'react-native-modal';

import {
  SUPPORTED_COUNTRIES,
  PREFERRED_COUNTRIES,
} from '../../utils/countries';

import { CountryPickerProps } from './country-picker.props';
import {
  modalStyle,
  contentWrapperStyle,
  countryPickerTheme,
} from './country-picker.presets';

export const CountryPicker = ({
  isVisible,
  onClose,
  onSelect,
  countryCode,
}: CountryPickerProps): JSX.Element => {
  return (
    <Modal
      onBackdropPress={() => onClose()}
      isVisible={isVisible}
      style={modalStyle}>
      <View style={contentWrapperStyle}>
        <RNCountryPicker
          theme={countryPickerTheme}
          onClose={() => onClose()}
          withModal={false}
          countryCode={countryCode}
          countryCodes={SUPPORTED_COUNTRIES as CountryCode[]}
          withCloseButton={false}
          withFilter
          onSelect={onSelect}
          preferredCountries={PREFERRED_COUNTRIES as CountryCode[]}
        />
      </View>
    </Modal>
  );
};
