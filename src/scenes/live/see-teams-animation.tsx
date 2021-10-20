import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { flatten } from 'ramda';
import { styles as s } from 'react-native-style-tachyons';

import { SeeTeamsAnimationProps } from './live-screen.props';
import { IconButton } from '../../components';
import { closeIcon, teamsAnimationContainerStyle } from './live-screen.presets';
import { BreakResultSummary } from './animation/break-result-summary';
import { indexedMap } from '../../utils/ramda';
import { BreakResult } from '../../common/break/break';
import { RandomTeamUserRows } from './animation/random-team-user-rows';

export const SeeTeamsAnimation = ({
  userId,
  result,
  onPressClose = () => undefined,
}: SeeTeamsAnimationProps): JSX.Element => {
  const [summaryAnimationEnded, setSummaryAnimationEnded] = useState(false);
  const [teamAnimationEnded, setTeamAnimationEnded] = useState(false);

  return (
    <View style={teamsAnimationContainerStyle}>
      {!summaryAnimationEnded && (
        <BreakResultSummary
          teamCount={result[0]?.items?.length}
          userCount={result.length}
          onEnd={() => {
            setTimeout(() => {
              setSummaryAnimationEnded(true)
            }, 300)
          }}
        />
      )}

      {summaryAnimationEnded && (
        <RandomTeamUserRows
          users={result}
          userId={userId}
          onEnd={() => {
            setTeamAnimationEnded(true)
          }}
        />
      )}

      <View style={[s.absolute, s.w_100, s.mt3, s.mb5, { bottom: 100 }]}>
        {
          teamAnimationEnded && <View style={[s.flx_i, s.aic, { opacity: 0.5 }]}>
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
        }
      </View>
    </View>
  );
};
