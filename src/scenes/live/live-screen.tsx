import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
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
  LiveCountBadge,
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
  eventBreakerSelector,
  eventBreaksSelector,
  eventLiveBreakSelector,
  eventSelector,
  eventUpcomingBreakSelector,
  eventViewCountSelector,
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
  breakStatusSelector,
} from '../../common/break';
import { ChatMessage } from '../../common/chat';

import {
  closeIcon,
  diamondIcon,
  // shareIcon,
  shopIcon,
} from './live-screen.presets';
import { Chat } from './chat';
import { createChatMessage } from './live-screen.utils';
import { SeeAllTeamsModal } from './see-all-teams-modal';
import { LineupModal } from './lineup-modal';
import { TermsOfUseModal } from './terms-of-use-modal';

import { LiveScreenProps } from './live-screen.props';
import { SeeTeamsAnimation } from './see-teams-animation';
import { FloatingDiamonds } from './animation/floating-diamonds';
import { UserContext } from '../../providers/user/user';
import { UserContextType } from '../../providers/user/user.types';

export const LiveScreen = ({
  navigation,
  route,
}: LiveScreenProps): JSX.Element => {
  const { eventId } = route.params;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { liveTermsAccepted, setLiveTermsAccepted } = useContext(
    UserContext,
  ) as UserContextType;

  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [breakId, setBreakId] = useState('');
  const [showTeams, setShowTeams] = useState(false);
  const [showRandomTeamAnimation, setShowRandomTeamsAnimation] =
    useState(false);
  const [showLineup, setShowLineup] = useState(false);
  const [termsOfUseVisible, setTermsOfUseVisible] = useState(false);

  const [currentLiveBreak, setCurrentLiveBreak] = useState<Partial<Breaks>>();
  const [diamonds, setDiamonds] = useState({ large: 0, small: 0})

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const { data } = useLiveStreamSubscription({
    variables: {
      eventId,
      userId: authUser?.uid,
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

  const addDiamond = () => {
    firestore().collection('LiveChat').doc(eventId).collection('Diamonds').add({
      createdOn: firestore.FieldValue.serverTimestamp(),
    });
  };

  useEffect(() => {
    let shouldShowDiamonds = false;
    const unsubscribeFromDiamonds = firestore()
      .collection('LiveChat')
      .doc(eventId)
      .collection('Diamonds')
      .onSnapshot(snapshot => {
        const newDocs = snapshot
          .docChanges()
          .filter(change => change.type === 'added');

        if (shouldShowDiamonds && newDocs.length > 0) {
          setDiamonds({ large: newDocs.length, small: newDocs.length });
        }
        // ignore first snapshot event which contains all previous events
        shouldShowDiamonds = true;
      });

    const unsubscribeFromMessages = firestore()
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

    return () => {
      unsubscribeFromMessages();
      unsubscribeFromDiamonds();
    };
  }, []);

  useLayoutEffect(() => {
    if (!liveTermsAccepted) {
      setTermsOfUseVisible(true);
    }
  }, []);

  const event = eventSelector(data);
  const breaker = eventBreakerSelector(event);
  const liveBreak = eventLiveBreakSelector(event);
  const upcomingBreak = eventUpcomingBreakSelector(event);
  const streamName = eventStreamNameSelector(event);



  const breakUser = userSelector(users);
  const liveBreakResult = breakResultSelector(liveBreak);

  useEffect(() => {
    if (isEmpty(currentLiveBreak) && !isEmpty(liveBreak)) {
      setShowRandomTeamsAnimation(true);
      setCurrentLiveBreak(liveBreak);
    }

    if (
      liveBreak &&
      currentLiveBreak &&
      (currentLiveBreak as Breaks).id &&
      liveBreak.id &&
      (currentLiveBreak as Breaks).id !== liveBreak.id
    ) {
      setShowRandomTeamsAnimation(true);
      setCurrentLiveBreak(liveBreak);
    }
  }, [liveBreak, currentLiveBreak]);

  const handleConfirmTermsOfUse = () => {
    setTermsOfUseVisible(false);
    setLiveTermsAccepted(true);
  };

  const canBuyBreak = breakStatusSelector(liveBreak) === "Notified" && parseInt(breakSpotsSelector(liveBreak), 10) > 0
  console.log(`>>${JSON.stringify(liveBreak)}`);
  console.log(`>>${breakStatusSelector(liveBreak)}     <> ${breakSpotsSelector(liveBreak)}`);
  console.log(canBuyBreak);
  


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
          <View style={[s.flx_i, s.mh3, s.aife]}>
            <View style={[s.flx_row, s.w_100, s.mb3]}>
              <FollowButtonBreaker breakerId={breaker.id as string} />
              <View style={[s.flx_i, s.flx_row, s.jcfe]}>
                <StatusBadge status={StatusBadgeTypes.live} />
                <LiveCountBadge
                  containerStyle={[s.ml2]}
                  count={eventViewCountSelector(event)}
                />
              </View>
            </View>
            {isEmpty(liveBreak) ? null : (
              <LiveNowBox
                breakTitle={breakTitleSelector(liveBreak)}
                canBuy={canBuyBreak}
                onPressAction={() => canBuyBreak ? setBreakId(liveBreak.id) : setShowTeams(true)}
                onPressBox={() => canBuyBreak ? setBreakId(liveBreak.id) : setShowTeams(true)}
                //ternary for callbacks, and status
              />
            )}
            {isEmpty(upcomingBreak) ? null : (
              <UpNextBox
                breakTitle={breakTitleSelector(upcomingBreak)}
                spotsLeft={breakSpotsSelector(upcomingBreak)}
                price={breakPriceSelector(upcomingBreak)}
                onPressBox={() => setBreakId(upcomingBreak.id)}
                onPressAction={() => setBreakId(upcomingBreak.id)}
              />
            )}
          </View>
          <KeyboardAvoidingView
            behavior="padding"
            style={[s.flx_i, s.w_100, s.jcfe, s.ph3]}>
            <Chat messages={messages} />
            <View style={[s.flx_row, s.aife, s.h3, s.aic]}>
              <TextInput
                editable={Boolean(breakUser)}
                ref={inputRef}
                keyboardType="default"
                returnKeyType="done"
                enablesReturnKeyAutomatically
                blurOnSubmit={false}
                onSubmitEditing={submitEvent => {
                  const newChatMessage = createChatMessage(
                    submitEvent.nativeEvent.text,
                    authUser?.uid as string,
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
                <View style={[s.absolute, { bottom: 0}]}>
                  <FloatingDiamonds
                    large={diamonds.large}
                    small={diamonds.small}
                  />
                </View>
                <IconButton onPress={addDiamond}>
                  <Image source={diamondIcon} />
                </IconButton>
                {/* <IconButton>
                  <Image source={shareIcon} />
                </IconButton> */}
                <IconButton onPress={() => setShowLineup(true)}>
                  <Image source={shopIcon} />
                </IconButton>
              </View>
            </View>
          </KeyboardAvoidingView>
          <BreakDetailModal
            breakId={breakId}
            isVisible={Boolean(breakId)}
            onPressClose={() => setBreakId('')}
          />
          <SeeAllTeamsModal
            isVisible={showTeams && Boolean(liveBreakResult)}
            onPressClose={() => setShowTeams(false)}
            userId={authUser?.uid as string}
            result={liveBreakResult}
            breakType={breakTypeSelector(liveBreak)}
          />
          {showRandomTeamAnimation && (
            <SeeTeamsAnimation
              onPressClose={() => setShowRandomTeamsAnimation(false)}
              userId={authUser?.uid as string}
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
