import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { OnboardingStackParamList } from '../../navigators';

type OnboardingQuestionsScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'screen.onboardingQuestions'
>;

export type UserPreferencesType = {
  [key: string]: string | string[];
};

export interface OnboardingQuestionsScreenProps {
  navigation: OnboardingQuestionsScreenNavigationProp;
}
