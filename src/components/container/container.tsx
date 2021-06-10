import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ContainerProps, ContainerTypes } from './container.props';
import {
  DEFAULT_SAFE_AREA_EDGES,
  backgroundColorPreset,
  stylePresets,
} from './container.presets';
import { isFixed } from './container.utils';

function ContainerWithoutScrolling({
  useSafeArea = true,
  style = [],
  children,
  backgroundColor = backgroundColorPreset,
  safeAreaEdges = DEFAULT_SAFE_AREA_EDGES,
}: ContainerProps) {
  const content = (
    <View
      style={[
        ...stylePresets.fixed.containerStyle,
        ...stylePresets.fixed.insetStyle,
        backgroundColor,
        ...style,
      ]}>
      {children}
    </View>
  );

  return useSafeArea ? (
    <SafeAreaView
      edges={safeAreaEdges}
      style={stylePresets.fixed.safeAreaStyle}>
      {content}
    </SafeAreaView>
  ) : (
    content
  );
}

function ContainerWithScrolling({
  useSafeArea = true,
  style = [],
  children,
  backgroundColor = backgroundColorPreset,
  safeAreaEdges = DEFAULT_SAFE_AREA_EDGES,
}: ContainerProps) {
  const content = (
    <KeyboardAwareScrollView
      style={[...stylePresets.scroll.containerStyle, backgroundColor]}
      contentContainerStyle={[...stylePresets.scroll.insetStyle, ...style]}>
      {children}
    </KeyboardAwareScrollView>
  );

  return useSafeArea ? (
    <SafeAreaView
      edges={safeAreaEdges}
      style={stylePresets.scroll.safeAreaStyle}>
      {content}
    </SafeAreaView>
  ) : (
    content
  );
}

export const Container = (props: ContainerProps): JSX.Element => {
  const backgroundColor = props.backgroundColor || backgroundColorPreset;
  if (isFixed(props.containerType || ContainerTypes.fixed)) {
    return (
      <View style={[...stylePresets.fixed.containerStyle, backgroundColor]}>
        <ContainerWithoutScrolling {...props} />
      </View>
    );
  } else {
    return (
      <View style={[...stylePresets.scroll.containerStyle, backgroundColor]}>
        <ContainerWithScrolling {...props} />
      </View>
    );
  }
};
