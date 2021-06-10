import { ActionButtonTypes } from './action-button.props';

export const isDisabled = (
  type: keyof typeof ActionButtonTypes,
  isLoading: boolean,
): boolean => {
  return type === ActionButtonTypes.disabled || isLoading;
};
