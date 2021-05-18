import { ViewStyle } from 'react-native';

import { ActionButtonTypes } from '../action-button';

export interface ActionFooterProps {
  containerStyle?: ViewStyle[];
  buttonText?: string;
  buttonType?: keyof typeof ActionButtonTypes;
  onPress?: () => void;
  children?: React.ReactNode;
}
