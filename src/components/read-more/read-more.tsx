import React from 'react';
import RNReadMore from '@fawazahmed/react-native-read-more';

import { t } from '../../i18n/i18n';

import { defaultStyle, seeMoreTextStyle } from './read-more.presets';
import { ReadMoreProps } from './read-more.props';

export const ReadMore = ({
  mainTextStyle = [],
  numberOfLines = 2,
  children = null,
}: ReadMoreProps): JSX.Element => {
  return (
    <RNReadMore
      style={[...defaultStyle, ...mainTextStyle]}
      numberOfLines={numberOfLines}
      seeMoreText={t('buttons.seeMore')}
      seeLessText={t('buttons.seeLess')}
      seeMoreStyle={seeMoreTextStyle}
      seeLessStyle={seeMoreTextStyle}>
      {children}
    </RNReadMore>
  );
};
