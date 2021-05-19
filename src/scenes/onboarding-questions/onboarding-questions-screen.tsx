import React, { useRef } from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { map } from 'ramda';

import {
  Container,
  ContainerTypes,
  Pagination,
  TitleBar,
  ActionFooter,
  SelectionButton,
  BackButton,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { indexedMap } from '../../utils/ramda';

import { QUESTIONS } from './onboarding-questions-screen.presets';
import { Question } from './onboarding-questions-screen.props';

export const OnboardingQuestionsScreen = () => {
  const navigation = useNavigation();
  const swiperRef = useRef<Swiper>(null);
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.mh0]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.fixed}>
      <Swiper
        ref={swiperRef}
        scrollEnabled={false}
        renderPagination={(index, total, context) => {
          const isFirstSlide = index === 0;
          return (
            <Pagination
              pageIndicator={'dash'}
              index={index}
              total={total}
              containerStyle={[s.absolute]}
              leftButton={
                <BackButton
                  onPress={() =>
                    isFirstSlide
                      ? navigation.goBack()
                      : context.scrollBy(-1, true)
                  }
                />
              }
            />
          );
        }}>
        {indexedMap((question, index) => {
          const {
            rootKey,
            titleKey,
            subtitleKey,
            options,
          } = question as Question;
          return (
            <View key={titleKey} style={[s.flx_i, s.mt4, s.aic, s.mh4, s.jcsb]}>
              <TitleBar
                title={t(`${rootKey}.${titleKey}`)}
                subtitle={t(`${rootKey}.${subtitleKey}`)}
              />
              <View style={[s.flx_i, s.w_100]}>
                {map(
                  ({ label }) => (
                    <SelectionButton
                      key={label}
                      text={t(`${rootKey}.${label}`)}
                    />
                  ),
                  options,
                )}
              </View>
              <ActionFooter
                containerStyle={[s.w_100]}
                buttonText={t('buttons.next')}
                onPress={() => {
                  const { current } = swiperRef;
                  const isLastSlide = index === QUESTIONS.length - 1;
                  if (current) {
                    isLastSlide
                      ? navigation.navigate(
                          ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN,
                        )
                      : current.scrollBy(1, true);
                  }
                }}
              />
            </View>
          );
        }, QUESTIONS)}
      </Swiper>
    </Container>
  );
};
