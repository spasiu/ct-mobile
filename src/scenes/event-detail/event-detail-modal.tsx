import React from 'react';
import { Text, Image, FlatList, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import ReadMore from '@fawazahmed/react-native-read-more';

import {
  LeagueIcon,
  StatusBadge,
  ImageCard,
  BreakCard,
} from '../../components';

import { t } from '../../i18n/i18n';
import { OverScreenModal } from '../../components';

const EVENT = {
  id: 'event-1',
  title: 'Breaking Bad',
  breaker: {
    name: 'Golden Child',
    image: 'https://source.unsplash.com/96x96/?user',
  },
  status: 'live',
  league: 'baseball',
  description:
    'Big night of baseball for you.  We’ve got Topps and Bowman product from 2020 and 2021.  We’ll mix it up with some Random Teams, Hit Drafts and We’ll mix it up with some Random Teams, Hit Drafts and We’ll mix it up with some Random Teams, Hit Drafts and We’ll mix it up with some Random Teams, Hit Drafts and',
  breaks: [
    {
      id: 301,
      status: 'live',
      league: 'baseball',
      eventType: 'hit_draft',
      title: '2020 Bowman Baseball Sapphire Edition',
      spotsLeft: 3,
      following: false,
      bought: false,
      price: '70',
    },
    {
      id: 302,
      status: 'upcoming',
      league: 'baseball',
      eventType: 'random_team',
      title: '2020 Topps Archives Signature Series Baseball 20 Box Case',
      spotsLeft: 3,
      following: false,
      bought: false,
      price: '70',
    },
    {
      id: 303,
      status: 'upcoming',
      league: 'baseball',
      eventType: 'pick_your_team',
      title: '2020 Topps Archives Signature Series Baseball 20 Box Case',
      spotsLeft: 18,
      following: false,
      bought: false,
      price: '190',
    },
    {
      id: 304,
      status: 'upcoming',
      league: 'baseball',
      eventType: 'pick_your_team',
      title: '2020 Topps Archives Signature Series Baseball 20 Box Case',
      spotsLeft: 18,
      following: false,
      bought: false,
      price: '190',
    },
    {
      id: 305,
      status: 'upcoming',
      league: 'baseball',
      eventType: 'pick_your_team',
      title: '2020 Topps Archives Signature Series Baseball 20 Box Case',
      spotsLeft: 18,
      following: false,
      bought: false,
      price: '190',
    },
  ],
};

export const EventDetailModal = ({
  modalTitle = '',
  showHeader = true,
  ...modalProps
}) => {
  return (
    <OverScreenModal {...modalProps} title={modalTitle}>
      {showHeader && (
        <View style={[s.mv3, s.jcc, s.aic, s.ph3]}>
          <ImageCard
            cardSize={'micro'}
            touchable={false}
            image={{ uri: 'https://source.unsplash.com/96x96/?sports' }}
          />
          <Text style={[s.ff_alt_b, s.f4, s.mv3]}>{EVENT.title}</Text>
          <View style={[s.flx_row, s.jcsb, s.mv3]}>
            <View style={[s.flx_row, s.flx_ratio(0.7)]}>
              <Image
                style={[s.circle_xs, s.mr2]}
                source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
              />
              <Text style={[s.ff_b, s.black, s.f5]}>{EVENT.breaker.name}</Text>
            </View>
            <View style={[s.flx_ratio(0.3), s.flx_row, s.jcsb]}>
              <LeagueIcon league={EVENT.league} />
              <StatusBadge status={EVENT.status} />
            </View>
          </View>
          <ReadMore
            style={[s.ff_alt_r, s.f7, s.lh_medium]}
            numberOfLines={3}
            seeMoreText={t('buttons.seeMore')}
            seeLessText={t('buttons.seeLess')}
            seeMoreStyle={[s.ff_alt_b, s.black]}
            seeLessStyle={[s.ff_alt_b, s.black]}>
            {EVENT.description}
          </ReadMore>
        </View>
      )}
      <Text style={[s.ff_b, s.f5, s.mb2, s.mt3, s.ph3]}>
        {t('event.breakLineupTitle')}
      </Text>
      <FlatList
        style={[s.flx_i, s.mv3, s.ph3]}
        data={EVENT.breaks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <BreakCard
              status={item.status}
              price={item.price}
              spotsLeft={item.spotsLeft}
              title={item.title}
              breakType={item.eventType}
              breakerImage={{ uri: 'https://source.unsplash.com/96x96/?user' }}
              league={item.league}
            />
          );
        }}
      />
    </OverScreenModal>
  );
};
