import { pathOr } from 'ramda';
import { t } from '../../i18n/i18n';

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
  selectedItems: BreakProductItems[],
): BreakProductItems[] => {
  const breakProductItems = breakProductsItemsSelector(eventBreak);
  const selectedIds = selectedItems.map(item => item.id);
  breakProductItems.forEach(item => {
    console.log(`Selected Item contains ${item.id}: ${selectedIds.includes(item.id)}`)
  })

  return breakProductItems.filter(item =>
    breakProductExternalQuantity(item) === 0
      ? selectedIds.includes(item.id)
      : true,
  );
};

export const breakProductExternalProductId = (
  product: BreakProductItems,
): string => pathOr('', ['bc_product_id'], product);

export const breakProductExternalVariantId = (
  product: BreakProductItems,
): string => pathOr('', ['bc_variant_id'], product);

export const breakProductTitleSelector = (product: BreakProductItems): string =>
  pathOr('', ['title'], product);

export const breakProductPriceSelector = (
  product: BreakProductItems,
): string => {
  const price = pathOr('', ['price'], product);
  return price ? `${t('payment.paymentCurrencySign')}${price}` : '';
};
