declare module '@fawazahmed/react-native-read-more' {
  import React from 'react';
  import { StyleProp, TextStyle, ViewStyle } from 'react-native';

  export type ReactNativeReadMoreProps = {
    style?: StyleProp<ViewStyle>;
    numberOfLines?: number;
    seeMoreText?: string;
    seeLessText?: string;
    seeMoreStyle?: StyleProp<TextStyle>;
    seeLessStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
  };

  class ReadMore extends React.Component<ReactNativeReadMoreProps> {}

  export default ReadMore;
}
