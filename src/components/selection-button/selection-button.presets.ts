import { TextStyle, ViewStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';
import { DEFAULT_BORDER_WIDTH } from '../../theme/sizes';

export const BASE_SELECTION_BUTTON_CONFIG = {
  borderWidth: DEFAULT_BORDER_WIDTH as number,
  borderRadius: sizes.br4 as number,
  backgroundShadow: COLORS.transparent as string,
  style: [s.mb3] as ViewStyle,
};

export const BASE_SELECTION_BUTTON_TEXT_STYLE = [s.ff_b, s.f5] as TextStyle[];

export const SELECTION_BUTTON_TEXT_PRESETS = {
  default: [...BASE_SELECTION_BUTTON_TEXT_STYLE, s.black] as TextStyle[],
  selected: [...BASE_SELECTION_BUTTON_TEXT_STYLE, s.white] as TextStyle[],
};

export const SELECTION_BUTTON_TYPE_PRESETS = {
  default: {
    ...BASE_SELECTION_BUTTON_CONFIG,
    backgroundColor: COLORS.black_5 as string,
    backgroundDarker: COLORS.black_10 as string,
    borderColor: COLORS.black_10 as string,
  },
  selected: {
    ...BASE_SELECTION_BUTTON_CONFIG,
    backgroundColor: COLORS.black_80 as string,
    backgroundDarker: COLORS.black as string,
    borderColor: COLORS.black as string,
  },
};

export type SelectionButtonTypes = keyof typeof SELECTION_BUTTON_TYPE_PRESETS;
