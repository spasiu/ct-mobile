import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';
import { OverScreenModal, ServerImage } from '../../components';
import { t } from '../../i18n/i18n';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ICON_SIZE } from '../../theme/sizes';
import { Users } from '../../services/api/requests';
type BreakerListType = {
  breakers: Users[];
  onClose: () => void;
  showModal: boolean;
  setBreakerFilter: (breaker: Users) => void;
};
export const BreakerList = ({
  breakers = [],
  onClose,
  showModal,
  setBreakerFilter,
}: BreakerListType): JSX.Element => {
  return (
    <OverScreenModal isVisible={showModal} onPressClose={() => onClose()}>
      <ScrollView>
        <Text style={[s.b, s.f2, s.tc, s.pb4]}>{t('tabBar.breakersTab')}</Text>
        {breakers?.map((breaker: Users) => {
          return (
            <BorderlessButton
              key={`filter-breaker-car-${breaker.id}`}
              style={[
                { height: sizes.h3 + sizes.h1 },
                s.flx_i,
                s.pa3,
                s.br3,
                s.mb3,
                s.jcsb,
                s.bg_white,
                s.shadow_s,
                s.ml1,
                s.mr1,
              ]}
              onPress={() => {
                setBreakerFilter(breaker);
                onClose();
              }}>
              <View style={[s.flx_row, s.aic, s.pa2]}>
                <Text style={[s.f3, s.fw3, s.left_2, s.b]}>
                  {breaker.username}
                </Text>
                <ServerImage
                  style={[s.circle_l, s.absolute, s.right_2]}
                  width={ICON_SIZE.L}
                  height={ICON_SIZE.L}
                  src={breaker.image || ''}
                />
              </View>
            </BorderlessButton>
          );
        })}
      </ScrollView>
    </OverScreenModal>
  );
};
