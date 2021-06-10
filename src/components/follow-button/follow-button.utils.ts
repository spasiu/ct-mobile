import {
  FollowButtonTypes,
  FollowButtonSizeTypes,
} from './follow-button.props';

export const isFollowing = (type: keyof typeof FollowButtonTypes): boolean =>
  type === FollowButtonTypes.selected;

export const isSizeFull = (size: keyof typeof FollowButtonSizeTypes): boolean =>
  size === FollowButtonSizeTypes.full;
