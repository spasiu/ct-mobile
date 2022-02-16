import { pathOr } from 'ramda';
import {
  BreakerHitsQuery,
  FeaturedHitsSubscription,
  Hits,
  HitsQuery,
  NewHitsSubscription,
} from '../../services/api/requests';

export const hitsSelector = (
  request: HitsQuery | BreakerHitsQuery | NewHitsSubscription | FeaturedHitsSubscription | undefined,
): Hits[] => pathOr([], ['Hits'], request);

export const hitImageFrontSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['image_front'], hit);

export const hitPlayerSelector = (hit: Partial<Hits>): string =>
  pathOr('', ['player'], hit);

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
      (hit.autograph)? 'Autograph' : '',
      (hit.memoribillia)? hit.memoribillia : '',
      (hit.rookie_card)? 'Rookie' : '',
      (hit.numbered)? '/' + hit.numbered : ''
    ].join(' ');
}
