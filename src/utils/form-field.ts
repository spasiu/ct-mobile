import { FormikTouched, FormikErrors } from 'formik';

import { FormInputStatusTypes } from '../components';

export const getFieldStatus = (
  field: string,
  activeField: string,
  errors: FormikErrors<{ [name: string]: string }>,
  touched: FormikTouched<{ [name: string]: string }>,
): keyof typeof FormInputStatusTypes => {
  const fieldWasTouched = touched[field];
  const fieldHasError = errors[field];

  if (fieldWasTouched && fieldHasError) {
    return FormInputStatusTypes.error;
  }

  if (activeField === field) {
    return FormInputStatusTypes.active;
  }

  return FormInputStatusTypes.default;
};
