import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Video } from './stream/video';
import { styles as s, sizes } from 'react-native-style-tachyons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmpty } from 'ramda';
import firestore from '@react-native-firebase/firestore';

import {
  NavigationBar,
  IconButton,
  StatusBadge,
  StatusBadgeTypes,
  ServerImage,
  FollowButtonBreaker,
} from '../../components';
import { COLORS } from '../../theme/colors';
import { BreakDetailModal } from '../break-detail/break-detail-modal';

import { t } from '../../i18n/i18n';
import {
  Breaks,
  useLiveStreamSubscription,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  eventNotifiedBreakSelector,
  eventBreakerSelector,
  eventBreaksSelector,
  eventLiveBreakSelector,
  eventSelector,
  eventUpcomingBreakSelector,
  eventStreamNameSelector,
} from '../../common/event';
import { ICON_SIZE } from '../../theme/sizes';
import {
  userImageSelector,
  userNameSelector,
  userSelector,
} from '../../common/user-profile';

import { LiveNowBox } from './live-now-box';
import { UpNextBox } from './up-next-box';
import {
  breakPriceSelector,
  breakResultSelector,
  breakSpotsSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import { ChatMessage } from '../../common/chat';

import { Diamond } from './diamonds';
import { LiveCountBadge } from '../../components/viewership';

import { closeIcon, shopIcon } from './live-screen.presets';
import { Chat } from './chat';
import { createChatMessage } from './live-screen.utils';
import { SeeAllTeamsModal } from './see-all-teams-modal';
import { LineupModal } from './lineup-modal';
import { TermsOfUseModal } from './terms-of-use-modal';

import { LiveScreenProps } from './live-screen.props';
import { SeeTeamsAnimation } from './see-teams-animation';
import { UserContext } from '../../providers/user/user';
import { UserContextType } from '../../providers/user/user.types';
import appsFlyer from 'react-native-appsflyer';
import { Break_Type_Enum } from '../../services/api/requests';

export const LiveScreen = ({
  navigation,
  route,
}: LiveScreenProps): JSX.Element => {
  const { eventId } = route.params;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const userId = authUser?.uid;
  const { liveTermsAccepted, setLiveTermsAccepted } = useContext(
    UserContext,
  ) as UserContextType;

  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [breakId, setBreakId] = useState<string>();
  const [showTeams, setShowTeams] = useState(false);
  const [showRandomTeamAnimation, setShowRandomTeamsAnimation] =
    useState(false);
  const [showLineup, setShowLineup] = useState(false);
  const [termsOfUseVisible, setTermsOfUseVisible] = useState(false);

  const [currentLiveBreak, setCurrentLiveBreak] = useState<Partial<Breaks>>();

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: userId,
    },
  });

  const { data } = useLiveStreamSubscription({
    variables: {
      eventId,
      userId,
    },
    onSubscriptionData: options => {
      if (!currentLiveBreak) {
        const { subscriptionData } = options;
        const event = eventSelector(subscriptionData.data);
        const liveBreak = eventLiveBreakSelector(event);
        setCurrentLiveBreak(liveBreak);
      }
    },
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('LiveChat')
      .doc(eventId)
      .collection('Messages')
      .orderBy('createdOn', 'desc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as ChatMessage[],
        ),
      );

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    if (!liveTermsAccepted) {
      setTermsOfUseVisible(true);
    }
  }, []);

  const event = eventSelector(data);
  const breaker = eventBreakerSelector(event);
  const liveBreak = eventLiveBreakSelector(event);
  const notifiedBreak = eventNotifiedBreakSelector(event);
  const upcomingBreak = eventUpcomingBreakSelector(event);
  const streamName = eventStreamNameSelector(event);

  const breakUser = userSelector(users);
  const liveBreakResult = breakResultSelector(liveBreak);

  const showAnimations = (breakType: Break_Type_Enum) => {
    if (
      breakType === Break_Type_Enum.PickYourDivision ||
      breakType === Break_Type_Enum.PickYourTeam
    ) {
      setShowTeams(true);
    } else if (breakType !== Break_Type_Enum.Personal) {
      setShowRandomTeamsAnimation(true);
    }
  };

  useEffect(() => {
    if (isEmpty(currentLiveBreak) && !isEmpty(liveBreak)) {
      Keyboard.dismiss();
      showAnimations(breakTypeSelector(liveBreak));
      setCurrentLiveBreak(liveBreak);
    }
    if (
      liveBreak &&
      currentLiveBreak &&
      (currentLiveBreak as Breaks).id &&
      liveBreak.id &&
      (currentLiveBreak as Breaks).id !== liveBreak.id
    ) {
      Keyboard.dismiss();
      showAnimations(breakTypeSelector(liveBreak));
      setCurrentLiveBreak(liveBreak);
    }
  }, [liveBreak, currentLiveBreak]);

  const handleConfirmTermsOfUse = () => {
    setTermsOfUseVisible(false);
    setLiveTermsAccepted(true);
  };

  useEffect((): (() => void) => {
    const EnteredLiveStream = Date.now();
    const sendEvent = () =>
      appsFlyer.logEvent('af_content_viewed', {
        af_event_start: EnteredLiveStream,
        af_event_end: () => Date.now(),
        af_customer_user_id: userId,
      });
    return sendEvent;
  }, []);

  return (
    <View style={[s.flx_i, s.bg_black]}>
      <Video streamName={streamName} />
      <LinearGradient
        colors={[COLORS.transparent, COLORS.alpha_black]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        style={[s.flx_i]}>
        <SafeAreaView style={[s.flx_i]}>
          <NavigationBar containerStyle={[s.mb1]}>
            <View style={[s.flx_row, s.flx_i, s.jcfs, s.aic]}>
              <ServerImage
                style={[s.circle_m]}
                src={userImageSelector(breaker)}
                width={ICON_SIZE.M}
                height={ICON_SIZE.M}
              />
              <Text
                numberOfLines={2}
                style={[s.white, s.ml2, s.ff_alt_sb, s.f6]}>
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
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[s.flx_i, s.mh3, s.aife]}>
              <View style={[s.flx_row, s.w_100, s.mb3]}>
                <FollowButtonBreaker breakerId={breaker.id as string} />
                <View style={[s.flx_i, s.flx_row, s.jcfe]}>
                  <StatusBadge status={StatusBadgeTypes.live} />
                  <View style={[s.ml2]}>
                    <LiveCountBadge showPresence eventId={eventId} />
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
              {isEmpty(upcomingBreak) ||
              upcomingBreak === notifiedBreak ? null : (
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
          <KeyboardAvoidingView
            behavior="padding"
            style={[s.flx_i, s.w_100, s.jcfe, s.ph3]}>
            <Chat messages={messages} />
            <View style={[s.flx_row, s.aife, s.h3, s.aic]}>
              <TextInput
                editable={Boolean(breakUser)}
                ref={inputRef}
                keyboardType="default"
                returnKeyType="send"
                enablesReturnKeyAutomatically
                blurOnSubmit={false}
                onSubmitEditing={submitEvent => {
                  const newChatMessage = createChatMessage(
                    submitEvent.nativeEvent.text,
                    userId as string,
                    breakUser,
                  );

                  firestore()
                    .collection('LiveChat')
                    .doc(eventId)
                    .collection('Messages')
                    .add(newChatMessage);

                  if (inputRef && inputRef.current) {
                    inputRef.current.clear();
                  }
                  Keyboard.dismiss();
                }}
                placeholderTextColor={COLORS.white}
                placeholder={t('forms.chatInputPlaceholder')}
                style={[
                  s.pl3,
                  s.pr3,
                  s.ff_alt_r,
                  s.f5,
                  s.white,
                  s.flx_ratio(0.75),
                  s.ba,
                  s.b__white,
                  s.br5,
                  { height: sizes.h2 + sizes.h1 / 2 },
                ]}
              />
              <View style={[s.flx_ratio(0.2), s.flx_row, s.jcsb, s.ml3]}>
                <Diamond userId={userId as string} eventId={eventId} />
                <IconButton onPress={() => setShowLineup(true)}>
                  <Image source={shopIcon} />
                </IconButton>
              </View>
            </View>
          </KeyboardAvoidingView>
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
            onPressConfirm={handleConfirmTermsOfUse}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
