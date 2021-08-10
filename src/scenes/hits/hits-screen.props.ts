import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { HitsStackParamList, ROUTES_IDS } from '../../navigators';

type HitsScreenNavigationProp = NativeStackNavigationProp<
  HitsStackParamList,
  typeof ROUTES_IDS.HITS_SCREEN
>;

export interface HitsScreenProps {
  navigation: HitsScreenNavigationProp;
}
