import { ViewStyle } from 'react-native';

import { IconButtonProps } from '../icon-button/icon-button.props';

export interface SoundButtonProps extends IconButtonProps {
  muted?: boolean;
  style?: ViewStyle[];
}
