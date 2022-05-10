import React from 'react';
import { FlatList, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { BreakerCard, EmptyState } from '../../components';
import { t } from '../../i18n/i18n';

import { breakerCardSelector } from './search-modal.logic';
import { SearchBreakersViewProps } from './search-modal.props';

export const SearchBreakersView = ({
  breakers,
  onPressBreaker,
}: SearchBreakersViewProps): JSX.Element => {
  const cardWidth = sizes.w5 + sizes.w3 + sizes.w2;

  return (
    <FlatList
      ListEmptyComponent={() => (
        <EmptyState
          title={t('emptyResults.noBreakersTitle')}
          description={t('emptyResults.noBreakersDescription')}
        />
      )}
      keyExtractor={item => item.id}
      style={[s.flx_i, s.ph3]}
      data={breakers}
      renderItem={({ item }) => {
        const breakerCard = breakerCardSelector(item);
        return (
          <View style={[s.flx_i, s.aic, s.mb4]}>
            <BreakerCard
              {...breakerCard}
              onPress={() => onPressBreaker(item)}
              cardWidth={cardWidth}
              containerStyle={[s.flx_i, { width: cardWidth }]}
              cardSize="large"
              breakerId={item.id}
            />
          </View>
        );
      }}
    />
  );
};
