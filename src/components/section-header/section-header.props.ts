import { TextProps, ViewProps } from 'react-native';

export interface SectionHeaderProps {
  title?: string;
  actionText?: string;
  containerStyle?: ViewProps[];
  titleTextStyle?: TextProps[];
  actionTextStyle?: TextProps[];
}
