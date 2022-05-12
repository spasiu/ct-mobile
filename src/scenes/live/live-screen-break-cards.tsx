import React from 'react';
import { styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { LiveNowBox } from './live-now-box';
import { UpNextBox } from './up-next-box';
import { LiveCountBadge } from '../../components/viewership';
import { Users, Breaks } from '../../services/api/requests';
import {
  StatusBadge,
  StatusBadgeTypes,
  FollowButtonBreaker,
} from '../../components';

import {
  breakPriceSelector,
  breakSpotsSelector,
  breakTitleSelector,
} from '../../common/break';

export const BreakCards = ({
  upcomingBreak,
  notifiedBreak,
  liveBreak,
  setBreakId,
  setShowTeams,
  breaker,
  eventId,
  userId,
}: {
  upcomingBreak: Partial<Breaks>;
  notifiedBreak: Partial<Breaks>;
  liveBreak: Partial<Breaks>;
  setBreakId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowTeams: React.Dispatch<React.SetStateAction<boolean>>;
  breaker: Partial<Users>;
  eventId: string;
  userId?: string;
}): JSX.Element => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[s.flx_i, s.mh3, s.aife]}>
      <View style={[s.flx_row, s.w_100, s.mb3]}>
        <FollowButtonBreaker breakerId={breaker.id as string} />
        <View style={[s.flx_i, s.flx_row, s.jcfe]}>
          <StatusBadge status={StatusBadgeTypes.live} />
          <View style={[s.ml2]}>
            <LiveCountBadge eventId={eventId} userId={userId} />
          </View>
        </View>
      </View>
      {isEmpty(liveBreak) && isEmpty(notifiedBreak) ? null : (
        <LiveNowBox
          breakTitle={breakTitleSelector(
            isEmpty(liveBreak) ? notifiedBreak : liveBreak,
          )}
          notified={isEmpty(liveBreak)}
          spotsLeft={breakSpotsSelector(notifiedBreak)}
          price={breakPriceSelector(notifiedBreak)}
          onPressAction={() =>
            isEmpty(liveBreak)
              ? setBreakId(notifiedBreak.id)
              : setShowTeams(true)
          }
          onPressBox={() =>
            isEmpty(liveBreak)
              ? setBreakId(notifiedBreak.id)
              : setShowTeams(true)
          }
        />
      )}
      {isEmpty(upcomingBreak) || upcomingBreak === notifiedBreak ? null : (
        <UpNextBox
          breakTitle={breakTitleSelector(upcomingBreak)}
          spotsLeft={breakSpotsSelector(upcomingBreak)}
          price={breakPriceSelector(upcomingBreak)}
          onPressBox={() => setBreakId(upcomingBreak.id)}
          onPressAction={() => setBreakId(upcomingBreak.id)}
        />
      )}
    </View>
  </TouchableWithoutFeedback>
);
