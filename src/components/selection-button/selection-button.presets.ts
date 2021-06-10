import { TextStyle, ViewStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';
import { DEFAULT_BORDER_WIDTH } from '../../theme/sizes';

import { SelectionButtonTypes } from './selection-button.props';

export const baseSelectionButtonConfig = {
  borderWidth: DEFAULT_BORDER_WIDTH as number,
  borderRadius: sizes.br4 as number,
  backgroundShadow: COLORS.transparent as string,
  style: [s.mb3] as ViewStyle,
};

export const baseSelectionButtonTextStyle = [s.ff_b, s.f5] as TextStyle[];

export const selectionButtonTextPresets = {
  [SelectionButtonTypes.default]: [
    ...baseSelectionButtonTextStyle,
    s.black,
  ] as TextStyle[],
  [SelectionButtonTypes.selected]: [
    ...baseSelectionButtonTextStyle,
    s.white,
  ] as TextStyle[],
};

export const selectionButtonTypePresets = {
  [SelectionButtonTypes.default]: {
    ...baseSelectionButtonConfig,
    backgroundColor: COLORS.black_5 as string,
    backgroundDarker: COLORS.black_10 as string,
    borderColor: COLORS.black_10 as string,
  },
  [SelectionButtonTypes.selected]: {
    ...baseSelectionButtonConfig,
    backgroundColor: COLORS.black_80 as string,
    backgroundDarker: COLORS.black as string,
    borderColor: COLORS.black as string,
  },
};
