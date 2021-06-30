import { ViewStyle, ImageStyle } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

export interface AvatarUploadProps {
  containerStyle?: ViewStyle[];
  imageStyle?: ImageStyle[];
  onNewImageSelected?: (response: ImagePickerResponse) => void;
  image?: string | null;
  isLoading?: boolean;
}
