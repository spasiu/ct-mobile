import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Video from 'react-native-video';
import { styles as s } from 'react-native-style-tachyons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

import { TextLink, SoundButton, ActionFooter } from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { COLORS } from '../../theme/colors';

import { introVideo, logo } from './landing-screen.presets';
import { LandingScreenProps } from './landing-screen.props';

const VOLUME = 0.10;

export const LandingScreen = ({
  navigation,
}: LandingScreenProps): JSX.Element => {
  const [muted, setMuted] = useState<boolean>(false);
  const isFocused = useIsFocused();
  return (
    <View style={[s.flx_i]}>
      {isFocused ? (
        <Video
          repeat
          source={introVideo}
          resizeMode="cover"
          style={[s.absolute_fill]}
          muted={muted}
          volume={VOLUME}
        />
      ) : null}
      <LinearGradient
        colors={[COLORS.transparent, COLORS.alpha_black]}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 0, y: 1 }}
        style={[s.flx_i]}>
        <SafeAreaView style={[s.flx_i]}>
          <View style={[s.flx_i, s.jcsb, s.mh4]}>
            <View style={[s.flx_row, s.aic, s.jcc, s.mt4]}>
              <Image style={[s.h3, s.w4]} resizeMode="contain" source={logo} />
              <SoundButton
                muted={muted}
                style={[s.absolute, s.right_0]}
                onPress={() => setMuted(!muted)}
              />
            </View>
            <ActionFooter
              buttonText={t('buttons.start')}
              buttonType={'secondary'}
              onPress={() => navigation.navigate(ROUTES_IDS.SIGN_UP_SCREEN)}>
              <Text style={[s.ff_alt_r, s.f5, s.tc, s.white]}>
                {t('account.haveAccountInstructions')}
              </Text>
              <TextLink
                style={[s.ml1]}
                textStyle={[s.white]}
                text={t('buttons.login')}
                onPress={() => navigation.navigate(ROUTES_IDS.LOGIN_SCREEN)}
              />
            </ActionFooter>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
