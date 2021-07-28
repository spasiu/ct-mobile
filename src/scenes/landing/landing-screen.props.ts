import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList, ROUTES_IDS } from '../../navigators';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.LANDING_SCREEN
>;

export interface LandingScreenProps {
  navigation: LandingScreenNavigationProp;
}
