import { ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { Sports } from '../../common/sports';
import { Break_Type_Enum } from '../../services/api/requests';

export interface ResultCardProps extends BorderlessButtonProps {
  title?: string;
  league: typeof Sports[keyof typeof Sports] | string;
  breakerImage: string;
  breakType: Break_Type_Enum;
  eventDate?: string;
  containerStyle?: ViewStyle[];
  setResult: () => void;
}
