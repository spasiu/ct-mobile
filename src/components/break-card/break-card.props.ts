import { ViewStyle, ImageSourcePropType } from 'react-native';

import { StatusBadgeTypes } from '../status-badge';
import { LeagueIconTypes } from '../league-icon';

import { Break_Type_Enum } from '../../services/api/requests';
export interface BreakCardProps {
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
