import { ViewStyle, TextStyle, TextInputProps } from 'react-native';

export enum FormInputStatusTypes {
  active = 'active',
  disabled = 'disabled',
  error = 'error',
  default = 'default',
}

export interface FormInputProps extends TextInputProps {
  style?: ViewStyle[];
  labelStyle?: TextStyle[];
  label?: string;
  status?: keyof typeof FormInputStatusTypes;
  errorMessage?: string;
  containerStyle?: ViewStyle[];
  inputStyle?: ViewStyle[];
  showTooltip?: boolean;
  tooltipText?: string;
}
