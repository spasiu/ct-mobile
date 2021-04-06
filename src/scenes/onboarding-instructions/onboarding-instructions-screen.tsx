import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { map } from 'ramda';

import { Container, Pagination, TextLink } from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

const instructionImage = require('../../assets/instruction-one.png');
const instructions = [
  {
    image: instructionImage,
    titleKey: 'onboarding.firstInstructionTitle',
    subtitleKey: 'onboarding.firstInstructionSubtitle',
  },
  {
    image: instructionImage,
    titleKey: 'onboarding.secondInstructionTitle',
    subtitleKey: 'onboarding.secondInstructionSubtitle',
  },
  {
    image: instructionImage,
    titleKey: 'onboarding.thridInstructionTitle',
    subtitleKey: 'onboarding.thridInstructionSubtitle',
  },
  {
    image: instructionImage,
    titleKey: 'onboarding.fourthInstructionTitle',
    subtitleKey: 'onboarding.fourthInstructionSubtitle',
  },
] as const;

export const OnboardingInstructionsScreen = () => {
  const navigation = useNavigation();
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.mh0]}
      backgroundColor={s.bg_white}
      containerType="fixed">
      <Swiper
        renderPagination={(index, total, context) => {
          const isLastSlide = index === total - 1;
          return (
            <Pagination
              index={index}
              total={total}
              rightButton={
                <TextLink
                  text={t('buttons.next')}
                  textStyle={[s.ff_r, s.f4, s.no_underline]}
                  onPress={() =>
                    isLastSlide
                      ? navigation.navigate(
                          ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN,
                        )
                      : context.scrollBy(1, true)
                  }
                />
              }
              leftButton={
                <TextLink
                  text={t('buttons.skip')}
                  textStyle={[s.ff_r, s.f4, s.no_underline]}
                  onPress={() =>
                    navigation.navigate(ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN)
                  }
                />
              }
            />
          );
        }}>
        {map(
          ({ titleKey, subtitleKey, image }) => (
            <View key={titleKey} style={[s.flx_i, s.mb5, s.mt4, s.aic, s.mh4]}>
              <Image style={[s.h_75]} source={image} resizeMode="contain" />
              <Text style={[s.ff_b, s.f3, s.tc]}>{t(titleKey)}</Text>
              <Text style={[s.ff_alt_r, s.f5, s.lh_high, s.tc, s.mv3]}>
                {t(subtitleKey)}
              </Text>
            </View>
          ),
          instructions,
        )}
      </Swiper>
    </Container>
  );
};
