import { StatusBadgeTypes } from './status-badge.props';

export const isStatusLive = (status: keyof typeof StatusBadgeTypes): boolean =>
  status === StatusBadgeTypes.live;

export const isStatusScheduled = (
  status: keyof typeof StatusBadgeTypes,
): boolean => status === StatusBadgeTypes.scheduled;
