import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { breakerProfileSelector } from '../../common/breaker';
import {
  usersSelector,
  userSelector,
  userImageSelector,
} from '../../common/user-profile';

import {
  TitleBar,
  Container,
  ContainerTypes,
  SearchInput,
  IconButton,
  FilterItem,
  Loading,
  BreakerCard,
  ServerImage,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { ICON_SIZE } from '../../theme/sizes';
import {
  useBreakersQuery,
  useUserImageQuery,
} from '../../services/api/requests';

import { breakerCardSelector } from './breakers-screen-utils';
import { BreakersScreenProps } from './breakers-screen.props';

export const BreakersScreen = ({
  navigation,
}: BreakersScreenProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { loading, data } = useBreakersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: users } = useUserImageQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const user = userSelector(users);
  const breakers = usersSelector(data);
  const cardWidth = sizes.w5 + sizes.w3 + sizes.w2;
  return (
    <Container
      containerType={ContainerTypes.fixed}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.mh3, s.mb4]}>
        <TitleBar
          title={t('breakers.title')}
          rightElement={
            <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
              <FilterItem type="pill_alt" text={t('buttons.showFollowing')} />
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
      {loading && !data ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          style={[s.flx_i, s.ph3]}
          data={breakers}
          renderItem={({ item }) => (
            <View style={[s.flx_i, s.aic, s.mb4]}>
              <BreakerCard
                {...breakerCardSelector(item)}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.BREAKER_DETAIL_SCREEN, {
                    breaker: item,
                  })
                }
                cardWidth={cardWidth}
                containerStyle={[s.flx_i, { width: cardWidth }]}
                cardSize="large"
              />
            </View>
          )}
        />
      )}
    </Container>
  );
};
