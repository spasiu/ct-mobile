import { ActionButtonTypes } from './action-button.props';

export const isDisabled = (type: keyof typeof ActionButtonTypes) =>
  type === ActionButtonTypes.disabled;
