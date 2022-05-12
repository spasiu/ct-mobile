import { styles as s } from 'react-native-style-tachyons';
import { View, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { Users } from '../../services/api/requests';
import { ChatMessage } from '../../common/chat';
import { Diamond } from './diamonds';
import { Chat } from './chat';
import { sendChatMessage } from './live-screen-logic';
import { t } from 'i18n-js';
import React from 'react';
import { sizes } from 'react-native-style-tachyons';
import { COLORS } from 'theme/colors';
import { shopIcon } from './live-screen.presets';
import { IconButton } from '../../components';

export const InputFields = ({
  messages,
  breakUser,
  inputRef,
  userId,
  eventId,
  setShowLineup,
}: {
  messages: ChatMessage[];
  breakUser: Users;
  inputRef: React.RefObject<TextInput>;
  userId?: string;
  eventId: string;
  setShowLineup: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => (
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
        onSubmitEditing={sendChatMessage({
          userId,
          eventId,
          inputRef,
          breakUser,
        })}
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
);
