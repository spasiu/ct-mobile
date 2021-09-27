import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import { styles as s, sizes } from 'react-native-style-tachyons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmpty } from 'ramda';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {
  NavigationBar,
  IconButton,
  FollowButton,
  LiveCountBadge,
  StatusBadge,
  StatusBadgeTypes,
  ServerImage,
  FollowButtonTypes,
  Loading,
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
  eventFollowedByUserSelector,
  eventLiveBreakSelector,
  eventSelector,
  eventUpcomingBreakSelector,
  eventViewCountSelector,
} from '../../common/event';
import { ICON_SIZE, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../theme/sizes';
import {
  userImageSelector,
  userNameSelector,
  userSelector,
  userStreamUrlSelector,
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

import {
  closeIcon,
  diamondIcon,
  shareIcon,
  shopIcon,
  logoIcon,
} from './live-screen.presets';
import { Chat } from './chat';
import { createChatMessage } from './live-screen.utils';
import { indexedMap } from '../../utils/ramda';
import { SeeAllTeamsModal } from './see-all-teams-modal';
import { LineupModal } from './lineup-modal';
import { TermsOfUseModal } from './terms-of-use-modal';

import { LiveScreenProps } from './live-screen.props';

export const LiveScreen = ({
  navigation,
  route,
}: LiveScreenProps): JSX.Element => {
  const { eventId } = route.params;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [breakId, setBreakId] = useState('');
  const [showTeams, setShowTeams] = useState(false);
  const [streamReady, setStreamReady] = useState(false);
  const [showLineup, setShowLineup] = useState(false);
  const [termsOfUseVisible, setTermsOfUseVisible] = useState(false);

  const [currentLiveBreak, setCurrentLiveBreak] = useState<Partial<Breaks>>();

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

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('LiveChat')
      .doc(eventId)
      .collection('Messages')
      .limit(60)
      .orderBy('createdOn', 'desc')
      .onSnapshot(documentSnapshot => {
        const listenerUpdates = documentSnapshot.docs;
        const newMessages: ChatMessage[] = indexedMap(listenerUpdate => {
          const updateData = listenerUpdate as FirebaseFirestoreTypes.DocumentData;
          return {
            id: updateData.id,
            ...updateData.data(),
          };
        }, listenerUpdates);
        setMessages(newMessages);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setTermsOfUseVisible(true);
  }, []);

  const event = eventSelector(data);
  const breaker = eventBreakerSelector(event);
  const liveBreak = eventLiveBreakSelector(event);
  const upcomingBreak = eventUpcomingBreakSelector(event);

  const breakUser = userSelector(users);
  const streamUrl = userStreamUrlSelector(breaker);
  const liveBreakResult = breakResultSelector(liveBreak);

  useEffect(() => {
    if (isEmpty(currentLiveBreak) && !isEmpty(liveBreak)) {
      setShowTeams(true);
      setCurrentLiveBreak(liveBreak);
    }

    if (
      liveBreak &&
      currentLiveBreak &&
      (currentLiveBreak as Breaks).id &&
      liveBreak.id &&
      (currentLiveBreak as Breaks).id !== liveBreak.id
    ) {
      setShowTeams(true);
      setCurrentLiveBreak(liveBreak);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveBreak]);

  return (
    <View style={[s.flx_i, s.bg_black]}>
      {streamUrl ? (
        <Video
          source={{
            uri: streamUrl,
          }}
          resizeMode="cover"
          style={[s.absolute_fill]}
          onLoad={() => setStreamReady(true)}
        />
      ) : (
        <View style={[s.flx_i, s.jcc, s.aic, s.absolute_fill]}>
          <Loading containerStyle={[s.flx_i, s.jcc, s.aic]} />
        </View>
      )}
      {streamReady ? null : (
        <View
          style={[
            s.absolute,
            { top: WINDOW_HEIGHT / 3, right: WINDOW_WIDTH / 3 },
          ]}>
          <Image source={logoIcon} />
        </View>
      )}
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
              <FollowButton
                type={
                  eventFollowedByUserSelector(event)
                    ? FollowButtonTypes.selected
                    : FollowButtonTypes.default
                }
              />
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
                onPressAction={() => setShowTeams(true)}
                onPressBox={() => setShowTeams(true)}
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
                  s.flx_ratio(0.55),
                  s.ba,
                  s.b__white,
                  s.br5,
                  { height: sizes.h2 + sizes.h1 / 2 },
                ]}
              />
              <View style={[s.flx_ratio(0.4), s.flx_row, s.jcsb, s.ml3]}>
                <IconButton>
                  <Image source={diamondIcon} />
                </IconButton>
                <IconButton>
                  <Image source={shareIcon} />
                </IconButton>
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
            onPressConfirm={() => setTermsOfUseVisible(false)}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
