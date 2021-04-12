import { styles as s } from 'react-native-style-tachyons';

const CONTAINER_CIRCLE_BASE_STYLE = [
  s.circle_l,
  s.bg_white,
  s.shadow_s,
  s.jcc,
  s.aic,
  s.ba,
];

export const CONTAINER_STYLE_PRESETS = {
  pill: {
    default: [s.bg_transparent],
    selected: [s.bg_black, s.br4],
  },
  circle: {
    default: [...CONTAINER_CIRCLE_BASE_STYLE, s.b__black_10],
    selected: [...CONTAINER_CIRCLE_BASE_STYLE, s.b__black_40],
  },
};

export const TEXT_STYLE_PRESETS = {
  pill: {
    default: [s.black_60],
    selected: [s.white],
  },
  circle: {
    default: [],
    selected: [],
  },
};

export type FilterItemTypes = 'pill' | 'circle';
export type FilterItemStatusTypes = 'default' | 'selected';
