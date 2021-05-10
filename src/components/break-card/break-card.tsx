import React from 'react';
import { Text, Image, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { StatusBadge } from '../status-badge';
import { LeagueIcon } from '../league-icon/league-icon';
import { FollowButton } from '../follow-button/follow-button';
import { BuyButton } from '../buy-button/buy-button';
import { BreakTypeBadge } from '../break-type-badge';

import { t } from '../../i18n/i18n';

import {
  CARD_CONTAINER_STYLE,
  INFORMATION_BAR_WRAPPER_STYLE,
  BREAK_DETAIL_WRAPPER_STYLE,
  BREAKER_AVATAR_STYLE,
  BREAK_TITLE_STYLE,
  BREAK_DETAILS_WRAPPER,
  PRICE_TEXT_STYLE,
  SPOTS_LEFT_STYLE,
  ACTIONS_CONTAINER_STYLE,
  BUY_BUTTON_STYLE,
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
  onPressFollow = () => {},
  onPressBuy = () => {},
  containerStyle = [],
  ...borderlessButtonProps
}: BreakCardProps) => {
  return (
    <BorderlessButton
      style={[...CARD_CONTAINER_STYLE, ...containerStyle]}
      {...borderlessButtonProps}>
      <View style={INFORMATION_BAR_WRAPPER_STYLE}>
        <View>
          <StatusBadge status={status} text={eventDate} />
        </View>
        <View style={BREAK_DETAIL_WRAPPER_STYLE}>
          <LeagueIcon league={league} />
          <BreakTypeBadge breakType={breakType} />
          <Image style={BREAKER_AVATAR_STYLE} source={breakerImage} />
        </View>
      </View>
      <Text style={BREAK_TITLE_STYLE} numberOfLines={2} ellipsizeMode={'tail'}>
        {title}
      </Text>
      <View style={BREAK_DETAILS_WRAPPER}>
        <Text style={PRICE_TEXT_STYLE}>{price}</Text>
        <Text style={SPOTS_LEFT_STYLE}>{`${spotsLeft} ${t(
          'break.spotsLeft',
        )}`}</Text>
      </View>
      <View style={ACTIONS_CONTAINER_STYLE}>
        <FollowButton size={'short'} onPress={onPressFollow} />
        <BuyButton containerStyle={BUY_BUTTON_STYLE} onPress={onPressBuy} />
      </View>
    </BorderlessButton>
  );
};
