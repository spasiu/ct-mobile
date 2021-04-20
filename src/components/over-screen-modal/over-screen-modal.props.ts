import { ModalProps } from 'react-native';

export interface OverScreenModalProps extends ModalProps {
  ratio?: number;
  title?: string;
  action?: string;
  onPressClose?: () => void;
  onPressAction?: () => void;
  children?: React.ReactNode;
}
