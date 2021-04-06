import { AwesomeButtonProps } from 'react-native-really-awesome-button';

import { SelectionButtonTypes } from './selection-button.presets';

export interface SelectionButtonProps extends AwesomeButtonProps {
  buttonType?: SelectionButtonTypes;
  text?: string;
}
