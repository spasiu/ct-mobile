import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';
import {
  chatMessageTextSelector,
  chatMessageUserImageSelector,
  chatMessageUsernameSelector,
} from '../../common/chat/chat-selectors';
import { ServerImage } from '../../components';
import { ICON_SIZE } from '../../theme/sizes';

import { ChatProps } from './live-screen.props';

export const Chat = ({ messages }: ChatProps): JSX.Element => {
  return (
    <View style={[s.w_100, { height: sizes.h4 + sizes.h1 }]}>
      <FlatList
        inverted
        style={[s.flx_i]}
        data={messages}
        keyExtractor={item => `chat-${item.id}`}
        renderItem={({ item }) => {
          const chatMessage = item;
          return (
            <View style={[s.flx_i, s.flx_row, s.mv2]}>
              <ServerImage
                style={[s.circle_xs]}
                src={chatMessageUserImageSelector(chatMessage)}
                width={ICON_SIZE.XS}
                height={ICON_SIZE.XS}
              />
              <Text style={[s.ml1, s.flx_i, s.ff_m, s.f6, s.white]}>
                <Text style={[s.ff_b, s.f5, s.white]}>
                  {chatMessageUsernameSelector(chatMessage)}
                </Text>
                {` ${chatMessageTextSelector(chatMessage)}`}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
