import { isEmpty } from 'ramda';
import appsFlyer from 'react-native-appsflyer';
import firestore from '@react-native-firebase/firestore';
import { TextInput, Keyboard } from 'react-native';
import {
  Users,
  Breaks,
  useLiveStreamSubscription,
  useUserMinimalInformationQuery,
  Break_Type_Enum,
  UserMinimalInformationQuery,
  LiveStreamSubscription,
} from '../../services/api/requests';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { eventLiveBreakSelector, eventSelector } from '../../common/event';
import { breakTypeSelector } from '../../common/break';
import { ChatMessage } from '../../common/chat';
import { createChatMessage } from './live-screen.utils';
import { UserContext } from '../../providers/user/user';
import { UserContextType } from '../../providers/user/user.types';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

export const useLiveScreenHook = (
  eventId: string,
): {
  userId?: string;
  setLiveTermsAccepted: (liveTermsAccepted: boolean) => void;
  inputRef: React.RefObject<TextInput>;
  messages: ChatMessage[];
  breakId?: string;
  setBreakId: React.Dispatch<React.SetStateAction<string | undefined>>;
  showTeams: boolean;
  setShowTeams: React.Dispatch<React.SetStateAction<boolean>>;
  showRandomTeamAnimation: boolean;
  setShowRandomTeamsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  showLineup: boolean;
  setShowLineup: React.Dispatch<React.SetStateAction<boolean>>;
  termsOfUseVisible: boolean;
  setTermsOfUseVisible: React.Dispatch<React.SetStateAction<boolean>>;
  users?: UserMinimalInformationQuery;
  data?: LiveStreamSubscription;
  currentLiveBreak?: Partial<Breaks>;
  setCurrentLiveBreak: React.Dispatch<
    React.SetStateAction<Partial<Breaks> | undefined>
  >;
} => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const userId = authUser?.uid;
  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { liveTermsAccepted, setLiveTermsAccepted } = useContext(
    UserContext,
  ) as UserContextType;
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
  }, [eventId]);

  useLayoutEffect(() => {
    if (!liveTermsAccepted) {
      setTermsOfUseVisible(true);
    }
  }, [liveTermsAccepted]);

  useEffect((): (() => void) => {
    const EnteredLiveStream = Date.now();
    const sendEvent = () =>
      appsFlyer.logEvent('af_content_viewed', {
        af_event_start: EnteredLiveStream,
        af_event_end: () => Date.now(),
        af_customer_user_id: userId,
      });
    return sendEvent;
  }, [userId]);

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
    const event = eventSelector(data);
    const liveBreak = eventLiveBreakSelector(event);
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
  }, [data, currentLiveBreak]);

  return {
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
    currentLiveBreak,
    setCurrentLiveBreak,
    users,
    data,
  };
};

export const sendChatMessage =
  ({
    userId,
    eventId,
    inputRef,
    breakUser,
  }: {
    userId?: string;
    eventId: string;
    inputRef: React.RefObject<TextInput>;
    breakUser: Users;
  }) =>
  (submitEvent: { nativeEvent: { text: string } }): void => {
    if (!userId) {
      return;
    }
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
  };
