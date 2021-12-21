import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { t } from '../../i18n/i18n';
import { NotificationContext, NotificationContextType } from '../../providers/notification';

import { IconButton } from '../icon-button';

import {
  buttonTypeStyle,
  buttonContentStyle,
  followingIcon,
  followIcon,
} from './follow-button.presets';
import {
  FollowButtonProps,
  FollowButtonSizeTypes,
  FollowButtonTypes,
} from './follow-button.props';
import { isFollowing, isSizeFull } from './follow-button.utils';

export const FollowButton = ({
  type = FollowButtonTypes.default,
  size = FollowButtonSizeTypes.full,
  defaultContainerStyle = [],
  selectedContainerStyle = [],
  defaultImageStyle = [],
  selectedImageStyle = [],
  onPress,
  ...borderlessButtonProps
}: FollowButtonProps): JSX.Element => {
  const { requestNotificationPermission } = useContext(
    NotificationContext,
  ) as NotificationContextType;
  const selected = isFollowing(type);
  if (isSizeFull(size)) {
    return (
      <BorderlessButton
        {...borderlessButtonProps}
        onPress={pointer => {
          onPress && onPress(pointer);
          requestNotificationPermission();
        }}
        style={[
          ...buttonTypeStyle.full[type],
          ...(selected ? selectedContainerStyle : defaultContainerStyle),
        ]}>
        <View accessible>
          <Text style={buttonContentStyle.full[type]}>
            {selected ? t('buttons.following') : t('buttons.follow')}
          </Text>
        </View>
      </BorderlessButton>
    );
  }

  return (
    <IconButton
      {...borderlessButtonProps}
      style={[
        ...buttonTypeStyle.short[type],
        ...(selected ? selectedContainerStyle : defaultContainerStyle),
      ]}>
      <Image
        style={[
          ...buttonContentStyle.short[type],
          ...(selected ? selectedImageStyle : defaultImageStyle),
        ]}
        source={selected ? followingIcon : followIcon}
        resizeMode={'contain'}
      />
    </IconButton>
  );
};
