import React from 'react';
import { Text, Image, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { StatusBadge } from '../status-badge';
import { LeagueIcon } from '../league-icon/league-icon';
import { FollowButton } from '../follow-button';
import { BuyButton } from '../buy-button';
import { BreakTypeBadge } from '../break-type-badge';

import { t } from '../../i18n/i18n';

import {
  cardContainerStyle,
  informationBarWrapperStyle,
  breakDetailWrapperStyle,
  breakerAvatarStyle,
  breakTitleStyle,
  breakDetailsWrapper,
  priceTextStyle,
  spotsLeftStyle,
  actionsContainerStyle,
  buyButtonStyle,
} from './break-card.presets';
import { BreakCardProps } from './break-card.props';

export const BreakCard = ({
  title,
  status,
  league,
  breakerImage,
  breakType,
  price,
  spotsLeft,
  eventDate,
  onPressFollow = () => undefined,
  onPressBuy = () => undefined,
  containerStyle = [],
  ...borderlessButtonProps
}: BreakCardProps): JSX.Element => {
  return (
    <BorderlessButton
      style={[...cardContainerStyle, ...containerStyle]}
      {...borderlessButtonProps}>
      <View style={informationBarWrapperStyle}>
        <View>
          <StatusBadge status={status} text={eventDate} />
        </View>
        <View style={breakDetailWrapperStyle}>
          <LeagueIcon league={league} />
          <BreakTypeBadge breakType={breakType} />
          <Image style={breakerAvatarStyle} source={breakerImage} />
        </View>
      </View>
      <Text style={breakTitleStyle} numberOfLines={2} ellipsizeMode={'tail'}>
        {title}
      </Text>
      <View style={breakDetailsWrapper}>
        <Text style={priceTextStyle}>{price}</Text>
        <Text style={spotsLeftStyle}>{`${spotsLeft} ${t(
          'break.spotsLeft',
        )}`}</Text>
      </View>
      <View style={actionsContainerStyle}>
        <FollowButton size={'short'} onPress={onPressFollow} />
        <BuyButton containerStyle={buyButtonStyle} onPress={onPressBuy} />
      </View>
    </BorderlessButton>
  );
};
