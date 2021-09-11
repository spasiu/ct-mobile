import { map } from 'ramda';
import {
  breakProductPriceSelector,
  breakProductTitleSelector,
} from '../../common/break-products';
import { BreakProductItems } from '../../services/api/requests';

export const getProductsPreview = (
  productItems: BreakProductItems[],
): string => {
  const cartItemTitles = map(item => {
    const itemTitle = breakProductTitleSelector(item);
    const itemPrice = breakProductPriceSelector(item);
    return `${itemTitle} (${itemPrice})`;
  }, productItems);
  return cartItemTitles.join(', ');
};
