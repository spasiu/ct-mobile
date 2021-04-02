import { ViewStyle, TextStyle, TextInputProps } from 'react-native';

import { FormInputStatusTypes } from './form-input.presets';

export interface FormInputProps extends TextInputProps {
  style?: ViewStyle[];
  labelStyle?: TextStyle[];
  label?: string;
  status?: FormInputStatusTypes;
}
