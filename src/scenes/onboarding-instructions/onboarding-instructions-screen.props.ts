import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { OnboardingStackParamList, ROUTES_IDS } from '../../navigators';

type OnboardingInstructionsScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  typeof ROUTES_IDS.ONBOARDING_INSTRUCTIONS_SCREEN
>;

export interface OnboardingInstructionsScreenProps {
  navigation: OnboardingInstructionsScreenNavigationProp;
}
