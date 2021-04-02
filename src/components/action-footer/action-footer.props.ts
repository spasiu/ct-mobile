import { ViewStyle } from 'react-native';

import { ActionButtonTypes } from '../action-button/action-button.presets';

export interface ActionFooterProps {
  containerStyle?: ViewStyle[];
  buttonText?: string;
  buttonType?: ActionButtonTypes;
  onPress?: () => void;
  children?: React.ReactNode;
}
