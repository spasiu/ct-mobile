import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const BADGE_CONTAINER_PRESETS = {
  live: [s.bg_secondary] as ViewStyle[],
  upcoming: [s.bg_positive] as ViewStyle[],
  scheduled: [s.bg_primary] as ViewStyle[],
};

export const BADGE_TEXT_PRESETS = {
  live: 'status.live',
  upcoming: 'status.upcoming',
  scheduled: '',
};

export const isStatusLive = (status: string): boolean => status === 'live';
export const isStatusScheduled = (status: string): boolean =>
  status === 'scheduled';

export type StatusBadgeTypes = keyof typeof BADGE_TEXT_PRESETS;
