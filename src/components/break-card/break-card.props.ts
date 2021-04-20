import { ViewStyle, ImageSourcePropType } from 'react-native';

import { StatusBadgeTypes } from '../status-badge';
import { LeagueIconTypes } from '../league-icon';

export interface BreakCardProps {
  title: string;
  status: StatusBadgeTypes;
  league: LeagueIconTypes;
  breakerImage: ImageSourcePropType;
  breakType: string;
  price: number;
  spotsLeft: number;
  onPressFollow: () => void;
  onPressBuy: () => void;
  containerStyle: ViewStyle[];
}
