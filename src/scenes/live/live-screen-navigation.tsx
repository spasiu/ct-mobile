import React from 'react';
import { styles as s } from 'react-native-style-tachyons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationBar, ServerImage } from '../../components';
import { Users } from '../../services/api/requests';
import { ICON_SIZE } from '../../theme/sizes';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import { closeIcon } from './live-screen.presets';
import { LiveScreenNavigationProp } from './live-screen.props';

export const Nav = ({
  navigation,
  breaker,
}: {
  navigation: LiveScreenNavigationProp;
  breaker: Partial<Users>;
}): JSX.Element => {
  return (
    <NavigationBar containerStyle={[s.mb1]}>
      <View style={[s.flx_row, s.flx_i, s.jcfs, s.aic]}>
        <ServerImage
          style={[s.circle_m]}
          src={userImageSelector(breaker)}
          width={ICON_SIZE.M}
          height={ICON_SIZE.M}
        />
        <Text numberOfLines={2} style={[s.white, s.ml2, s.ff_alt_sb, s.f6]}>
          {userNameSelector(breaker)}
        </Text>
      </View>
      <View style={[s.flx_ratio(0.2), s.jcc, s.aife]}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => navigation.goBack()}>
          <Image
            style={[s.icon_xs]}
            source={closeIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </NavigationBar>
  );
};
