declare module 'toggle-switch-react-native' {
  import React from 'react';
  import { StyleProp, TextStyle, ViewStyle } from 'react-native';

  export type ToggleSwitchProps = {
    isOn: boolean;
    label?: string;
    onColor?: string;
    offColor?: string;
    size?: string;
    labelStyle?: StyleProp<TextStyle>;
    thumbOnStyle?: StyleProp<ViewStyle>;
    thumbOffStyle?: StyleProp<ViewStyle>;
    trackOnStyle?: StyleProp<ViewStyle>;
    trackOffStyle?: StyleProp<ViewStyle>;
    onToggle?: (isOn: boolean) => any;
    icon?: React.ReactNode;
    disabled?: boolean;
    animationSpeed?: number;
    useNativeDriver?: boolean;
    circleColor?: string;
  };

  class ToggleSwitch extends React.Component<ToggleSwitchProps> {}

  export default ToggleSwitch;
}
