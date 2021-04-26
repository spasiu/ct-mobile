import { styles as s } from 'react-native-style-tachyons';

const CONTAINER_CIRCLE_BASE_STYLE = [
  s.circle_l,
  s.bg_white,
  s.shadow_s,
  s.jcc,
  s.aic,
  s.ba,
];

const CONTAINER_PILL_BASE_STYLE = [s.badge_height, s.jcc, s.aic];

export const CONTAINER_STYLE_PRESETS = {
  'pill-default': {
    default: [...CONTAINER_PILL_BASE_STYLE, s.bg_transparent],
    selected: [...CONTAINER_PILL_BASE_STYLE, s.bg_black, s.badge_br],
  },
  'pill-alt': {
    default: [
      ...CONTAINER_PILL_BASE_STYLE,
      s.black_5,
      s.b__black_10,
      s.ba,
      s.badge_br,
    ],
    selected: [...CONTAINER_PILL_BASE_STYLE, s.bg_black, s.badge_br],
  },
  circle: {
    default: [...CONTAINER_CIRCLE_BASE_STYLE, s.b__black_10],
    selected: [...CONTAINER_CIRCLE_BASE_STYLE, s.b__black_40],
  },
};

export const TEXT_STYLE_PRESETS = {
  'pill-default': {
    default: [s.ff_alt_sb, s.f6, s.black_60, s.ph3],
    selected: [s.ff_alt_sb, s.f6, s.white, s.ph3],
  },
  'pill-alt': {
    default: [s.ff_alt_sb, s.f6, s.black, s.ph3],
    selected: [s.ff_alt_sb, s.f6, s.white, s.ph3],
  },
  circle: {
    default: [],
    selected: [],
  },
};

export type FilterItemTypes = 'pill-default' | 'pill-alt' | 'circle';
export type FilterItemStatusTypes = 'default' | 'selected';
export type FilterItemStyleTypes = 'default' | 'alternative';
