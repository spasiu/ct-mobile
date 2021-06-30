import { SelectableRowTypes } from './selectable-row.props';

export const isRowStatusDefault = (
  status: keyof typeof SelectableRowTypes,
): boolean => status === SelectableRowTypes.default;
