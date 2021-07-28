import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { OnboardingStackParamList, ROUTES_IDS } from '../../navigators';

type OnboardingQuestionsScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  typeof ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN
>;

export type UserPreferencesType = {
  [key: string]: string | string[];
};

export interface OnboardingQuestionsScreenProps {
  navigation: OnboardingQuestionsScreenNavigationProp;
}
