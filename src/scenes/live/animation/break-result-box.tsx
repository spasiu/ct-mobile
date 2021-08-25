import React from 'react';
import { View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { ServerImage } from '../../../components';
import { ICON_SIZE } from '../../../theme/sizes';
import { indexedMap } from '../../../utils/ramda';

import { BreakResultBoxProps } from '../live-screen.props';

export const BreakResultBox = ({
  userTeam,
  loggedUserId,
  boxWidth,
  boxHeight,
}: BreakResultBoxProps): JSX.Element => {
  const matchItems = userTeam.items as string[];
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
          s.br3,
          s.no_overflow,
          s.bg_black,
          s.b__white,
          s.ba2,
        ]}>
        <View style={[s.flx_i]}>
          <View
            style={[
              isLoggedUserBox ? s.bg_secondary : s.bg_primary,
              s.h1,
              s.w_100,
            ]}
          />
          <View style={[s.flx_i, s.pa2, s.flx_row, s.jcsb, s.aic]}>
            {indexedMap((teamData, internalBoxesIndex) => {
              return (
                <View
                  key={`ib-${teamData}-${internalBoxesIndex}`}
                  style={[s.icon_m2, s.br2, s.bg_secondary]}>
                  <Text style={[s.f7, s.ff_alt_r, s.tc, s.white]}>
                    {teamData as string}
                  </Text>
                </View>
              );
            }, matchItems)}
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
          {
            top: (ICON_SIZE.M2 / 2) * -1,
            right: boxWidth / 2 - ICON_SIZE.M2 / 2,
          },
        ]}>
        <ServerImage
          fit={'facearea'}
          src={userTeam.image}
          width={ICON_SIZE.M2}
          height={ICON_SIZE.M2}
          style={[s.circle_m2, s.ba2, s.b__white]}
        />
      </View>
    </View>
  );
};
