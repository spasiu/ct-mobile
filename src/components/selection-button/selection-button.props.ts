import { AwesomeButtonProps } from 'react-native-really-awesome-button';

export enum SelectionButtonTypes {
  default = 'default',
  selected = 'selected',
}
export interface SelectionButtonProps extends AwesomeButtonProps {
  buttonType?: keyof typeof SelectionButtonTypes;
  text?: string;
}
