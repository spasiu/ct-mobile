import React from 'react';
import { View } from 'react-native';
import { Video } from './stream/video';
import { styles as s } from 'react-native-style-tachyons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmpty } from 'ramda';
import { COLORS } from '../../theme/colors';
import { BreakDetailModal } from '../break-detail/break-detail-modal';
import {
  eventNotifiedBreakSelector,
  eventBreakerSelector,
  eventBreaksSelector,
  eventLiveBreakSelector,
  eventSelector,
  eventUpcomingBreakSelector,
  eventStreamNameSelector,
} from '../../common/event';
import { userSelector } from '../../common/user-profile';
import { breakResultSelector, breakTypeSelector } from '../../common/break';
import { SeeAllTeamsModal } from './see-all-teams-modal';
import { LineupModal } from './lineup-modal';
import { TermsOfUseModal } from './terms-of-use-modal';
import { LiveScreenProps } from './live-screen.props';
import { SeeTeamsAnimation } from './see-teams-animation';
import { useLiveScreenHook } from './live-screen-logic';
import { BreakCards } from './live-screen-break-cards';
import { Nav } from './live-screen-navigation';
import { InputFields } from './live-screen-input';

export const LiveScreen = ({
  navigation,
  route,
}: LiveScreenProps): JSX.Element => {
  const { eventId } = route.params;
  const {
    userId,
    setLiveTermsAccepted,
    inputRef,
    messages,
    breakId,
    setBreakId,
    showTeams,
    setShowTeams,
    showRandomTeamAnimation,
    setShowRandomTeamsAnimation,
    showLineup,
    setShowLineup,
    termsOfUseVisible,
    setTermsOfUseVisible,
    users,
    data,
  } = useLiveScreenHook(eventId);

  const event = eventSelector(data);
  const breaker = eventBreakerSelector(event);
  const liveBreak = eventLiveBreakSelector(event);
  const notifiedBreak = eventNotifiedBreakSelector(event);
  const upcomingBreak = eventUpcomingBreakSelector(event);
  const streamName = eventStreamNameSelector(event);
  const breakUser = userSelector(users);
  const liveBreakResult = breakResultSelector(liveBreak);

  return (
    <View style={[s.flx_i, s.bg_black]}>
      <Video streamName={streamName} />
      <LinearGradient
        colors={[COLORS.transparent, COLORS.alpha_black]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        style={[s.flx_i]}>
        <SafeAreaView style={[s.flx_i]}>
          <Nav breaker={breaker} navigation={navigation} />
          <BreakCards
            upcomingBreak={upcomingBreak}
            notifiedBreak={notifiedBreak}
            liveBreak={liveBreak}
            setBreakId={setBreakId}
            setShowTeams={setShowTeams}
            breaker={breaker}
            eventId={eventId}
            userId={userId}
          />
          <InputFields
            messages={messages}
            breakUser={breakUser}
            inputRef={inputRef}
            userId={userId}
            eventId={eventId}
            setShowLineup={setShowLineup}
          />
          {breakId ? (
            <BreakDetailModal
              breakId={breakId}
              isVisible={Boolean(breakId)}
              onPressClose={() => setBreakId(undefined)}
            />
          ) : null}
          <SeeAllTeamsModal
            isVisible={showTeams && Boolean(liveBreakResult)}
            onPressClose={() => setShowTeams(false)}
            userId={userId as string}
            result={liveBreakResult}
            breakType={breakTypeSelector(liveBreak)}
          />
          {showRandomTeamAnimation && (
            <SeeTeamsAnimation
              onPressClose={() => setShowRandomTeamsAnimation(false)}
              userId={userId as string}
              result={liveBreakResult}
              breakType={breakTypeSelector(liveBreak)}
            />
          )}
          <LineupModal
            isVisible={!isEmpty(event) && showLineup}
            onPressClose={() => setShowLineup(false)}
            breaks={eventBreaksSelector(event)}
            breaker={breaker}
            event={event}
          />
          <TermsOfUseModal
            isVisible={termsOfUseVisible}
            onPressCancel={() => navigation.goBack()}
            onPressConfirm={() => {
              setTermsOfUseVisible(false);
              setLiveTermsAccepted(true);
            }}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
