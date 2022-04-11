import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { ServerImage } from '../../../components';
import { BreakTeam } from '../../../components/break-team';
import { ICON_SIZE } from '../../../theme/sizes';

import { BreakResultBoxProps } from '../live-screen.props';

export const BreakResultBox = ({
  userTeam,
  loggedUserId,
  boxWidth,
}: BreakResultBoxProps): JSX.Element => {
  const matchItems = userTeam.items;
  const isLoggedUserBox = userTeam.user_id === loggedUserId;
  return (
    <View>
      <View
        style={[
          {
            width: boxWidth,
          },
          s.br_12,
          s.mb4,
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
          <View style={[s.flx_i, s.flx_wrap, s.pa2, s.flx_row, s.jcsb, s.aic]}>
            {matchItems?.map((teamData, idx) => {
              return <BreakTeam key={`bt-${idx}`} {...teamData} />;
            })}
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
          fit={'fill'}
          src={userTeam.image}
          width={ICON_SIZE.M2}
          height={ICON_SIZE.M2}
          style={[s.circle_m2, s.ba2, s.b__white]}
        />
      </View>
    </View>
  );
};
