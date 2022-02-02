import { Dimensions } from 'react-native';
export const screenHeight = Dimensions.get('window').height;
export const isShortScreen = screenHeight < 600;
