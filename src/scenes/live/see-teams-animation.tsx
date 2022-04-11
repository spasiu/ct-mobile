import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { SeeTeamsAnimationProps } from './live-screen.props';
import { IconButton } from '../../components';
import { closeIcon, teamsAnimationContainerStyle } from './live-screen.presets';
import { BreakResultSummary } from './animation/break-result-summary';
import { RandomTeamUserRows } from './animation/random-team-user-rows';
import { Break_Type_Enum } from '../../services/api/requests';
import { HitDraftUserRows } from './animation/hit-draft-user-rows';
const CLOSE_ANIMATION_AFTER_MS = 7000;

export const SeeTeamsAnimation = ({
  userId,
  result,
  onPressClose,
  breakType,
}: SeeTeamsAnimationProps): JSX.Element => {
  const [summaryAnimationEnded, setSummaryAnimationEnded] = useState(false);
  const [teamAnimationEnded, setTeamAnimationEnded] = useState(false);

  if (breakType == Break_Type_Enum.HitDraft) {
    return (
      <View style={teamsAnimationContainerStyle}>
        {!summaryAnimationEnded && (
          <BreakResultSummary
            hideTeamCount
            userCount={result.length}
            breakType={breakType}
            onEnd={() => {
              setTimeout(() => {
                setSummaryAnimationEnded(true);
              }, 300);
            }}
          />
        )}

        {summaryAnimationEnded && (
          <ScrollView>
            <HitDraftUserRows
              users={result}
              userId={userId}
              onEnd={() => {
                setTeamAnimationEnded(true);
                setTimeout(
                  () => onPressClose && onPressClose(),
                  CLOSE_ANIMATION_AFTER_MS,
                );
              }}
            />
          </ScrollView>
        )}

        <View style={[s.absolute, s.w_100, s.mt3, s.mb5, { bottom: 0 }]}>
          {teamAnimationEnded && (
            <View style={[s.flx_i, s.aic]}>
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
          )}
        </View>
      </View>
    );
  }

  if (
    breakType == Break_Type_Enum.RandomTeam ||
    breakType == Break_Type_Enum.RandomDivision
  ) {
    return (
      <View style={teamsAnimationContainerStyle}>
        {!summaryAnimationEnded && (
          <BreakResultSummary
            hideTeamCount={breakType == Break_Type_Enum.RandomDivision}
            teamCount={result[0]?.items?.length}
            userCount={result.length}
            breakType={breakType}
            onEnd={() => {
              setTimeout(() => {
                setSummaryAnimationEnded(true);
              }, 300);
            }}
          />
        )}

        {summaryAnimationEnded && (
          <ScrollView>
            <RandomTeamUserRows
              users={result}
              userId={userId}
              onEnd={() => {
                setTeamAnimationEnded(true);
                setTimeout(
                  () => onPressClose && onPressClose(),
                  CLOSE_ANIMATION_AFTER_MS,
                );
              }}
            />
          </ScrollView>
        )}

        <View style={[s.absolute, s.w_100, s.mt3, s.mb5, { bottom: 0 }]}>
          {teamAnimationEnded && (
            <View style={[s.flx_i, s.aic]}>
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
          )}
        </View>
      </View>
    );
  }

  return <View />;
};
