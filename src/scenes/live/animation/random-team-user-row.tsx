import React, { memo, useState } from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { RandomTeamUserRowProps } from '../live-screen.props';
import { WINDOW_WIDTH } from '../../../theme/sizes';
import { Text, View } from 'react-native';
import { ServerImage } from '../../../components/server-image/server-image';

export const TeamUserRow = ({
  currentUserId,
  users
}: RandomTeamUserRowProps): JSX.Element => {
  const boxWidth = users.length < 6 ? 84 : 70;
  const boxSize = (boxWidth * WINDOW_WIDTH) / 750;
  const headerHeight = (34 * WINDOW_WIDTH) / 750;
  const avatarSize = (80 * WINDOW_WIDTH) / 750;

  return (
    <>
      <View style={[s.flx_row, s.jcsa, s.mt4, s.ph2]}>
        {
          users.map((user: any) => {
            return (
              <View>
                <View style={[s.b_white, s.no_overflow, { borderRadius: 10 }]}>
                  <View style={[s.pa2, s.flx_row, s.jcc, { height: headerHeight, backgroundColor: 'red'}]}>
                  </View>
                  <View style={[s.ba, s.flx_row, s.jcc]}>
                    {
                      // replace with actual component
                      user.items!.map((item: any, index: number) => {
                        const styleFirst =  index == 0 ? s.ml2 : {};

                        return (
                          <View style={[{width: boxSize, height: boxSize}, s.ba, s.b_white, s.mr2, s.mv2, styleFirst]}>
                            <Text style={[s.white]}>{item.shorthand}</Text>
                          </View>
                        )
                      })
                    }
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
                    s.asc,
                    {
                      top: (avatarSize / 1.7) * -1
                    }
                  ]}>
                  <ServerImage
                    fit={'facearea'}
                    src={user.image}
                    width={avatarSize}
                    height={avatarSize}
                    style={[s.circle_m2, s.ba2, s.b__white]}
                  />
                </View>
              </View>
            )
          })
        }
      </View>
    </>
  )
};

export const RandomTeamUserRow = memo(TeamUserRow, (prevProps, nextProps) => {
  return true;
})