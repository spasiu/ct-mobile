import React from 'react';
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
import { indexedMap } from '../../utils/ramda';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { OnboardingQuestionsScreenProps } from './onboarding-questions-screen.props';
import { useOnboardingQuestionsScreenHook } from './onboarding-questions-screen.logic';

export const OnboardingQuestionsScreen = ({
  navigation,
}: OnboardingQuestionsScreenProps): JSX.Element => {
  const { swiperRef, loading, currentIndex, setCurrentIndex, onPressAction } =
    useOnboardingQuestionsScreenHook(navigation);
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
              onActionPressed={alternatives =>
                onPressAction(alternatives, questionProps)
              }
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
