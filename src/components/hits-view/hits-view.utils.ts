import { map, range } from 'ramda';

import { Hits } from '../../services/api/requests';

import { NUMBER_OF_COLUMNS } from './hits-view.presets';

export const completeHits = (hits: Hits[]): Hits[] => {
  if (hits.length === 0) {
    return [];
  }

  const numberOfRows = Math.ceil(hits.length / NUMBER_OF_COLUMNS);
  const missingItemsCount = numberOfRows * NUMBER_OF_COLUMNS - hits.length;
  const hitsGrid = range(0, missingItemsCount);
  return [...hits, ...map(() => ({} as Hits), hitsGrid)];
};
