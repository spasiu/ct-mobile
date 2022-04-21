import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { StatusBadgeTypes } from './status-badge.props';

export const liveIcon = require('../../assets/live-icon.png');

export const badgeContainerPresets = {
  [StatusBadgeTypes.live]: [s.bg_secondary] as ViewStyle[],
  [StatusBadgeTypes.upcoming]: [s.bg_positive] as ViewStyle[],
  [StatusBadgeTypes.scheduled]: [s.bg_primary] as ViewStyle[],
  [StatusBadgeTypes.completed]: [s.bg_black_40] as ViewStyle[],
  [StatusBadgeTypes.upNext]: [s.bg_primary] as ViewStyle[],
  [StatusBadgeTypes.notified]: [s.bg_secondary] as ViewStyle[],
};

export const badgeTextPresets = {
  [StatusBadgeTypes.live]: 'status.live',
  [StatusBadgeTypes.upcoming]: 'status.upcoming',
  [StatusBadgeTypes.scheduled]: '',
  [StatusBadgeTypes.completed]: 'status.completed',
  [StatusBadgeTypes.upNext]: 'status.upNext',
  [StatusBadgeTypes.notified]: 'status.live',
};
