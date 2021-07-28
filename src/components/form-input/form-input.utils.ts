import { FormInputStatusTypes } from './form-input.props';

export const isStatusError = (
  status: keyof typeof FormInputStatusTypes,
): boolean => status === FormInputStatusTypes.error;

export const isStatusDisabled = (
  status: keyof typeof FormInputStatusTypes,
): boolean => status === FormInputStatusTypes.disabled;
