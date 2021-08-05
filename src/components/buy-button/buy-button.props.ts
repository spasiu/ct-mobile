import { ViewStyle } from 'react-native';

import { ActionButtonProps } from '../action-button';
export interface BuyButtonProps extends ActionButtonProps {
  containerStyle?: ViewStyle[];
  disabled?: boolean;
}
