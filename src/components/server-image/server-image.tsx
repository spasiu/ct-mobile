import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
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
import { getImgixUrlWithQueryParams } from '../../services/imgix';

export const ServerImage = ({
  src,
  width,
  height,
  quality = 100,
  style = [],
  children,
  resizeMode = 'contain',
  fit = 'fill',
}: ServerImageProps): JSX.Element => {
  const opacity = useSharedValue(1);
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const [blurHash, setBlurHash] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);

  const imgixQueryParamsConfig = {
    auto: 'compress',
    q: quality,
    w: width,
    h: height,
    fill: 'blur',
    fit,
  };

  const imageUrl = getImgixUrlWithQueryParams(src, imgixQueryParamsConfig);
  const blurHashUrl = getImgixUrlWithQueryParams(src, {
    ...imgixQueryParamsConfig,
    fm: 'blurhash',
  });

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
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: width,
            height: height,
            opacity: showOriginal ? 1 : 0,
          },
          ...imageBackgroundDefaultStyle,
          ...style,
        ]}
        resizeMode={resizeMode}
        onLoadEnd={() => {
          opacity.value = withTiming(0, {
            duration: 2000,
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
          onLoadEnd={() => setShowOriginal(true)}
        />
      </Animated.View>
    </>
  );
};
