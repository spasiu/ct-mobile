import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import {
  Container,
  ContainerTypes,
  TitleBar,
  ScheduleToggle,
  OverScreenModal,
  FilterItem,
  FilterItemTypes,
  FilterItemStatusTypes,
} from '../../components';
import { t } from '../../i18n/i18n';
import { EventsView } from './events-view';
import { BreaksView } from './breaks-view';
import { filterIcon } from './schedule-screen.presets';
import {
  BorderlessButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  EVENT_TYPES,
  SPORTS_TYPES,
  TEXT_KEY_FOR_FILTER_TYPE,
} from '../../providers/filter/filter.presets';
import {
  BreakTypeFilterOptions,
  SportTypeFilterOptions,
} from '../../providers/filter';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { isEmpty } from 'ramda';
import { useScheduleScreenHook } from './schedule-screen.logic';

export const ScheduleScreen = (): JSX.Element => {
  const {
    breaksView,
    setBreaksView,
    setItemTypeFilter,
    filters,
    isSport,
    setOpenModal,
    openModal,
    sportTypeFilter,
    setSportTypeFilter,
    breakTypeFilter,
    setBreakTypeFilter,
  } = useScheduleScreenHook();
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
              onToggle={() => {
                setBreaksView(!breaksView);
                breaksView
                  ? setItemTypeFilter('Events')
                  : setItemTypeFilter('Breaks');
              }}
            />
          }
        />
        {!isEmpty(filters) ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={[s.h2, s.pl3, s.mv3]}
            contentContainerStyle={[s.aic, s.pr3]}
            horizontal={true}
            data={filters}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[
                    s.br4,
                    s.ba,
                    s.ph3,
                    s.mb2,
                    s.black,
                    { flexDirection: 'row' },
                  ]}
                  onPress={() =>
                    isSport(item)
                      ? setSportTypeFilter('ALL')
                      : setBreakTypeFilter('ALL')
                  }>
                  <Text style={[s.mr3]}>X</Text>
                  <Text>{t(TEXT_KEY_FOR_FILTER_TYPE[item])}</Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : null}
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
                  text={t(TEXT_KEY_FOR_FILTER_TYPE[filterOption])}
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
                  text={t(TEXT_KEY_FOR_FILTER_TYPE[filterOption])}
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
