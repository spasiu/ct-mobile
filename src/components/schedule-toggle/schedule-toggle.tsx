import React from 'react';
import { Image } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

const breakScheduleIcon = require('../../assets/schedule-break-icon.png');
const eventScheduleIcon = require('../../assets/schedule-event-icon.png');

export const ScheduleToggle = ({ isOn, ...scheduleToggleProps }) => (
  <ToggleSwitch
    {...scheduleToggleProps}
    isOn={isOn}
    onColor={COLORS.black_10}
    offColor={COLORS.black_10}
    // trackOnStyle={{
    //   padding: 15,
    //   width: 70 - 8,
    // }}
    // trackOffStyle={{
    //   padding: 15,
    //   width: 70 - 8,
    // }}
    thumbOnStyle={{
      ...s.bg_black,
      //   margin: 0,
    }}
    thumbOffStyle={{
      ...s.bg_black,
      //   margin: 0,
    }}
    size={'large'}
    icon={
      <Image
        source={isOn ? eventScheduleIcon : breakScheduleIcon}
        resizeMode={'contain'}
      />
    }
  />
);
