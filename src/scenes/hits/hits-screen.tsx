import React from 'react';
import { FlatList, View, Image } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';

import {
  HitCard,
  TitleBar,
  Container,
  SearchInput,
  IconButton,
  FilterItem,
} from '../../components';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { t } from '../../i18n/i18n';

const HITS = [
  {
    id: 'hits-1',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Luis Robert',
  },
  {
    id: 'hits-2',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Ceedee Lamb',
  },
  {
    id: 'hits-3',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Deshaun Watson',
  },
  {
    id: 'hits-4',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Ja Morant',
  },
  {
    id: 'hits-5',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Justin Herbert',
  },
  {
    id: 'hits-6',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Mike Trout',
  },
  {
    id: 'hits-7',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Mitch Marner',
  },
  {
    id: 'hits-8',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Trae Young',
  },
  {
    id: 'hits-9',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Zion Willamson',
  },
  {
    id: 'hits-10',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Mitch Marner',
  },
  {
    id: 'hits-11',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Trae Young',
  },
  {
    id: 'hits-12',
    image: 'https://source.unsplash.com/363x522/?sports',
    name: 'Zion Willamson',
  },
];

export const HitsScreen = () => {
  const cardWidth = (WINDOW_WIDTH - sizes.mv3 * 2 - 40) / 3;
  const cardHeight = cardWidth * 1.3;
  return (
    <Container
      containerType={'fixed'}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.mh3, s.mb4]}>
        <TitleBar
          title={t('hits.title')}
          rightElement={
            <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
              <FilterItem type="pill-alt" text={t('buttons.myHits')} />
              <IconButton style={[s.ml3]}>
                <Image
                  resizeMode={'cover'}
                  style={[s.circle_m]}
                  source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
                />
              </IconButton>
            </View>
          }
        />
        <SearchInput editable={false} />
      </View>
      <FlatList
        style={[s.flx_i, s.ph3]}
        numColumns={3}
        data={HITS}
        renderItem={({ item }) => (
          <HitCard
            title={item.name}
            image={{ uri: item.image }}
            containerStyle={[s.flx_i]}
            textStyle={[s.flx_i, { height: sizes.h2 * 1.8 }, s.f6]}
            cardStyle={[
              {
                width: cardWidth,
                height: cardHeight,
              },
              s.br3,
            ]}
          />
        )}
      />
    </Container>
  );
};
