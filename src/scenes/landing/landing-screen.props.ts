import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList } from '../../navigators';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  'screen.landing'
>;

export interface LandingScreenProps {
  navigation: LandingScreenNavigationProp;
}
