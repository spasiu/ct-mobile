import React, { useState, useContext } from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  FilterItem,
  TitleBar,
  ScheduleToggle,
  FilterItemStatusTypes,
  OverScreenModal,
  FilterItemTypes,
} from '../../components';
import { t } from '../../i18n/i18n';

import { EventsView } from './events-view';
import { BreaksView } from './breaks-view';
import { filterIcon } from './schedule-screen.presets';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  EVENT_TYPES,
  SPORTS_TYPES,
  TEXT_KEY_FOR_BREAK_TYPE,
  TEXT_KEY_FOR_SPORT_TYPE,
} from '../../providers/filter/filter.presets';
import {
  BreakTypeFilterOptions,
  FilterContext,
  FilterContextType,
  SportTypeFilterOptions,
} from '../../providers/filter';
import { WINDOW_WIDTH } from '../../theme/sizes';

export const ScheduleScreen = (): JSX.Element => {
  const [breaksView, setBreaksView] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    breakTypeFilter,
    sportTypeFilter,
    setBreakTypeFilter,
    setSportTypeFilter,
  } = useContext(FilterContext) as FilterContextType;

  return (
    <Container
      style={[s.mh0]}
      containerType={ContainerTypes.fixed}
      safeAreaEdges={['top', 'left', 'right']}>
      <View>
        <TitleBar
          wrapperStyle={[s.mh3, s.mv0, s.mt4, s.mb0]}
          title={t(breaksView ? 'sections.break' : 'sections.event')}
          rightElement={
            <ScheduleToggle
              isOn={breaksView}
              onToggle={() => setBreaksView(!breaksView)}
            />
          }
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={[s.h2, s.pl3, s.mv3]}
          contentContainerStyle={[s.aic, s.pr3]}
          horizontal={true}
          data={EVENT_TYPES}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            const filterOption = item as BreakTypeFilterOptions;
            const isSelected = breakTypeFilter === filterOption;
            return (
              <FilterItem
                onPress={() => setBreakTypeFilter(filterOption)}
                status={
                  isSelected
                    ? FilterItemStatusTypes.selected
                    : FilterItemStatusTypes.default
                }
                text={t(TEXT_KEY_FOR_BREAK_TYPE[filterOption])}
              />
            );
          }}
        />
      </View>
      {breaksView ? <BreaksView /> : <EventsView />}
      <View
        style={[
          s.absolute,
          s.bottom_0,
          s.h3,
          s.jcc,
          { right: WINDOW_WIDTH / 2 - sizes.w2 },
        ]}>
        <BorderlessButton
          onPress={() => setOpenModal(true)}
          style={[s.bg_black, s.pa2, s.jcc, s.br4, s.aic, s.flx_row]}>
          <Image source={filterIcon} />
          <Text style={[s.white, s.ml1, s.ff_b, s.f6]}>
            {t('buttons.filter')}
          </Text>
        </BorderlessButton>
      </View>
      <OverScreenModal
        isVisible={openModal}
        onPressClose={() => setOpenModal(false)}
        title={t('filter.modalTitle')}>
        <View style={[s.ml3, s.mt3]}>
          <Text style={[s.ff_b, s.f5]}>{t('filter.sportTypes.title')}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={[s.h2, s.mv3]}
            contentContainerStyle={[s.aic, s.pr3]}
            horizontal={true}
            data={SPORTS_TYPES}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              const filterOption = item as SportTypeFilterOptions;
              const isSelected = sportTypeFilter === filterOption;
              return (
                <FilterItem
                  type={FilterItemTypes.pill_alt}
                  onPress={() => setSportTypeFilter(filterOption)}
                  status={
                    isSelected
                      ? FilterItemStatusTypes.selected
                      : FilterItemStatusTypes.default
                  }
                  text={t(TEXT_KEY_FOR_SPORT_TYPE[filterOption])}
                  style={[s.mr2]}
                />
              );
            }}
          />
        </View>
        <View style={[s.ml3, s.mt3]}>
          <Text style={[s.ff_b, s.f5]}>{t('filter.breakTypes.title')}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={[s.h2, s.mv3]}
            contentContainerStyle={[s.aic, s.pr3]}
            horizontal={true}
            data={EVENT_TYPES}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              const filterOption = item as BreakTypeFilterOptions;
              const isSelected = breakTypeFilter === filterOption;
              return (
                <FilterItem
                  type={FilterItemTypes.pill_alt}
                  onPress={() => setBreakTypeFilter(filterOption)}
                  status={
                    isSelected
                      ? FilterItemStatusTypes.selected
                      : FilterItemStatusTypes.default
                  }
                  text={t(TEXT_KEY_FOR_BREAK_TYPE[filterOption])}
                  style={[s.mr2]}
                />
              );
            }}
          />
        </View>
      </OverScreenModal>
    </Container>
  );
};
