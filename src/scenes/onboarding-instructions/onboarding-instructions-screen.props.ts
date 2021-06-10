import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { OnboardingStackParamList } from '../../navigators';

type OnboardingInstructionsScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'screen.onboardingInstructions'
>;

export interface OnboardingInstructionsScreenProps {
  navigation: OnboardingInstructionsScreenNavigationProp;
}
