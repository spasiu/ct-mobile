import React from 'react';
import { View, ScrollView, FlatList, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  HitCard,
  BreakerCard,
  EventCard,
  FilterItem,
  LeagueIcon,
  SectionHeader,
  SearchInput,
  NavigationBar,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { indexedMap } from '../../utils/ramda';

const data = [
  {
    title: t('home.leaguesSectionTitle'),
    key: 'leagues',
    data: [
      {
        id: 201,
        key: 'baseball',
      },
      {
        id: 202,
        key: 'basketball',
      },
      {
        id: 203,
        key: 'football',
      },
      {
        id: 204,
        key: 'soccer',
      },
      {
        id: 205,
        key: 'hockey',
      },
    ],
  },
  {
    title: t('home.featuredBreaksSectionTitle'),
    key: 'featured_breaks',
    data: [
      {
        id: 206,
        status: 'live',
        viewCount: '312',
        title: 'Magic Monday w/ Vary Gee',
        description:
          'All NBA, all premium, all night. Prizm, Select, All NBA, all premium, all night. Prizm, Select',
      },
      {
        id: 207,
        status: 'live',
        viewCount: '312',
        title: 'Breaking Bad w/ The Golden Child',
        description:
          'The best of 2020 Topps and Bowman Baseball All NBA, all premium, all night. Prizm, Select',
      },
      {
        id: 208,
        status: 'live',
        viewCount: '312',
        title: 'Magic Monday w/ Vary Gee',
        description:
          'All NBA, all premium, all night. Prizm, Select All NBA, all premium, all night. Prizm, Select',
      },
      {
        id: 209,
        status: 'live',
        viewCount: '312',
        title: 'Breaking Bad w/ The Golden Child',
        description:
          'The best of 2020 Topps and Bowman Baseball All NBA, all premium, all night. Prizm, Select',
      },
    ],
  },
  {
    title: t('home.recentHitsSectionTitle'),
    key: 'recent_hits',
    data: [
      {
        id: 210,
        name: 'Luis Robert',
      },
      {
        id: 211,
        name: 'Ceedee Lamb',
      },
      {
        id: 212,
        name: 'Deshaun Watson',
      },
      {
        id: 213,
        name: 'Luis Robert',
      },
      {
        id: 214,
        name: 'Ceedee Lamb',
      },
      {
        id: 215,
        name: 'Deshaun Watson',
      },
    ],
  },
  {
    title: t('home.meetTheBreakersSectionTitle'),
    key: 'meet_the_breakers',
    data: [
      {
        id: 216,
        name: 'Vary Gee',
        description:
          'If it’s hot and trending, I’ll break it.  Join me to chase the greats! All NBA, all premium, all night. Prizm, Select',
      },
      {
        id: 217,
        name: 'Golden Child',
        description:
          'Whatever I break, you’re guantaeed a PSA 10! I know All NBA, all premium, all night. Prizm, Select',
      },
      {
        id: 218,
        name: 'Vary Gee',
        description:
          'If it’s hot and trending, I’ll break it.  Join me to chase the greats! All NBA, all premium, all night. Prizm, Select',
      },
      {
        id: 219,
        name: 'Golden Child',
        description:
          'Whatever I break, you’re guantaeed a PSA 10! I know All NBA, all premium, all night. Prizm, Selectdd',
      },
    ],
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <Container
      style={[s.mh0]}
      containerType="fixed"
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.flx_i]}>
        <NavigationBar>
          <View style={[s.flx_i]}>
            <SearchInput
              style={[s.flx_i, s.mv3]}
              editable={false}
              onTouchStart={() => {}}
            />
          </View>
          <View style={[s.flx_ratio(0.15), s.aife, s.jcc]}>
            <Image
              style={[s.circle_m]}
              source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
            />
          </View>
        </NavigationBar>
        <ScrollView contentContainerStyle={[s.pb4, s.ml3]}>
          {indexedMap(({ data, title, key }, index) => {
            return (
              <View key={index}>
                <SectionHeader
                  title={title}
                  actionText={t('buttons.seeAll')}
                  containerStyle={[s.mr3]}
                />
                <FlatList
                  keyExtractor={item => item.id}
                  horizontal
                  data={data}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    if (key === 'leagues') {
                      return (
                        <FilterItem
                          type={'circle'}
                          style={[s.ml1, s.mb2, s.mr2]}>
                          <LeagueIcon league={item.key} />
                        </FilterItem>
                      );
                    }

                    if (key === 'featured_breaks') {
                      return (
                        <EventCard
                          containerStyle={[s.mr3, s.mb3]}
                          status={item.status}
                          viewCount={item.viewCount}
                          image={{
                            uri: 'https://source.unsplash.com/600x801/?sports',
                          }}
                          title={item.title}
                          description={item.description}
                          onPress={() =>
                            navigation.navigate(ROUTES_IDS.LIVE_MODAL)
                          }
                        />
                      );
                    }

                    if (key === 'recent_hits') {
                      return (
                        <HitCard
                          containerStyle={[s.mr3, s.mb3]}
                          image={{
                            uri: 'https://source.unsplash.com/363x522/?sports',
                          }}
                          title={item.name}
                        />
                      );
                    }

                    if (key === 'meet_the_breakers') {
                      return (
                        <BreakerCard
                          containerStyle={[s.mb3, s.mr3]}
                          title={item.name}
                          description={item.description}
                          image={{
                            uri: 'https://source.unsplash.com/600x801/?sports',
                          }}
                        />
                      );
                    }

                    return null;
                  }}
                />
              </View>
            );
          }, data)}
        </ScrollView>
      </View>
    </Container>
  );
};
