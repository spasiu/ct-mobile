import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';
import { ViewStyle } from 'react-native';
export const closeIcon = require('../../assets/close-icon.png');
export const diamondIcon = require('../../assets/diamond-icon.png');
export const shareIcon = require('../../assets/share-icon.png');
export const shopIcon = require('../../assets/shop-icon.png');
export const logoIcon = require('../../assets/candt-logo.png');

export const teamsAnimationContainerStyle: ViewStyle = {
  position: 'absolute',
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  backgroundColor:
  COLORS.alpha_black_8,
  zIndex: 2,
}

export const digitsBackgroundStyle: ViewStyle = {
  fontSize: 90,
  color: COLORS.dark_grey
}

export const digitsStyle: ViewStyle = {
  fontSize: 90,
  color: COLORS.light_yellow,
  position: 'absolute'
}