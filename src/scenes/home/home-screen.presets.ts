import { Sports } from '../../common/sports';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

import {
  HomeSectionData,
  HomeSection,
  HomeSportsData,
} from './home-screen.props';

export const SportsData: HomeSportsData[] = [
  {
    id: `${Sports.baseball}-0`,
    key: Sports.baseball,
  },
  {
    id: `${Sports.basketball}-1`,
    key: Sports.basketball,
  },
  {
    id: `${Sports.football}-2`,
    key: Sports.football,
  },
  {
    id: `${Sports.soccer}-3`,
    key: Sports.soccer,
  },
  {
    id: `${Sports.hockey}-4`,
    key: Sports.hockey,
  },
];

export const SectionsData: HomeSectionData[] = [
  {
    title: t('sections.leagues'),
    key: HomeSection.sports,
  },
  {
    title: t('sections.featuredBreaks'),
    key: HomeSection.events,
    destination: ROUTES_IDS.SCHEDULE_TAB,
  },
  {
    title: t('sections.recentHits'),
    key: HomeSection.hits,
    destination: ROUTES_IDS.HITS_TAB,
  },
  {
    title: t('sections.meetTheBreakers'),
    key: HomeSection.breakers,
    destination: ROUTES_IDS.BREAKERS_TAB,
  },
];
