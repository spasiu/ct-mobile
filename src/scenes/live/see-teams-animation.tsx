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
  const teams = flatten(
    indexedMap(
      breakResultUser => (breakResultUser as BreakResult).items,
      result,
    ),
  );

  return (
    <View style={teamsAnimationContainerStyle}>
      {!summaryAnimationEnded && (
        <BreakResultSummary
          teamCount={teams.length}
          userCount={result.length}
          onEnd={() => setSummaryAnimationEnded(true)}
        />
      )}

      {summaryAnimationEnded && (
        <RandomTeamUserRows
          users={[
            {
              user_id: 'rtNyx1gl9Pc4LNJbUN0Bg6cUt502',
              username: 'a',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#E03A3E',
                  secondaryColor: '#FFE459',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#0E2240',
                  secondaryColor: '#00538C',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Portland Trailblazers',
                  shorthand: 'POR',
                  primaryColor: '#FFE459',
                  secondaryColor: '#F43B86',
                },
                {
                  title: 'Denver Nuggets',
                  shorthand: 'DEN',
                  primaryColor: '#FFFEB7',
                  secondaryColor: '#FFEFBC',
                },
                {
                  title: 'Oklahoma City',
                  shorthand: 'OKC',
                  primaryColor: '#5A2D81',
                  secondaryColor: '#E03A3E',
                },
              ],
            },
          ]}
          userId={userId}
          onEnd={() => {
            console.warn('animation ended');
          }}
        />
      )}

      <View style={[s.absolute, s.w_100, s.mt3, s.mb5, { bottom: 100 }]}>
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
  );
};
