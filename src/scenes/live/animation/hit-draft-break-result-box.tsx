import React from 'react';
import { View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { ServerImage } from '../../../components';
import { ICON_SIZE } from '../../../theme/sizes';

import { HitDraftBrealResultBoxProps } from '../live-screen.props';

export const HitDraftBreakResultBox = ({
  userTeam,
  loggedUserId,
  boxWidth,
  boxHeight,
  index,
}: HitDraftBrealResultBoxProps): JSX.Element => {
  const isLoggedUserBox = userTeam.user_id === loggedUserId;
  return (
    <View>
      <View
        style={[
          {
            width: boxWidth,
            height: boxHeight,
          },
          s.mb4,
          s.no_overflow,
          s.bg_black,
          s.b__white,
          s.ba2,
          s.br_12
        ]}>
        <View style={[s.flx_i]}>
          <View
            style={[
              isLoggedUserBox ? s.bg_secondary : s.bg_primary,
              s.h1,
              s.w_100,
            ]}
          />
          <View style={[s.flx_i, s.pa2, s.flx_row, s.jcfs, s.aic]}>
            <ServerImage
              fit={'facearea'}
              src={userTeam.image}
              width={ICON_SIZE.M2}
              height={ICON_SIZE.M2}
              style={[s.circle_m2, s.ba2, s.b__white]}
            />
            <Text
              allowFontScaling
              style={[s.white, s.flx_i, s.mr1, s.ml2, s.f5, s.ff_alt_b]}>
              {userTeam.username}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          s.absolute,
          s.circle_m2,
          s.no_overflow,
          s.flx_i,
          s.jcc,
          s.aic,
          s.ba2,
          s.bg_blue,
          s.b__white,
          {
            top: (ICON_SIZE.M2 / 2) * -1,
            right: boxWidth / 2 - ICON_SIZE.M2 / 2,
          },
        ]}>
        <Text style={[s.f4, s.ff_alt_sb, s.white]}>{index + 1}</Text>
      </View>
    </View>
  );
};
