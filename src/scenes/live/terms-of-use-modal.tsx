import React from 'react';
import { FlatList, View } from 'react-native';

import { styles as s } from 'react-native-style-tachyons';

import ParsedText from 'react-native-parsed-text';

import { t } from '../../i18n/i18n';
import { CheckBox, OverScreenModal, TextLink } from '../../components';

import { TermsOfUseModalProps } from './live-screen.props';
import { LIVE_SCREEN_CHECKS } from './live-screen.presets';

export const TermsOfUseModal = ({
  isVisible,
  onPressCancel,
  onPressConfirm,
  ...modalProps
}: TermsOfUseModalProps): JSX.Element => {
  return (
    <OverScreenModal
      ratio={0.6}
      title={t('liveTermsAndConditionsModal.title')}
      isVisible={isVisible}
      action={t('buttons.proceedToLiveStream')}
      onPressAction={onPressConfirm}
      showClose={false}
      containerStyle={[s.pa3, s.pt4]}
      titleStyle={[s.f3]}
      bottomComponent={
        <TextLink
          textStyle={[s.underline]}
          text={t('buttons.takeMeBack')}
          onPress={onPressCancel}
        />
      }
      {...modalProps}>
      <FlatList
        style={[s.flx_i, s.mv3]}
        data={LIVE_SCREEN_CHECKS}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={[s.h_custom(1), s.ml4, s.mv2, s.bg_black_20]} />
        )}
        renderItem={({ item }) => {
          return (
            <View style={[s.mv2, s.flx_row]}>
              <CheckBox disabled={true} value={true} />
              <ParsedText
                parse={
                  item.linkPattern
                    ? [
                        {
                          pattern: item.linkPattern,
                          onPress: () => item.onPressLink(),
                          style: [s.underline],
                        },
                      ]
                    : []
                }
                style={[s.ff_alt_r, s.f5, s.black, s.flx_i, s.lh_sub]}>
                {item.description}
              </ParsedText>
            </View>
          );
        }}
      />
    </OverScreenModal>
  );
};
