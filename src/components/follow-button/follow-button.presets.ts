import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  FollowButtonTypes,
  FollowButtonSizeTypes,
} from './follow-button.props';

export const followingIcon = require('../../assets/check-icon.png');
export const followIcon = require('../../assets/plus-icon.png');

export const baseFullButtonStyle = [
  s.jcc,
  s.aic,
  s.ph3,
  s.badge_br,
  s.badge_height,
];

export const baseShortButtonStyle = [s.badge_icon, s.jcc, s.aic, s.br];

export const buttonTypeStyle = {
  [FollowButtonSizeTypes.full]: {
    [FollowButtonTypes.default]: [
      ...baseFullButtonStyle,
      s.bg_black_5,
    ] as ViewStyle[],
    [FollowButtonTypes.selected]: [
      ...baseFullButtonStyle,
      s.bg_black,
    ] as ViewStyle[],
  },
  [FollowButtonSizeTypes.short]: {
    [FollowButtonTypes.default]: [
      ...baseShortButtonStyle,
      s.bg_black,
    ] as ViewStyle[],
    [FollowButtonTypes.selected]: [
      ...baseShortButtonStyle,
      s.bg_positive,
    ] as ViewStyle[],
  },
};

export const baseTextStyle = [s.ff_alt_sb, s.f7];
export const baseImageStyle = [s.jcc, s.aic];

export const buttonContentStyle = {
  [FollowButtonSizeTypes.full]: {
    [FollowButtonTypes.default]: [...baseTextStyle, s.black] as TextStyle[],
    [FollowButtonTypes.selected]: [...baseTextStyle, s.white] as TextStyle[],
  },
  [FollowButtonSizeTypes.short]: {
    [FollowButtonTypes.default]: baseImageStyle as ImageStyle[],
    [FollowButtonTypes.selected]: baseImageStyle as ImageStyle[],
  },
};
