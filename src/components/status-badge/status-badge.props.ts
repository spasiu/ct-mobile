import { BadgeProps } from '../badge/badge.props';

import { StatusBadgeTypes } from './status-badge.presets';

export interface StatusBadgeProps extends BadgeProps {
  status: StatusBadgeTypes;
  text?: string;
}
