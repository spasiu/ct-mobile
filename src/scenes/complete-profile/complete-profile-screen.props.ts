import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { OnboardingStackParamList } from '../../navigators';

type CompleteProfileScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'screen.completeProfile'
>;

export interface CompleteProfileScreenProps {
  navigation: CompleteProfileScreenNavigationProp;
}
