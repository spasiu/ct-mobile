import { pathOr, path, head } from 'ramda';

import { StatusBadgeTypes } from '../../components';
import { t } from '../../i18n/i18n';
import {
  Breaks,
  Events,
  Break_Type_Enum,
  Users,
  BreakProductItems_Aggregate,
  BreakDetailQuery,
  EventBreaksQuery,
  SaveBreak,
  Inventory,
  Break_Status_Enum,
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
import { BreakResult } from './break';

export const breaksSelector = (
  requestData: BreakDetailQuery | EventBreaksQuery | undefined,
): Breaks[] => pathOr([], ['Breaks'], requestData);

export const breakSelector = (
  requestData: BreakDetailQuery | EventBreaksQuery | undefined,
): Breaks => {
  const breaks = breaksSelector(requestData);
  return head(breaks) as Breaks;
};

export const breakEventSelector = (eventBreak: Breaks): Partial<Events> =>
  pathOr({}, ['Event'], eventBreak);

export const breakProductAggregateSelector = (
  eventBreak: Partial<Breaks>,
): Partial<BreakProductItems_Aggregate> =>
  pathOr({}, ['BreakProductItems_aggregate'], eventBreak);

export const breakImageSelector = (eventBreak: Breaks): string =>
  pathOr('', ['image'], eventBreak);

export const breakDescriptionSelector = (eventBreak: Breaks): string =>
  pathOr('', ['description'], eventBreak);

export const breakTitleSelector = (eventBreak: Partial<Breaks>): string =>
  pathOr('', ['title'], eventBreak);

export const breakPriceSelector = (eventBreak: Partial<Breaks>): string => {
  const aggregator = breakProductAggregateSelector(eventBreak);
  const maxPrice = breakProductsMaxPriceSelector(aggregator);
  const minPrice = breakProductsMinPriceSelector(aggregator);
  return maxPrice === minPrice
    ? `${t('payment.paymentCurrencySign')}${maxPrice}`
    : `${t('payment.paymentCurrencySign')}${minPrice} - ${t(
        'payment.paymentCurrencySign',
      )}${maxPrice}`;
};

export const breakSpotsSelector = (eventBreak: Partial<Breaks>): number => {
  const aggregator = breakProductAggregateSelector(eventBreak);
  return breakProductsQuantitySelector(aggregator);
};

export const breakSoldOutSelector = (eventBreak: Breaks): boolean => breakSpotsSelector(eventBreak) === 0;

export const breakTypeSelector = (
  eventBreak: Partial<Breaks>,
): Break_Type_Enum => path(['break_type'], eventBreak) as Break_Type_Enum;

export const breakCardStatusSelector = (
  eventBreak: Breaks,
  optionalEvent?: Partial<Events>,
): StatusBadgeTypes => {
  const event = optionalEvent ? optionalEvent : breakEventSelector(eventBreak);
  const eventStatus = eventCardStatusSelector(event);
  if ([Break_Status_Enum.Notified, Break_Status_Enum.Live].includes(eventBreak.status)) {
    return StatusBadgeTypes.live;
  }

  if (eventBreak.status === Break_Status_Enum.Available) {
    return eventStatus === StatusBadgeTypes.live
      ? StatusBadgeTypes.upcoming
      : StatusBadgeTypes.scheduled;
  }

  return StatusBadgeTypes.completed;
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

export const breakResultSelector = (
  eventBreak: Partial<Breaks>,
): BreakResult[] => pathOr([], ['result'], eventBreak);

export const breakIdSelector = (eventBreak: Partial<Breaks>): string =>
  pathOr('', ['id'], eventBreak);

export const breakCompletedSelector = (eventBreak: Breaks): boolean => {
  return eventBreak.status === Break_Status_Enum.Completed;
};
