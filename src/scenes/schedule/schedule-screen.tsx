import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  BreakCard,
  FilterItem,
  TitleBar,
  ScheduleToggle,
  SectionHeader,
  ImageCard,
  EventCard,
} from '../../components';
import { t } from '../../i18n/i18n';
import { indexedMap } from '../../utils/ramda';

const DATA = {
  breakers: [
    {
      title: 'Golden Child',
      image: 'https://source.unsplash.com/96x96/?user',
      data: [
        {
          id: 'event-1',
          title: 'Breaking Bad Breaking Bad Breaking Bad Breaking Bad',
          status: 'live',
          league: 'baseball',
          following: false,
        },
        {
          id: 'event-2',
          title: 'Breaking Bad',
          status: 'upcoming',
          league: 'baseball',
          following: false,
        },
        {
          id: 'event-3',
          title: 'Breaking Bad',
          status: 'upcoming',
          league: 'baseball',
          following: false,
        },
      ],
    },
    {
      title: 'Vary Gee',
      image: 'https://source.unsplash.com/96x96/?user',
      data: [
        {
          id: 'event-1',
          title: 'Breaking Bad',
          status: 'live',
          league: 'baseball',
          following: false,
        },
        {
          id: 'event-2',
          title: 'Breaking Bad',
          status: 'upcoming',
          league: 'baseball',
          following: false,
        },
        {
          id: 'event-3',
          title: 'Breaking Bad',
          status: 'upcoming',
          league: 'baseball',
          following: false,
        },
      ],
    },
    {
      title: 'Dr. Lemco',
      image: 'https://source.unsplash.com/96x96/?user',
      data: [
        {
          id: 'event-1',
          title: 'Breaking Bad',
          status: 'live',
          league: 'baseball',
          following: false,
        },
        {
          id: 'event-2',
          title: 'Breaking Bad',
          status: 'upcoming',
          league: 'baseball',
          following: false,
        },
        {
          id: 'event-3',
          title: 'Breaking Bad',
          status: 'upcoming',
          league: 'baseball',
          following: false,
        },
      ],
    },
  ],
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
  ],
};

const EVENT_TYPES = ['all', 'pick_your_team', 'random_team', 'hit_draft'];

export const TEXT_KEY_FOR_BREAK_TYPE: { [key: string]: string } = {
  pick_your_team: 'filter.breakTypes.pickYourTeam',
  random_team: 'filter.breakTypes.randomTeam',
  hit_draft: 'filter.breakTypes.hitDraft',
  pack_wars: 'filter.breakTypes.packWars',
  all: 'filter.all',
};

export const ScheduleScreen = () => {
  const [eventView, setEventView] = useState(false);
  const navigation = useNavigation();
  return (
    <Container
      style={[s.mh0]}
      containerType="fixed"
      safeAreaEdges={['top', 'left', 'right']}>
      <TitleBar
        wrapperStyle={[s.mh3, s.mv0, s.mt4, s.mb0]}
        title={t('schedule.title')}
        rightElement={
          <ScheduleToggle
            isOn={eventView}
            onToggle={() => setEventView(!eventView)}
          />
        }
      />
      <FlatList
        style={[s.h2, s.pl3, s.mv3]}
        contentContainerStyle={[s.aic]}
        horizontal={true}
        data={EVENT_TYPES}
        keyExtractor={item => item}
        renderItem={({ item, index }) => {
          return (
            <FilterItem
              status={index === 0 ? 'selected' : 'default'}
              type={'pill'}
              text={t(TEXT_KEY_FOR_BREAK_TYPE[item])}
            />
          );
        }}
      />
      {eventView ? (
        <ScrollView contentContainerStyle={[s.pb4, s.ml3]}>
          {indexedMap(({ data, title, image }, index) => {
            return (
              <View key={index}>
                <SectionHeader
                  title={title}
                  actionText={t('buttons.seeAll')}
                  containerStyle={[s.mr3]}
                  image={{ uri: image }}
                />
                <FlatList
                  keyExtractor={item => item.id}
                  horizontal
                  data={data}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <EventCard
                        containerStyle={[s.mr3]}
                        title={item.title}
                        league={item.league}
                        image={{
                          uri: 'https://source.unsplash.com/600x801/?sports',
                        }}
                      />
                    );
                  }}
                />
              </View>
            );
          }, DATA.breakers)}
        </ScrollView>
      ) : (
        <FlatList
          style={[s.ph3]}
          data={DATA.breaks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <BreakCard
                status={item.status}
                price={item.price}
                spotsLeft={item.spotsLeft}
                title={item.title}
                breakType={item.eventType}
                breakerImage={{
                  uri: 'https://source.unsplash.com/96x96/?user',
                }}
                league={item.league}
              />
            );
          }}
        />
      )}
    </Container>
  );
};
