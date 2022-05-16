import { Question } from '../../common/break-preferences';
import { Dispatch, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { SwiperFlatListRefProps } from 'react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps';
import { OnboardingStackParamList, ROUTES_IDS } from '../../navigators';

export type OnboardingQuestionsScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  typeof ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN
>;

export type UserPreferencesType = {
  [key: string]: string | string[];
};

export interface OnboardingQuestionsScreenProps {
  navigation: OnboardingQuestionsScreenNavigationProp;
}

export type useOnboardingQuestionsScreenHookType = {
  swiperRef: React.RefObject<SwiperFlatListRefProps>;
  loading: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  onPressAction: (
    alternatives: string | string[],
    questionProps: Question,
  ) => void;
};
