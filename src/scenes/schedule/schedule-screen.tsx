import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  FilterItem,
  TitleBar,
  ScheduleToggle,
} from '../../components';
import { BreakType } from '../../common/break';
import { t } from '../../i18n/i18n';

import { EventsView } from './events-view';
import { BreaksView } from './breaks-view';
import {
  EVENT_TYPES,
  TEXT_KEY_FOR_BREAK_TYPE,
  ALL_FILTER_OPTION,
} from './schedule-screen.presets';

export const ScheduleScreen = (): JSX.Element => {
  const [eventsView, setEventsView] = useState(false);
  return (
    <Container
      style={[s.mh0]}
      containerType={ContainerTypes.fixed}
      safeAreaEdges={['top', 'left', 'right']}>
      <View>
        <TitleBar
          wrapperStyle={[s.mh3, s.mv0, s.mt4, s.mb0]}
          title={t(eventsView ? 'sections.event' : 'sections.break')}
          rightElement={
            <ScheduleToggle
              isOn={eventsView}
              onToggle={() => setEventsView(!eventsView)}
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
          renderItem={({ item, index }) => {
            const filterOption = item as BreakType | typeof ALL_FILTER_OPTION;
            return (
              <FilterItem
                status={index === 0 ? 'selected' : 'default'}
                text={t(TEXT_KEY_FOR_BREAK_TYPE[filterOption])}
              />
            );
          }}
        />
      </View>
      {eventsView ? <EventsView /> : <BreaksView />}
    </Container>
  );
};
