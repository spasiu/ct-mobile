import React from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { StatusBadge } from '../status-badge';
import { LeagueIcon } from '../league-icon/league-icon';
import { FollowButton, FollowButtonTypes } from '../follow-button';
import { BuyButton } from '../buy-button';
import { BreakTypeBadge } from '../break-type-badge';
import { ServerImage } from '../server-image';
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
import { ICON_SIZE } from '../../theme/sizes';

export const BreakCard = ({
  title = '',
  status,
  league,
  breakerImage,
  breakType,
  price,
  spotsLeft,
  eventDate,
  onPressFollow = () => undefined,
  userFollows = false,
  onPressBuy = () => undefined,
  containerStyle = [],
  ...borderlessButtonProps
}: BreakCardProps): JSX.Element => {
  const buyDisabled =
    status === 'completed' || status === 'live' || spotsLeft === 0;
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
          <ServerImage
            style={breakerAvatarStyle}
            width={ICON_SIZE.XS}
            height={ICON_SIZE.XS}
            src={breakerImage}
          />
        </View>
      </View>
      <Text style={breakTitleStyle} numberOfLines={2} ellipsizeMode={'tail'}>
        {title}
      </Text>
      <View style={breakDetailsWrapper}>
        <Text style={priceTextStyle}>{price}</Text>
        <Text style={spotsLeftStyle}>{`${buyDisabled ? 0 : spotsLeft} ${t(
          'break.spotsLeft',
        )}`}</Text>
      </View>
      <View style={actionsContainerStyle}>
        <FollowButton
          size={'short'}
          onPress={onPressFollow}
          type={
            userFollows ? FollowButtonTypes.selected : FollowButtonTypes.default
          }
        />
        <BuyButton
          disabled={buyDisabled}
          containerStyle={buyButtonStyle}
          onPress={onPressBuy}
        />
      </View>
    </BorderlessButton>
  );
};
