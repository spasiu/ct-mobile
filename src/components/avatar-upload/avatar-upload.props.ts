import { ViewStyle, ImageStyle } from 'react-native';

export interface AvatarUploadProps {
  containerStyle?: ViewStyle[];
  imageStyle?: ImageStyle[];
  onPress?: (pointerInside: boolean) => void;
  image?: string | null;
  isLoading?: boolean;
}
