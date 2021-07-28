import { FormInputStatusTypes } from '../form-input';

export interface CountryInputProps {
  value: string;
  errorMessage?: string;
  status?: keyof typeof FormInputStatusTypes;
  onFocus?: () => void;
  onBlur?: () => void;
  onSelected?: (countryCode: string) => void;
}
