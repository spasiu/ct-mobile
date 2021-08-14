import { GraphQLError } from 'graphql';
import { head, pathOr } from 'ramda';

import { ERRORS_MAP } from './error';

export const errorDuplicateUsernameSelector = (
  errors: readonly GraphQLError[],
): boolean => {
  const priorityError = head(errors);
  const errorId = pathOr('', ['extensions', 'code'], priorityError);
  return errorId === ERRORS_MAP.CONSTRAINT_VIOLATION;
};
