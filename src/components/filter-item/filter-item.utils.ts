import { FilterItemTypes } from './filter-item.props';

export const isTypeCircle = (type: keyof typeof FilterItemTypes): boolean =>
  type === FilterItemTypes.circle;
