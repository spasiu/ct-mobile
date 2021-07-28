import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Config from 'react-native-config';
import { Blurhash } from 'react-native-blurhash';
import axios from 'axios';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
} from 'react-native-reanimated';

import { ServerImageProps } from './server-image.props';
import {
  blurhashContainer,
  imageBackgroundDefaultStyle,
} from './server-image.presets';

export const ServerImage = ({
  src,
  width,
  height,
  quality = 100,
  style = [],
  children,
  resizeMode = 'contain',
}: ServerImageProps): JSX.Element => {
  const opacity = useSharedValue(1);
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const [blurHash, setBlurHash] = useState('');

  const imageUrl = `${Config.IMAGE_SERVICE_URL}${src}?auto=compress&q=${quality}&w=${width}&h=${height}&fit=fill&fill=blur`;
  const blurHashUrl = `${imageUrl}&fm=blurhash`;

  useEffect(() => {
    axios
      .get(blurHashUrl)
      .then(response => {
        setBlurHash(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [blurHashUrl]);

  return (
    <>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={[
          { width: width, height: height },
          ...imageBackgroundDefaultStyle,
          ...style,
        ]}
        resizeMode={resizeMode}
        onLoadEnd={() => {
          opacity.value = withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.exp),
          });
        }}>
        {children}
      </ImageBackground>
      <Animated.View style={[...blurhashContainer, opacityStyle]}>
        <Blurhash
          resizeMode={resizeMode}
          blurhash={blurHash}
          style={[{ width: width, height: height }, ...style]}
        />
      </Animated.View>
    </>
  );
};
