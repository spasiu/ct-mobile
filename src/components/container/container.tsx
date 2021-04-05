import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContainerProps } from './container.props';
import {
  isFixed,
  DEFAULT_CONTAINER_TYPE,
  keyboardAvoidingViewBehaviour,
  backgroundColorPreset,
  stylePresets,
} from './container.presets';

function ContainerWithoutScrolling({
  useSafeArea = true,
  style = [],
  children,
  backgroundColor = backgroundColorPreset,
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
    <SafeAreaView style={stylePresets.fixed.safeAreaStyle}>
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
}: ContainerProps) {
  const content = (
    <ScrollView
      style={[...stylePresets.scroll.containerStyle, backgroundColor]}
      contentContainerStyle={[...stylePresets.scroll.insetStyle, ...style]}>
      {children}
    </ScrollView>
  );

  return useSafeArea ? (
    <SafeAreaView style={stylePresets.scroll.safeAreaStyle}>
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
      <KeyboardAvoidingView
        style={[...stylePresets.fixed.containerStyle, backgroundColor]}
        behavior={keyboardAvoidingViewBehaviour}>
        <ContainerWithoutScrolling {...props} />
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={[...stylePresets.scroll.containerStyle, backgroundColor]}
        behavior={keyboardAvoidingViewBehaviour}>
        <ContainerWithScrolling {...props} />
      </KeyboardAvoidingView>
    );
  }
};
