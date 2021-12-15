import React from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { SlidingBox } from '../../components';
import { t } from '../../i18n/i18n';

import { UpNextBoxProps } from './live-screen.props';

export const UpNextBox = ({
  breakTitle = '',
  price = '',
  spotsLeft,
  ...slidingBoxProps
}: UpNextBoxProps): JSX.Element => {
  return (
    <SlidingBox
      {...slidingBoxProps}
      containerStyle={[s.mt3]}
      actionDisabled={spotsLeft === 0}
      isActionBuy
      handleText={t('buttons.upNext')}>
      <View style={[s.flx_i]}>
        <Text
          style={[s.ff_alt_sb, s.f7, s.white]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {breakTitle}
        </Text>
      </View>
      <View style={[s.flx_row, s.jcsb]}>
        <Text style={[s.ff_alt_sb, s.f7, s.white]}>{price}</Text>
        <Text style={[s.ff_alt_r, s.f7, s.white]}>{`${spotsLeft} ${t(
          'break.remainingSpots',
        )}`}</Text>
      </View>
    </SlidingBox>
  );
};
