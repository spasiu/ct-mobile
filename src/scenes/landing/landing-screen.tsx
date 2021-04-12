import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Video from 'react-native-video';
import { styles as s } from 'react-native-style-tachyons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { TextLink, SoundButton, ActionFooter } from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { COLORS } from '../../theme/colors';

const introVideo = require('../../assets/intro-video.mp4');
const logo = require('../../assets/candt-logo.png');

export const LandingScreen = () => {
  const navigation = useNavigation();
  const [muted, setMuted] = useState(false);
  return (
    <View style={[s.flx_i]}>
      <Video
        repeat
        source={introVideo}
        resizeMode="cover"
        style={[s.absolute_fill]}
        muted={muted}
      />
      <LinearGradient
        colors={[COLORS.transparent, COLORS.alpha_black]}
        start={{ x: 0.7, y: 0.7 }}
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
