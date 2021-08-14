import { pathOr } from 'ramda';
import { Hits, HitsQuery } from '../../services/api/requests';

export const hitsSelector = (request: HitsQuery | undefined): Hits[] =>
  pathOr([], ['Hits'], request);
