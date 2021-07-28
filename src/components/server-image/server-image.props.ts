import { ViewStyle } from 'react-native';

export interface ServerImageProps {
  src: string;
  width: number;
  height: number;
  quality?: number;
  style?: ViewStyle[];
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  children?: React.ReactNode;
}
