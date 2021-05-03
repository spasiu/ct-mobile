import { ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card/image-card.props';
import { LeagueIconTypes } from '../league-icon/league-icon.presets';

export interface EventCardProps extends ImageCardProps {
  title?: string;
  contentContainerStyle?: ViewStyle[];
  league: LeagueIconTypes;
  eventDate: string;
  status: 'live' | 'upcoming' | 'scheduled'; // change to data status when models available
}
