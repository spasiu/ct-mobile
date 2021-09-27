
import Intercom from '@intercom/intercom-react-native';
import Config from 'react-native-config';
import { t } from '../../i18n/i18n';

export const closeIcon = require('../../assets/close-icon.png');
export const diamondIcon = require('../../assets/diamond-icon.png');
export const shareIcon = require('../../assets/share-icon.png');
export const shopIcon = require('../../assets/shop-icon.png');
export const logoIcon = require('../../assets/candt-logo.png');

import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';
import { ViewStyle } from 'react-native';

export const LIVE_SCREEN_CHECKS = [
  {
    id: 'respect-check',
    description: t('liveTermsAndConditionsModal.respectCheck'),
  },
  {
    id: 'rules-of-play-check',
    description: t('liveTermsAndConditionsModal.rulesOfPlayCheck', {
      link: t('liveTermsAndConditionsModal.rulesOfPlayLink'),
    }),
    linkPattern: new RegExp(t('liveTermsAndConditionsModal.rulesOfPlayLink')),
    onPressLink: (): void => {
      Intercom.displayHelpCenter();
    },
  },
  {
    id: 'terms-of-service-check',
    description: t('liveTermsAndConditionsModal.termsOfServiceCheck', {
      link: t('liveTermsAndConditionsModal.termsOfServiceLink'),
    }),
    linkPattern: new RegExp(
      t('liveTermsAndConditionsModal.termsOfServiceLink'),
    ),
    onPressLink: (): void => {
      Intercom.displayArticle(
        Config.INTERCOM_PRIVACY_TERMS_OF_SERVICE_ARTICLE_ID,
      );
    },
  },
];

export const teamsAnimationContainerStyle: ViewStyle = {
  position: 'absolute',
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  backgroundColor:
  COLORS.alpha_black_8,
  zIndex: 2,
}

export const digitsBackgroundStyle = {
  fontSize: 80,
  color: COLORS.dark_grey
}

export const digitsStyle = {
  fontSize: 80,
  color: COLORS.light_yellow,
  position: 'absolute'
}