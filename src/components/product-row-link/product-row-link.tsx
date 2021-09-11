import { isEmpty } from 'ramda';
import React from 'react';
import { t } from '../../i18n/i18n';

import { RowLink } from '../row-link';

import { warningTextStyle } from './product-row-link.presets';
import { ProductRowLinkProps } from './product-row-link.props';
import { getProductsPreview } from './product-row-link.utils';

export const ProductRowLink = ({
  enabled = true,
  productItems = [],
  ...rowLinkProps
}: ProductRowLinkProps): JSX.Element => {
  const hasProductItems = !isEmpty(productItems);
  return (
    <RowLink
      {...rowLinkProps}
      enabled={enabled}
      textStyle={hasProductItems ? [] : warningTextStyle}
      text={
        hasProductItems
          ? getProductsPreview(productItems)
          : t('payment.selectItemMessage')
      }
      showArrow={enabled}
    />
  );
};
