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
      {false && (
        <BreakResultSummary
          teamCount={teams.length}
          userCount={result.length}
          onEnd={() => setSummaryAnimationEnded(true)}
        />
      )}

      {true && (
        <RandomTeamUserRows
          users={[
            {
              user_id: 'rtNyx1gl9Pc4LNJbUN0Bg6cUt502',
              username: 'a',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Arizona Cardinals',
                  shorthand: 'ARZ',
                  primaryColor: '#97233f',
                  secondaryColor: '#000000',
                },
                {
                  title: 'Atlanta Falcons',
                  shorthand: 'ATL',
                  primaryColor: '#a71930',
                  secondaryColor: '#000000',
                },
                {
                  title: 'Baltimore Ravens',
                  shorthand: 'BLT',
                  primaryColor: '#241773',
                  secondaryColor: '#9e7c0c',
                }
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Buffalo Bills ',
                  shorthand: 'BU',
                  primaryColor: '#00338d',
                  secondaryColor: '#c60c30',
                },
                {
                  title: 'Carolina Panthers',
                  shorthand: 'CAR',
                  primaryColor: '#0085ca',
                  secondaryColor: '#000000',
                },
                {
                  title: 'Chicago Bears',
                  shorthand: 'CHI',
                  primaryColor: '#0b162a',
                  secondaryColor: '#c83803',
                }
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Cincinnati Bengals',
                  shorthand: 'CIN',
                  primaryColor: '#000000',
                  secondaryColor: '#fb4f14',
                },
                {
                  title: 'Cleveland Browns Colors',
                  shorthand: 'CLV',
                  primaryColor: '#311d00',
                  secondaryColor: '#ff3c00',
                },
                {
                  title: 'Dallas Cowboys',
                  shorthand: 'DAL',
                  primaryColor: '#002244',
                  secondaryColor: '#869397',
                }
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Denver Broncos',
                  shorthand: 'DEN',
                  primaryColor: '#fb4f14',
                  secondaryColor: '#002244',
                },
                {
                  title: 'Detroit Lions',
                  shorthand: 'DET',
                  primaryColor: '#0076b6',
                  secondaryColor: '#b0b7bc',
                },
                {
                  title: 'Green Bay Packers',
                  shorthand: 'GB',
                  primaryColor: '#203731',
                  secondaryColor: '#ffb612',
                }
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Houston Texans',
                  shorthand: 'HST',
                  primaryColor: '#03202f',
                  secondaryColor: '#a71930',
                },
                {
                  title: 'Indianapolis Colts',
                  shorthand: 'IND',
                  primaryColor: '#002c5f',
                  secondaryColor: '#a5acaf',
                },
                {
                  title: 'Jacksonville Jaguars',
                  shorthand: 'JAX',
                  primaryColor: '#006778',
                  secondaryColor: '#9f792c',
                }
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Kansas City Chiefs',
                  shorthand: 'KC',
                  primaryColor: '#e31837',
                  secondaryColor: '#ffb612',
                },
                {
                  title: 'Los Angeles Chargers',
                  shorthand: 'LAC',
                  primaryColor: '#002244',
                  secondaryColor: '#ffb612',
                },
                {
                  title: 'Los Angeles Rams',
                  shorthand: 'LAR',
                  primaryColor: '#002244',
                  secondaryColor: '#b3995d',
                }
              ],
            },
            {
              user_id: 'b',
              username: 'b',
              image:
                '/users/lnS91fGlcnWX2rK3aQIHxShr5SD2/34978FDE-A470-464F-B70F-B6E297B366B8.jpg',
              items: [
                {
                  title: 'Miami Dolphins Colors',
                  shorthand: 'MIA',
                  primaryColor: '#008e97',
                  secondaryColor: '#f26a24',
                },
                {
                  title: 'Minnesota Vikings',
                  shorthand: 'MIN',
                  primaryColor: '#4f2683',
                  secondaryColor: '#ffc62f',
                },
                {
                  title: 'New England Patriots',
                  shorthand: 'NE',
                  primaryColor: '#002244',
                  secondaryColor: '#c60c30',
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
                  title: 'Miami Dolphins Colors',
                  shorthand: 'MIA',
                  primaryColor: '#008e97',
                  secondaryColor: '#f26a24',
                },
                {
                  title: 'Minnesota Vikings',
                  shorthand: 'MIN',
                  primaryColor: '#4f2683',
                  secondaryColor: '#ffc62f',
                },
                {
                  title: 'New England Patriots',
                  shorthand: 'NE',
                  primaryColor: '#002244',
                  secondaryColor: '#c60c30',
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
                  title: 'Las Vegas Raiders',
                  shorthand: 'RA',
                  primaryColor: '#a5acaf',
                  secondaryColor: '#000000',
                },
                {
                  title: 'Philadelphia Eagles',
                  shorthand: 'PHI',
                  primaryColor: '#004c54',
                  secondaryColor: '#a5acaf',
                },
                {
                  title: 'Pittsburgh Steelers',
                  shorthand: 'PIT',
                  primaryColor: '#000000',
                  secondaryColor: '#ffb612',
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
                  title: 'San Francisco 49ers',
                  shorthand: 'SF',
                  primaryColor: '#aa0000',
                  secondaryColor: '#b3995d',
                },
                {
                  title: 'Seattle Seahawks',
                  shorthand: 'SEA',
                  primaryColor: '#002244',
                  secondaryColor: '#69be28',
                },
                {
                  title: 'Tampa Bay Buccaneers',
                  shorthand: 'TB',
                  primaryColor: '#d50a0a',
                  secondaryColor: '#34302b',
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
