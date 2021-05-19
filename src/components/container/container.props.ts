import { ViewStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';

export enum ContainerTypes {
  fixed = 'fixed',
  scroll = 'scroll',
}
export interface ContainerProps {
  containerType: keyof typeof ContainerTypes;
  children?: React.ReactNode;
  style?: ViewStyle[];
  safeAreaStyle?: ViewStyle[];
  useSafeArea?: boolean;
  backgroundColor?: ViewStyle;
  safeAreaEdges?: Edge[];
}
