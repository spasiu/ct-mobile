import { ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export enum SelectableRowTypes {
  default = 'default',
  selected = 'selected',
}

export interface SelectableRowProps extends BorderlessButtonProps {
  rowStatus?: keyof typeof SelectableRowTypes;
  actionText?: string;
  onActionPressed?: () => void;
  children?: React.ReactNode;
  rowStyle?: ViewStyle[];
}
