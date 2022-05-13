import { Question, QUESTIONS } from '../../common/break-preferences';
import {
  OnboardingQuestionsScreenNavigationProp,
  useOnboardingQuestionsScreenHookType,
  UserPreferencesType,
} from './onboarding-questions-screen.props';
import R from 'ramda';
import { postgresStringArray } from '../../utils/array';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useContext, useRef, useState } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useUpdateUserPreferencesMutation } from '../../services/api/requests';

export const formatUserPreferences = (
  userPreferences: UserPreferencesType,
  questions: Question[],
): { [key: string]: string } => {
  return R.reduce(
    (acc, value) => {
      const question = R.find(R.propEq('questionKey', value))(
        questions,
      ) as Question;
      return {
        ...acc,
        [value]: question.allowMultipleSelection
          ? postgresStringArray(userPreferences[value] as string[])
          : userPreferences[value],
      };
    },
    {},
    R.keys(userPreferences),
  );
};

export const useOnboardingQuestionsScreenHook = (
  navigation: OnboardingQuestionsScreenNavigationProp,
): useOnboardingQuestionsScreenHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const swiperRef = useRef<SwiperFlatList>(null);
  const [userPreferences, setUserPreferences] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updateUserPreferences, { loading }] = useUpdateUserPreferencesMutation(
    {
      onError: () => {
        navigation.navigate(ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN);
      },
      onCompleted: () =>
        navigation.navigate(ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN),
    },
  );
  const onPressAction = (
    alternatives: string | string[],
    questionProps: Question,
  ): void => {
    const isLastSlide = currentIndex === QUESTIONS.length - 1;
    if (isLastSlide) {
      const allUserPreferences = {
        ...userPreferences,
        [questionProps.questionKey]: alternatives,
      };
      updateUserPreferences({
        variables: {
          input: {
            ...formatUserPreferences(allUserPreferences, QUESTIONS),
          },
          userId: authUser?.uid,
        }});
    } else {
      setUserPreferences({
        ...userPreferences,
        [questionProps.questionKey]: alternatives,
      });
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      swiperRef.current &&
        swiperRef.current.scrollToIndex({
          index: newIndex,
          animated: true,
        });
    }
  };
  return {
    swiperRef,
    loading,
    currentIndex,
    setCurrentIndex,
    onPressAction,
  };
};
