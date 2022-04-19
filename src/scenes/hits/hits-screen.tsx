import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  TitleBar,
  Container,
  ContainerTypes,
  SearchInput,
  FilterItem,
  Avatar,
  FilterItemStatusTypes,
  HitsView,
} from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { t } from '../../i18n/i18n';
import {
  useHitsScreenQuery,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { userSelector, userImageSelector } from '../../common/user-profile';

import { hitsSelector } from '../../common/hit';

import { HitsScreenProps } from './hits-screen.props';
import { getHitsSearchAndFilterParams } from './hits-screen.utils';
const PAGE_SIZE = 99;
export const HitsScreen = ({ navigation }: HitsScreenProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [userHitsFilterActive, setUserHitsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(PAGE_SIZE);
  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const {
    data: requestData,
    loading,
    fetchMore,
  } = useHitsScreenQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      ...getHitsSearchAndFilterParams(
        authUser?.uid as string,
        searchTerm,
        userHitsFilterActive,
      ),
      offset: 0,
      limit: PAGE_SIZE,
    },
  });
  const hits = hitsSelector(requestData);
  const user = userSelector(users);
  const loadMore = () => {
    if (offset - PAGE_SIZE > hits.length) return;
    fetchMore({
      variables: { offset },
    });
    setOffset(offset + PAGE_SIZE);
  };
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
              <FilterItem
                onPress={() => setUserHitsFilterActive(!userHitsFilterActive)}
                status={
                  userHitsFilterActive
                    ? FilterItemStatusTypes.selected
                    : FilterItemStatusTypes.default
                }
                style={[s.mr3]}
                type="pill_alt"
                text={t('buttons.myHits')}
              />
              <Avatar
                src={userImageSelector(user)}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)
                }
              />
            </View>
          }
        />
        <SearchInput
          value={searchTerm}
          onChangeText={(text: string) => {
            setSearchTerm(text);
            setOffset(PAGE_SIZE);
          }}
        />
      </View>
      <HitsView
        hits={hits}
        onEndReached={() => (hits.length > 15 ? loadMore() : null)}
        loading={loading}
        myHits={userHitsFilterActive}
      />
    </Container>
  );
};
