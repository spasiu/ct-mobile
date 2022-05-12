import { pathOr } from 'ramda';
import {
  BreakerHitsQuery,
  FeaturedHitsSubscription,
  Hits,
  HitsQuery,
  HitsScreenQuery,
  SearchQuery,
} from '../../services/api/requests';

export const hitsSelector = (
  request:
    | SearchQuery
    | HitsQuery
    | BreakerHitsQuery
    | HitsScreenQuery
    | FeaturedHitsSubscription
    | undefined,
): Hits[] => pathOr([], ['Hits'], request);

export const hitImageFrontSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['image_front'], hit);

export const hitImageBackSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['image_back'], hit);

export const hitPlayerSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['player'], hit);

export const hitUserSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['User', 'username'], hit);

export const hitBreakerSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['Break', 'Event', 'User', 'username'], hit);

export const hitDescription = (hit: Partial<Hits>): string => {
  return [
    hit.Product?.year,
    hit.Product?.manufacturer,
    hit.Product?.brand,
    hit.Product?.series,
    hit.card_number,
    hit.player,
    hit.parallel,
    hit.insert,
    hit.autograph ? 'Autograph' : '',
    hit.memoribilia ? hit.memoribilia : '',
    hit.rookie_card ? 'Rookie' : '',
    hit.numbered ? '/' + hit.numbered : '',
  ].filter(h => h).join(' ');
};
