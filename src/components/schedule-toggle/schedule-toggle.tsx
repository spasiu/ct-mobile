import React from 'react';
import { Image } from 'react-native';
import ToggleSwitch, { ToggleSwitchProps } from 'toggle-switch-react-native';

import {
  eventScheduleIcon,
  breakScheduleIcon,
  toggleColor,
  thumbStyle,
} from './schedule-toggle.presets';

export const ScheduleToggle = ({
  isOn,
  ...scheduleToggleProps
}: ToggleSwitchProps): JSX.Element => (
  <ToggleSwitch
    {...scheduleToggleProps}
    isOn={isOn}
    onColor={toggleColor}
    offColor={toggleColor}
    thumbOnStyle={thumbStyle}
    thumbOffStyle={thumbStyle}
    size={'large'}
    icon={
      <Image
        source={isOn ? eventScheduleIcon : breakScheduleIcon}
        resizeMode={'contain'}
      />
    }
  />
);
