import { ImageSourcePropType, TextStyle } from 'react-native';

export interface WarningModalProps {
  visible?: boolean;
  title?: string;
  description?: string;
  primaryActionText?: string;
  onPrimaryActionPressed?: () => void;
  secondaryActionText?: string;
  onSecondaryActionPressed?: () => void;
  loadingPrimaryAction?: boolean;
  imageSrc?: ImageSourcePropType;
  titleStyle?: TextStyle[];
}
