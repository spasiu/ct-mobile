import React from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { SlidingBox } from '../../components';
import { t } from '../../i18n/i18n';

import { LiveNowBoxProps } from './live-screen.props';

export const LiveNowBox = ({
  breakTitle = '',
  canBuy,
  spotsLeft,
  price,
  ...slidingBoxProps
}: LiveNowBoxProps): JSX.Element => {
  return (
    <SlidingBox
      {...slidingBoxProps}
      handleText={t('buttons.liveNow')}
      handleStyle={[s.bg_secondary]}
      actionText={canBuy ? t('buttons.buy') : t('buttons.seeTeams')}
      containerStyle={[s.bg_alpha_secondary]}>
      <View style={[s.flx_i]}>
        <Text
          style={[s.ff_alt_sb, s.f7, s.white]}
          numberOfLines={3}
          ellipsizeMode={'tail'}>
          {breakTitle}
        </Text>
      </View>
      {canBuy ?
      <View style={[s.flx_row, s.jcsb]}>
        <Text style={[s.ff_alt_sb, s.f7, s.white]}>{price}</Text>
        <Text style={[s.ff_alt_r, s.f7, s.white]}>{`${spotsLeft} ${t(
          'break.remainingSpots',
        )}`}</Text>
      </View>
      : null }
    </SlidingBox>
  );
};
