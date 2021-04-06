import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { TextLinkProps } from './text-link.props';
import { textPresets } from './text-link.presets';

export const TextLink = ({
  text = '',
  style = [],
  textStyle = [],
  onPress = () => {},
}: TextLinkProps) => {
  return (
    <BorderlessButton style={style} onPress={onPress}>
      <View accessible>
        <Text style={[...textPresets.style, ...textStyle]}>{text}</Text>
      </View>
    </BorderlessButton>
  );
};
