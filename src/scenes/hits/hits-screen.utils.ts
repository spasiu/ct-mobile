import { map, range } from 'ramda';
import { Hits } from '../../services/api/requests';

export const NUMBER_OF_COLUMNS = 3;

export const completeHits = (hits: Hits[]): Hits[] => {
  const missingHits = range(0, NUMBER_OF_COLUMNS - hits.length);
  return [...hits, ...map(() => ({} as Hits), missingHits)];
};
