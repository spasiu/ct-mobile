import { CountryCode } from 'react-native-country-picker-modal';
import { FormInputStatusTypes } from '../form-input';

export interface CountryInputProps {
  value: CountryCode;
  errorMessage?: string;
  status?: keyof typeof FormInputStatusTypes;
  onFocus?: () => void;
  onBlur?: () => void;
  onSelected?: (countryCode: CountryCode) => void;
}
