import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContainerProps } from './container.props';
import {
  isFixed,
  DEFAULT_CONTAINER_TYPE,
  keyboardAvoidingViewBehaviour,
  safeAreaPreset,
  viewPreset,
  backgroundColorPreset,
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
        ...viewPreset.style,
        ...viewPreset.insetStyle,
        backgroundColor,
        ...style,
      ]}>
      {children}
    </View>
  );

  return useSafeArea ? (
    <SafeAreaView style={safeAreaPreset.fixed.style}>{content}</SafeAreaView>
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
      style={[...viewPreset.style, backgroundColor, ...style]}
      contentContainerStyle={viewPreset.insetStyle}>
      {children}
    </ScrollView>
  );

  return useSafeArea ? (
    <SafeAreaView style={safeAreaPreset.scroll.style}>{content}</SafeAreaView>
  ) : (
    content
  );
}

export const Container = (props: ContainerProps) => {
  const backgroundColor = props.backgroundColor || backgroundColorPreset;
  if (isFixed(props.containerType || DEFAULT_CONTAINER_TYPE)) {
    return (
      <KeyboardAvoidingView
        style={[...viewPreset.style, backgroundColor]}
        behavior={keyboardAvoidingViewBehaviour}>
        <ContainerWithoutScrolling {...props} />
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={[...viewPreset.style, backgroundColor]}
        behavior={keyboardAvoidingViewBehaviour}>
        <ContainerWithScrolling {...props} />
      </KeyboardAvoidingView>
    );
  }
};
