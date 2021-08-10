import React, { useContext, useState } from 'react';
import { FlatList, View } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';

import {
  HitCard,
  TitleBar,
  Container,
  ContainerTypes,
  SearchInput,
  IconButton,
  FilterItem,
  ServerImage,
} from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { t } from '../../i18n/i18n';
import { useUserImageQuery } from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { userSelector, userImageSelector } from '../../common/user-profile';
import { ICON_SIZE } from '../../theme/sizes';

import { HitDetailModal } from '../hit-detail/hit-detail-modal';

import { HitsScreenProps } from './hits-screen.props';

const HITS = [
  {
    id: 'hits-1',
    image: '/temp-hits/Lionel-Messi-71.jpeg',
    name: 'Lionel Messi',
  },
  {
    id: 'hits-2',
    image: '/temp-hits/Ceedee-Lamb.jpeg',
    name: 'Ceedee Lamb',
  },
  {
    id: 'hits-3',
    image: '/temp-hits/Deshaun-Watson.jpeg',
    name: 'Deshaun Watson',
  },
  {
    id: 'hits-4',
    image: '/temp-hits/Ja-Morant.jpeg',
    name: 'Ja Morant',
  },
  {
    id: 'hits-5',
    image: '/temp-hits/Justin-Herbert.jpeg',
    name: 'Justin Herbert',
  },
  {
    id: 'hits-6',
    image: '/temp-hits/Mike-Trout.jpeg',
    name: 'Mike Trout',
  },
  {
    id: 'hits-7',
    image: '/temp-hits/Mitch-Marner.jpeg',
    name: 'Mitch Marner',
  },
  {
    id: 'hits-8',
    image: '/temp-hits/Tray-Young.jpeg',
    name: 'Trae Young',
  },
  {
    id: 'hits-9',
    image: '/temp-hits/Zion-Williamson.jpeg',
    name: 'Zion Willamson',
  },
  {
    id: 'hits-10',
    image: '/temp-hits/Shohei-Ohtani-1.png',
    name: 'Shohei Ohtani',
  },
  {
    id: 'hits-11',
    image: '/temp-hits/Tua-Tagovailoa-RC-Auto.jpeg',
    name: 'Tua Tagovailoa',
  },
  {
    id: 'hits-12',
    image: '/temp-hits/Konrad-de-la-Fuente-RC.jpeg',
    name: 'Konrad de la Fuente',
  },
];

export const HitsScreen = ({ navigation }: HitsScreenProps): JSX.Element => {
  const cardWidth = (WINDOW_WIDTH - sizes.mv3 * 2 - 40) / 3;
  const cardHeight = cardWidth * 1.3;

  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [hitDetail, setHitDetail] = useState({});

  const { data: users } = useUserImageQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const user = userSelector(users);
  return (
    <Container
      containerType={ContainerTypes.fixed}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.mh3, s.mb4]}>
        <TitleBar
          title={t('hits.title')}
          rightElement={
            <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
              <FilterItem type="pill_alt" text={t('buttons.myHits')} />
              <IconButton
                style={[s.ml3]}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)
                }>
                <ServerImage
                  src={userImageSelector(user)}
                  width={ICON_SIZE.M}
                  height={ICON_SIZE.M}
                  style={[s.circle_m, s.no_overflow]}
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
            onPress={() => setHitDetail(item)}
            title={item.name}
            image={item.image}
            containerStyle={[s.flx_i]}
            textStyle={[s.flx_i, { height: sizes.h2 * 1.8 }, s.f6]}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cardStyle={[s.br3]}
          />
        )}
      />
      <HitDetailModal
        isVisible={!isEmpty(hitDetail)}
        onPressClose={() => setHitDetail({})}
        {...hitDetail}
      />
    </Container>
  );
};
