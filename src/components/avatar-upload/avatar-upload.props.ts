import { ViewStyle, ImageStyle } from 'react-native';

export interface AvatarUploadProps {
  containerStyle?: ViewStyle[];
  imageStyle?: ImageStyle[];
  onPress?: () => void;
}
