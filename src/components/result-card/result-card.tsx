import React from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { LeagueIcon } from '../league-icon/league-icon';
import { ActionButton } from '../action-button';
import { BreakTypeBadge } from '../break-type-badge';
import { ServerImage } from '../server-image';
import { styles as s } from 'react-native-style-tachyons';

import {
  cardContainerStyle,
  informationBarWrapperStyle,
  breakDetailWrapperStyle,
  breakerAvatarStyle,
  breakTitleStyle,
  actionsContainerStyle,
  buyButtonStyle,
  priceTextStyle,
  breakDetailsWrapper,
} from './result-card.presets';
import { ResultCardProps } from './result-card.props';
import { ICON_SIZE } from '../../theme/sizes';
import { t } from 'i18n-js';
import { Badge } from '../badge';

export const ResultCard = ({
  title = '',
  league,
  breakerImage,
  breakType,
  eventDate,
  setResult,
  price,
  containerStyle = [],
  ...borderlessButtonProps
}: ResultCardProps): JSX.Element => {
  return (
    <BorderlessButton
      style={[...cardContainerStyle, ...containerStyle]}
      {...borderlessButtonProps}>
      <View style={informationBarWrapperStyle}>
        <View>
          <Badge containerStyle={[s.bg_primary]} text={eventDate} />
        </View>
        <View style={breakDetailWrapperStyle}>
          <LeagueIcon league={league} />
          <BreakTypeBadge breakType={breakType} />
          <ServerImage
            style={breakerAvatarStyle}
            width={ICON_SIZE.XS}
            height={ICON_SIZE.XS}
            src={breakerImage}
          />
        </View>
      </View>
      <View>
        <Text style={breakTitleStyle} numberOfLines={2} ellipsizeMode={'tail'}>
          {title}
        </Text>
      </View>
      {price ? (
        <View style={breakDetailsWrapper}>
          <Text style={priceTextStyle}>{price}</Text>
        </View>
      ) : null}
      <View style={actionsContainerStyle}>
        <ActionButton
          style={buyButtonStyle}
          textStyle={[s.f7]}
          text={t('buttons.seeTeams')}
          onPress={() => setResult()}
        />
      </View>
    </BorderlessButton>
  );
};
