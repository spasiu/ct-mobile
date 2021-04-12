import { ViewStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';

import { ContainerTypes } from './container.presets';

export interface ContainerProps {
  containerType: ContainerTypes;
  children?: React.ReactNode;
  style?: ViewStyle[];
  safeAreaStyle?: ViewStyle[];
  useSafeArea?: boolean;
  backgroundColor?: ViewStyle;
  safeAreaEdges?: Edge[];
}
