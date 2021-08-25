import { filter, head, pathOr } from 'ramda';

import {
  BreakProductItems_Aggregate,
  Breaks,
  BreakProductItems,
} from '../../services/api/requests';

export const breakProductsMaxPriceSelector = (
  breakProducts: Partial<BreakProductItems_Aggregate>,
): string => pathOr('', ['aggregate', 'max', 'price'], breakProducts);

export const breakProductsMinPriceSelector = (
  breakProducts: Partial<BreakProductItems_Aggregate>,
): string => pathOr('', ['aggregate', 'min', 'price'], breakProducts);

export const breakProductsQuantitySelector = (
  breakProducts: Partial<BreakProductItems_Aggregate>,
): string => pathOr('', ['aggregate', 'sum', 'quantity'], breakProducts);

export const breakProductsItemsSelector = (
  eventBreak: Breaks,
): BreakProductItems[] => pathOr([], ['BreakProductItems'], eventBreak);

export const breakProductExternalQuantity = (
  product: BreakProductItems,
): number => pathOr(0, ['quantity'], product);

export const breakProductItemsWithQuantitySelector = (
  eventBreak: Breaks,
): BreakProductItems[] => {
  const breakProductItems = breakProductsItemsSelector(eventBreak);
  return filter(
    item => breakProductExternalQuantity(item) !== 0,
    breakProductItems,
  );
};

export const breakProductsFirstItemSelector = (
  eventBreak: Breaks,
): Partial<BreakProductItems> => {
  const breakProductItems = breakProductItemsWithQuantitySelector(eventBreak);
  return head(breakProductItems) || {};
};

export const breakProductExternalProductId = (
  product: BreakProductItems,
): string => pathOr('', ['bc_product_id'], product);

export const breakProductExternalVariantId = (
  product: BreakProductItems,
): string => pathOr('', ['bc_variant_id'], product);
