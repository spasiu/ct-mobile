import { ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { Sports } from '../../common/sports';
import { Break_Type_Enum } from '../../services/api/requests';
import { StatusBadgeTypes } from '../status-badge';

export interface BreakCardProps extends BorderlessButtonProps {
  title?: string;
  status: StatusBadgeTypes;
  league: typeof Sports[keyof typeof Sports] | string;
  breakerImage: string;
  breakType: Break_Type_Enum;
  eventDate?: string;
  price?: string;
  spotsLeft?: string;
  onPressFollow?: () => void;
  userFollows?: boolean;
  onPressBuy?: () => void;
  containerStyle?: ViewStyle[];
}
