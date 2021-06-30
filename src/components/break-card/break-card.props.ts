import { ViewStyle, ImageSourcePropType } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { Sports } from '../../common/sports';
import { Break_Type_Enum } from '../../services/api/requests';
import { StatusBadgeTypes } from '../status-badge';

export interface BreakCardProps extends BorderlessButtonProps {
  title?: string;
  status: StatusBadgeTypes;
  league: typeof Sports[keyof typeof Sports];
  breakerImage: ImageSourcePropType;
  breakType: Break_Type_Enum;
  eventDate?: string;
  price?: number;
  spotsLeft?: number;
  onPressFollow?: () => void;
  onPressBuy?: () => void;
  containerStyle?: ViewStyle[];
}
