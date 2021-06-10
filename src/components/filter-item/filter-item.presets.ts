import { styles as s } from 'react-native-style-tachyons';

import { FilterItemTypes, FilterItemStatusTypes } from './filter-item.props';

const containerCircleBaseStyle = [
  s.circle_l,
  s.bg_white,
  s.shadow_s,
  s.jcc,
  s.aic,
  s.ba,
];

const containerPillBaseStyle = [s.badge_height, s.jcc, s.aic];

export const containerStylePresets = {
  [FilterItemTypes.pill_default]: {
    [FilterItemStatusTypes.default]: [
      ...containerPillBaseStyle,
      s.bg_transparent,
    ],
    [FilterItemStatusTypes.selected]: [
      ...containerPillBaseStyle,
      s.bg_black,
      s.badge_br,
    ],
  },
  [FilterItemTypes.pill_alt]: {
    [FilterItemStatusTypes.default]: [
      ...containerPillBaseStyle,
      s.black_5,
      s.b__black_10,
      s.ba,
      s.badge_br,
    ],
    [FilterItemStatusTypes.selected]: [
      ...containerPillBaseStyle,
      s.bg_black,
      s.badge_br,
    ],
  },
  [FilterItemTypes.circle]: {
    [FilterItemStatusTypes.default]: [
      ...containerCircleBaseStyle,
      s.b__black_10,
    ],
    [FilterItemStatusTypes.selected]: [
      ...containerCircleBaseStyle,
      s.b__black_40,
    ],
  },
};

export const baseTextStyle = [s.ff_alt_sb, s.f6, s.ph3];

export const textStylePresets = {
  [FilterItemTypes.pill_default]: {
    [FilterItemStatusTypes.default]: [...baseTextStyle, s.black_60],
    [FilterItemStatusTypes.selected]: [...baseTextStyle, s.white],
  },
  [FilterItemTypes.pill_alt]: {
    [FilterItemStatusTypes.default]: [...baseTextStyle, s.black],
    [FilterItemStatusTypes.selected]: [...baseTextStyle, s.white],
  },
  [FilterItemTypes.circle]: {
    [FilterItemStatusTypes.default]: [],
    [FilterItemStatusTypes.selected]: [],
  },
};
