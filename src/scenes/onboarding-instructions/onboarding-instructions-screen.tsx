import React, { useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { map } from 'ramda';
import {
  Container,
  ContainerTypes,
  Pagination,
  TextLink,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { instructions } from './onboarding-instructions-screen.presets';
import { OnboardingInstructionsScreenProps } from './onboarding-instructions-screen.props';

const useOnboardingInstructionsScreenHook = () => {
  const swiperRef = useRef<SwiperFlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return { swiperRef, currentIndex, setCurrentIndex };
};

export const OnboardingInstructionsScreen = ({
  navigation,
}: OnboardingInstructionsScreenProps): JSX.Element => {
  const { swiperRef, currentIndex, setCurrentIndex } =
    useOnboardingInstructionsScreenHook();
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.mh0]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.fixed}>
      <SwiperFlatList ref={swiperRef} disableGesture={true}>
        {map(
          ({ titleKey, subtitleKey, image }) => (
            <View
              key={titleKey}
              style={[
                s.flx_i,
                s.pb5,
                s.pt4,
                s.aic,
                s.ph4,
                { width: WINDOW_WIDTH },
              ]}>
              <Image style={[s.flx_i]} source={image} resizeMode="contain" />
              <View style={[s.flx_ratio(0.3)]}>
                <Text style={[s.ff_b, s.f3, s.tc]}>{t(titleKey)}</Text>
                <Text style={[s.ff_alt_r, s.f5, s.lh_high, s.tc, s.mv3]}>
                  {t(subtitleKey)}
                </Text>
              </View>
            </View>
          ),
          instructions,
        )}
      </SwiperFlatList>
      <Pagination
        index={currentIndex}
        total={instructions.length}
        rightButton={
          <TextLink
            text={t('buttons.next')}
            textStyle={[s.ff_r, s.f4]}
            onPress={() => {
              const isLastSlide = currentIndex === instructions.length - 1;
              if (isLastSlide) {
                navigation.navigate(ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN);
              } else {
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
        }
        leftButton={
          <TextLink
            text={t('buttons.skip')}
            textStyle={[s.ff_r, s.f4]}
            onPress={() =>
              navigation.navigate(ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN)
            }
          />
        }
      />
    </Container>
  );
};
