import { ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export interface SoundButtonProps extends BorderlessButtonProps {
  muted?: boolean;
  style?: ViewStyle[];
}
