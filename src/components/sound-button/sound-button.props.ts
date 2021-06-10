import { ViewStyle } from 'react-native';

import { IconButtonProps } from '../icon-button';

export interface SoundButtonProps extends IconButtonProps {
  muted?: boolean;
  style?: ViewStyle[];
}
