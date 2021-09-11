import { BreakProductItems } from '../../services/api/requests';

import { RowLinkProps } from '../row-link';

export interface ProductRowLinkProps extends RowLinkProps {
  productItems?: BreakProductItems[];
}
