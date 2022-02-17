import { CountryCode, Country } from 'react-native-country-picker-modal';

export interface CountryPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  countryCode?: CountryCode;
  preferredCountries: CountryCode[];
}
