import { ViewStyle } from 'react-native';
import { ContainerTypes } from './container.presets';

export interface ContainerProps {
  containerType: ContainerTypes;
  children?: React.ReactNode;
  style?: ViewStyle[];
  safeAreaStyle?: ViewStyle[];
  useSafeArea?: boolean;
  backgroundColor?: ViewStyle;
}
