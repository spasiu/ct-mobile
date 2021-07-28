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

export const breaksSelector = (
  requestData: FeaturedBreaksQuery | BreakDetailQuery | undefined,
): Breaks[] => pathOr([], ['Breaks'], requestData);

export const breakSelector = (
  requestData: FeaturedBreaksQuery | BreakDetailQuery | undefined,
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
