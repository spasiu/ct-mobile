import { head, length } from 'ramda';
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { IconButton } from '../../components';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { indexedMap } from '../../utils/ramda';

import { SeeAllTeamsModalProps } from './live-screen.props';
import { closeIcon } from './live-screen.presets';
import { getNumberOfColumns } from './live-screen.utils';
import { Break_Type_Enum } from '../../services/api/requests';

import { BreakResultBox } from './animation/break-result-box';
import { HitDraftBreakResultBox } from './animation/hit-draft-break-result-box';
import { BreakResult } from '../../common/break';

export const SeeAllTeamsModal = ({
  isVisible = false,
  onPressClose = () => undefined,
  userId,
  result,
  breakType,
}: SeeAllTeamsModalProps): JSX.Element => {
  const firstTeam = head(result);
  const teamsPerUser = length(firstTeam?.items || []);

  const numberOfColumns = getNumberOfColumns(teamsPerUser);
  const boxWidth = (WINDOW_WIDTH - 4 * sizes.mv3) / numberOfColumns;
  const boxHeight = sizes.h3 + sizes.h1;
  return (
    <Modal isVisible={isVisible}>
      <View style={[s.flx_i, s.mt3, s.mb5]}>
        <ScrollView contentContainerStyle={[s.pt5]}>
          <View style={[s.flx_wrap, s.flx_row, s.jcsb]}>
            {indexedMap((userTeam, index) => {
              const match = userTeam as BreakResult;
              if (breakType === Break_Type_Enum.HitDraft) {
                return (
                  <HitDraftBreakResultBox
                    key={`hd-${index}`}
                    userTeam={match}
                    loggedUserId={userId}
                    boxWidth={boxWidth}
                    boxHeight={boxHeight}
                    index={index}
                  />
                );
              } else {
                return (
                  <BreakResultBox
                    key={`rb-${index}`}
                    userTeam={match}
                    loggedUserId={userId}
                    boxWidth={boxWidth}
                    boxHeight={boxHeight}
                  />
                );
              }
            }, result)}
          </View>
        </ScrollView>
        <View style={[s.aic]}>
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
    </Modal>
  );
};
