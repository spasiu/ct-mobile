import React from 'react';
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
import { userImageSelector } from '../../common/user-profile';
import { HitsScreenProps } from './hits-screen.props';
import { useHitsScreenHook } from './hits-screen.logic';

const PAGE_SIZE = 99;
export const HitsScreen = ({ navigation }: HitsScreenProps): JSX.Element => {
  const {
    userHitsFilterActive,
    setUserHitsFilterActive,
    user,
    searchTerm,
    setSearchTerm,
    setOffset,
    hits,
    loadMore,
    loading,
  } = useHitsScreenHook(PAGE_SIZE);
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
