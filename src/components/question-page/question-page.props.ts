import { ViewStyle } from 'react-native';

import { QuestionOption } from '../../common/break-preferences';

export interface QuestionPageProps {
  showTitleBar?: boolean;
  translationRootKey?: string;
  questionKey: string;
  titleKey?: string;
  subtitleKey?: string;
  allowMultipleSelection?: boolean;
  options?: QuestionOption[];
  actionButtonText?: string;
  onActionPressed?: (alternatives: string | string[]) => void;
  containerStyle?: ViewStyle[];
  initialSelection?: string | string[];
  isLoading?: boolean;
}
