import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContainerProps } from './container.props';
import {
  isFixed,
  DEFAULT_CONTAINER_TYPE,
  DEFAULT_SAFE_AREA_EDGES,
  backgroundColorPreset,
  stylePresets,
} from './container.presets';

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
    <ScrollView
      style={[...stylePresets.scroll.containerStyle, backgroundColor]}
      contentContainerStyle={[...stylePresets.scroll.insetStyle, ...style]}>
      {children}
    </ScrollView>
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

export const Container = (props: ContainerProps) => {
  const backgroundColor = props.backgroundColor || backgroundColorPreset;
  if (isFixed(props.containerType || DEFAULT_CONTAINER_TYPE)) {
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
