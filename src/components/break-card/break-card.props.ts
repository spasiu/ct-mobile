import { ViewStyle, ImageSourcePropType } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { StatusBadgeTypes } from '../status-badge';
import { LeagueIconTypes } from '../league-icon';
import { Break_Type_Enum } from '../../services/api/requests';
export interface BreakCardProps extends BorderlessButtonProps {
  title: string;
  status: StatusBadgeTypes;
  league: LeagueIconTypes;
  breakerImage: ImageSourcePropType;
  breakType: Break_Type_Enum;
  eventDate: string;
  price: number;
  spotsLeft: number;
  onPressFollow: () => void;
  onPressBuy: () => void;
  containerStyle: ViewStyle[];
}
