import { WINDOW_WIDTH } from '../../theme/sizes';
import { sizes, styles as s } from 'react-native-style-tachyons';

export const NUMBER_OF_COLUMNS = 3;

export const HIT_CARD_WIDTH =
  (WINDOW_WIDTH - sizes.mv3 * 2 - 40) / NUMBER_OF_COLUMNS;
export const HIT_CARD_HEIGHT = HIT_CARD_WIDTH * 1.3;

export const gridStyle = [s.flx_i, s.ph3];
export const gridContentStyle = [s.jcfs];

export const spacingItemStyle = [s.flx_i, s.jcfs];

export const hitCardContainerStyle = [s.flx_i, s.jcfs];
export const hitCardTextStyle = [s.flx_i, s.f6];
