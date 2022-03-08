import React, { useRef, useState, useContext } from 'react';
import { styles as s } from 'react-native-style-tachyons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import {
  Container,
  ContainerTypes,
  Pagination,
  PageIndicatorTypes,
  BackButton,
  QuestionPage,
} from '../../components';
import { QUESTIONS, Question } from '../../common/break-preferences';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { indexedMap } from '../../utils/ramda';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { OnboardingQuestionsScreenProps } from './onboarding-questions-screen.props';
import { formatUserPreferences } from './onboarding-questions-screen.utils';
import { useUpdateUserPreferencesMutation } from '../../services/api/requests';

export const OnboardingQuestionsScreen = ({
  navigation,
}: OnboardingQuestionsScreenProps): JSX.Element => {
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
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.mh0]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.fixed}>
      <SwiperFlatList ref={swiperRef} disableGesture={true}>
        {indexedMap((question, index) => {
          const questionProps = question as Question;
          return (
            <QuestionPage
              containerStyle={[{ width: WINDOW_WIDTH }]}
              key={`${questionProps.questionKey}-${index}`}
              {...questionProps}
              actionButtonText={t('buttons.next')}
              isLoading={loading}
              onActionPressed={alternatives => {
                const isLastSlide = currentIndex === QUESTIONS.length - 1;
                if (isLastSlide) {
                  const allUserPreferences = {
                    ...userPreferences,
                    [questionProps.questionKey]: alternatives,
                  };
                  updateUserPreferences({
                    variables: {
                        input: {...formatUserPreferences(allUserPreferences, QUESTIONS)},
                        userId: authUser?.uid,
                    },
                  });
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
              }}
            />
          );
        }, QUESTIONS)}
      </SwiperFlatList>
      <Pagination
        pageIndicator={PageIndicatorTypes.dash}
        index={currentIndex}
        total={QUESTIONS.length}
        containerStyle={[s.absolute, s.top_0]}
        leftButton={
          <BackButton
            onPress={() => {
              const isFirstSlide = currentIndex === 0;
              if (isFirstSlide) {
                navigation.goBack();
              } else {
                const newIndex = currentIndex - 1;
                setCurrentIndex(newIndex);
                swiperRef.current &&
                  swiperRef.current.scrollToIndex({
                    index: newIndex,
                    animated: true,
                  });
              }
            }}
          />
        }
      />
    </Container>
  );
};
