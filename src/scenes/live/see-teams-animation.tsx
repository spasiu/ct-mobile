
import React from 'react';
import { View, Image } from 'react-native';
import { flatten } from 'ramda';
import { styles as s } from 'react-native-style-tachyons';

import { SeeTeamsAnimationProps } from './live-screen.props';
import { IconButton } from '../../components';
import { closeIcon, teamsAnimationContainerStyle } from './live-screen.presets';
import { BreakResultSummary } from './animation/break-result-summary';
import { indexedMap } from '../../utils/ramda';
import { BreakResult } from '../../common/break/break';

export const SeeTeamsAnimation = ({
  userId,
  result,
  onPressClose = () => undefined
}: SeeTeamsAnimationProps): JSX.Element => {
  const teams = flatten(indexedMap((breakResultUser) => (breakResultUser as BreakResult).items, result));

  return (
    <View style={teamsAnimationContainerStyle}>
      <BreakResultSummary teamCount={teams.length} userCount={result.length} />
      <View style={[s.absolute, s.w_100, s.bottom_2, s.mt3, s.mb5]}>
        <View style={[s.flx_i, s.aic, { opacity: 0.5 }]}>
          <IconButton onPress={onPressClose}>
            <View style={[s.bg_black_5, s.circle_m, s.jcc, s.aic]}>
              <Image
                source={closeIcon}
                style={[s.icon_xs, s.tint_black]}
                resizeMode={'contain'}
              />
            </View>
          </IconButton>
        </View>
      </View>
    </View>
  )
};
