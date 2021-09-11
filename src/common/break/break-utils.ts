import { ROUTES_IDS } from '../../navigators';
import { LiveScreenNavigationProp } from '../../scenes/live/live-screen.props';
import { Breaks, Event_Status_Enum } from '../../services/api/requests';
import { eventIdSelector, eventStatusSelector } from '../event';

import { breakEventSelector, breakIdSelector } from './break-selectors';

export const handleBreakPress = (
  eventBreak: Breaks,
  navigation: LiveScreenNavigationProp,
  callback: (id: string) => void,
): void => {
  const event = breakEventSelector(eventBreak);
  const eventStatus = eventStatusSelector(event);
  if (eventStatus === Event_Status_Enum.Live) {
    const eventId = eventIdSelector(event);
    navigation.navigate(ROUTES_IDS.LIVE_MODAL, {
      eventId: eventId,
    });
  } else {
    const breakId = breakIdSelector(eventBreak);
    callback(breakId);
  }
};
