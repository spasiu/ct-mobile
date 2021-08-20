import { pathOr } from 'ramda';
import {
  BreakerHitsQuery,
  Hits,
  HitsQuery,
  NewHitsSubscription,
} from '../../services/api/requests';

export const hitsSelector = (
  request: HitsQuery | BreakerHitsQuery | NewHitsSubscription | undefined,
): Hits[] => pathOr([], ['Hits'], request);

export const hitImageFrontSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['image_front'], hit);

export const hitPlayerSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['player'], hit);

export const hitDescriptionSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['description'], hit);
