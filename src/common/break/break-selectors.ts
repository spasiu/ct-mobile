import { pathOr, path, head } from 'ramda';

import { StatusBadgeTypes } from '../../components';
import {
  FeaturedBreaksQuery,
  Breaks,
  Events,
  Break_Type_Enum,
  Users,
  BreakProductItems_Aggregate,
  BreakDetailQuery,
  EventBreaksQuery,
  SaveBreak,
  Inventory,
} from '../../services/api/requests';
import {
  breakProductsMaxPriceSelector,
  breakProductsMinPriceSelector,
  breakProductsQuantitySelector,
} from '../break-products';

import {
  eventBreakerSelector,
  eventCardStatusSelector,
  eventTimeSelector,
} from '../event';
import { Sports } from '../sports';

export const breaksSelector = (
  requestData:
    | FeaturedBreaksQuery
    | BreakDetailQuery
    | EventBreaksQuery
    | undefined,
): Breaks[] => pathOr([], ['Breaks'], requestData);

export const breakSelector = (
  requestData:
    | FeaturedBreaksQuery
    | BreakDetailQuery
    | EventBreaksQuery
    | undefined,
): Breaks => {
  const breaks = breaksSelector(requestData);
  return head(breaks) as Breaks;
};

export const breakEventSelector = (eventBreak: Breaks): Partial<Events> =>
  pathOr({}, ['Event'], eventBreak);

export const breakProductAggregateSelector = (
  eventBreak: Breaks,
): Partial<BreakProductItems_Aggregate> =>
  pathOr({}, ['BreakProductItems_aggregate'], eventBreak);

export const breakImageSelector = (eventBreak: Breaks): string =>
  pathOr('', ['image'], eventBreak);

export const breakDescriptionSelector = (eventBreak: Breaks): string =>
  pathOr('', ['description'], eventBreak);

export const breakTitleSelector = (eventBreak: Breaks): string =>
  pathOr('', ['title'], eventBreak);

export const breakPriceSelector = (eventBreak: Breaks): string => {
  const aggregator = breakProductAggregateSelector(eventBreak);
  const maxPrice = breakProductsMaxPriceSelector(aggregator);
  const minPrice = breakProductsMinPriceSelector(aggregator);
  return maxPrice === minPrice ? `$${maxPrice}` : `$${minPrice} - $${maxPrice}`;
};

export const breakSpotsSelector = (eventBreak: Breaks): string => {
  const aggregator = breakProductAggregateSelector(eventBreak);
  return breakProductsQuantitySelector(aggregator);
};

export const breakSoldOutSelector = (eventBreak: Breaks): boolean => {
  const spots = breakSpotsSelector(eventBreak);
  return parseInt(spots, 10) === 0;
};

export const breakTypeSelector = (eventBreak: Breaks): Break_Type_Enum =>
  path(['break_type'], eventBreak) as Break_Type_Enum;

export const breakCardStatusSelector = (
  eventBreak: Breaks,
): StatusBadgeTypes => {
  const event = breakEventSelector(eventBreak);
  return eventCardStatusSelector(event);
};

export const breakTimeSelector = (eventBreak: Breaks): string => {
  const event = breakEventSelector(eventBreak);
  return eventTimeSelector(event);
};

export const breakBreakerSelector = (eventBreak: Breaks): Partial<Users> => {
  const event = breakEventSelector(eventBreak);
  return eventBreakerSelector(event);
};

export const breakSavesSelector = (eventBreak: Breaks): SaveBreak[] =>
  pathOr([], ['Saves'], eventBreak);

export const breakFollowedByUserSelector = (eventBreak: Breaks): boolean => {
  const saves = breakSavesSelector(eventBreak);
  return saves.length > 0;
};

export const breakFollowedByUserIdSelector = (eventBreak: Breaks): string => {
  const saves = breakSavesSelector(eventBreak);
  return pathOr('', ['id'], head(saves));
};

export const breakInventorySelector = (eventBreak: Breaks): Inventory[] =>
  pathOr([], ['Inventory'], eventBreak);

export const breakSportSelector = (eventBreak: Breaks): Sports | string => {
  const inventory = breakInventorySelector(eventBreak);
  return pathOr('', ['Product', 'category'], head(inventory));
};
