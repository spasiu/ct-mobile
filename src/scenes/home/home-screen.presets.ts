import { Sports } from '../../common/sports';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

import {
  HomeSectionData,
  HomeSection,
  HomeSportsData,
  HomeHitsData,
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

export const HitsData: HomeHitsData[] = [
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
];

export const SectionsData: HomeSectionData[] = [
  {
    title: t('sections.leagues'),
    key: HomeSection.sports,
  },
  {
    title: t('sections.featuredBreaks'),
    key: HomeSection.breaks,
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
