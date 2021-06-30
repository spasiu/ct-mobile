import { FormikTouched, FormikErrors, FormikValues } from 'formik';
import { split, pathOr } from 'ramda';

import { FormInputStatusTypes } from '../components';

export const getFieldTouched = (
  field: string,
  touched: FormikTouched<FormikValues>,
): boolean => {
  const fieldPath = split('.', field);
  return pathOr(false, fieldPath, touched);
};

export const getFieldError = (
  field: string,
  errors: FormikErrors<FormikValues>,
): string => {
  const fieldPath = split('.', field);
  return pathOr('', fieldPath, errors);
};

export const getFieldValue = (field: string, values: FormikValues): string => {
  const fieldPath = split('.', field);
  return pathOr('', fieldPath, values);
};

export const getFieldStatus = (
  field: string,
  activeField: string,
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>,
): keyof typeof FormInputStatusTypes => {
  const fieldWasTouched = getFieldTouched(field, touched);
  const fieldHasError = getFieldError(field, errors);

  if (fieldWasTouched && fieldHasError) {
    return FormInputStatusTypes.error;
  }

  if (activeField === field) {
    return FormInputStatusTypes.active;
  }

  return FormInputStatusTypes.default;
};

export const getFieldData = (
  field: string,
  activeField: string,
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>,
  values: FormikValues,
): {
  value: string;
  errorMessage: string;
  status: keyof typeof FormInputStatusTypes;
} => {
  return {
    value: getFieldValue(field, values),
    errorMessage: getFieldError(field, errors),
    status: getFieldStatus(field, activeField, errors, touched),
  };
};
