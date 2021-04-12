import { styles as s, sizes } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';
import { t } from '../../i18n/i18n';

export const SEARCH_INPUT_CONTAINER_STYLE = [
  { height: sizes.h2 + sizes.h1 },
  s.bg_white,
  s.br3,
  s.flx_row,
  s.shadow_s,
];

export const SEARCH_ICON_WRAPPER_STYLE = [s.flx_ratio(0.15), s.jcc, s.aic];

export const SEARCH_ICON_STYLE = [s.flx_i];

export const SEARCH_INPUT_STYLE = [s.flx_ratio(0.85), s.ff_b, s.black];

export const PLACEHOLDER_TEXT_COLOR = COLORS.black;

export const INPUT_PLACEHOLDER_TEXT = t('search.action');
