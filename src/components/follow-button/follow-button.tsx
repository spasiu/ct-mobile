import React from 'react';
import { View, Text, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { t } from '../../i18n/i18n';

import { IconButton } from '../icon-button/icon-button';

import {
  BUTTON_TYPE_STYLE,
  BUTTON_CONTENT_STYLE,
  isFollowing,
  isSizeFull,
} from './follow-button.presets';

import { FollowButtonProps } from './follow-button.props';

const followingIcon = require('../../assets/check-icon.png');
const followIcon = require('../../assets/plus-icon.png');

export const FollowButton = ({
  type = 'default',
  size = 'full',
  containerStyle = [],
  ...borderlessButtonProps
}: FollowButtonProps) => {
  if (isSizeFull(size)) {
    return (
      <BorderlessButton
        {...borderlessButtonProps}
        style={[...BUTTON_TYPE_STYLE.full[type], ...containerStyle]}>
        <View accessible>
          <Text style={BUTTON_CONTENT_STYLE.full[type]}>
            {isFollowing(type) ? t('buttons.following') : t('buttons.follow')}
          </Text>
        </View>
      </BorderlessButton>
    );
  }

  return (
    <IconButton
      {...borderlessButtonProps}
      style={[...BUTTON_TYPE_STYLE.short[type], ...containerStyle]}>
      <Image
        style={BUTTON_CONTENT_STYLE.short[type]}
        source={isFollowing(type) ? followingIcon : followIcon}
        resizeMode={'contain'}
      />
    </IconButton>
  );
};
