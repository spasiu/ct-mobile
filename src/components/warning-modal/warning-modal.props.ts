export interface WarningModalProps {
  visible?: boolean;
  title?: string;
  description?: string;
  primaryActionText?: string;
  onPrimaryActionPressed?: () => void;
  secondaryActionText?: string;
  onSecondaryActionPressed?: () => void;
}
