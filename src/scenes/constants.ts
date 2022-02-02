import { Dimensions } from 'react-native';
const height = Dimensions.get('window').height;
export const isShortScreen = height < 600;
