import { ImageSourcePropType, TextProps, ViewProps } from 'react-native';

export interface SectionHeaderProps {
  title?: string;
  actionText?: string;
  image?: ImageSourcePropType;
  containerStyle?: ViewProps[];
  titleTextStyle?: TextProps[];
  actionTextStyle?: TextProps[];
}
