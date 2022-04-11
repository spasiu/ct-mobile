import React from 'react';
import { Image } from 'react-native';

import { ICON_SIZE } from '../../theme/sizes';

import { IconButton } from '../icon-button';
import { ServerImage } from '../server-image';

import { avatarStyle, avatarImage } from './avatar.presets';
import { AvatarProps } from './avatar.props';

export const Avatar = ({
  onPress = () => undefined,
  src = '',
}: AvatarProps): JSX.Element => {
  return (
    <IconButton onPress={onPress}>
      {src ? (
        <ServerImage
          src={src}
          width={ICON_SIZE.M}
          height={ICON_SIZE.M}
          style={avatarStyle}
          fit="fill"
        />
      ) : (
        <Image
          source={avatarImage}
          style={avatarStyle}
          resizeMode={'contain'}
        />
      )}
    </IconButton>
  );
};
