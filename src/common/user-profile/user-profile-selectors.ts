import { pathOr, head } from 'ramda';

import {
  Users,
  Addresses,
  UserPreferences,
  Notifications,
  FeaturedBreakersQuery,
  LoggedUserQuery,
  ScheduledEventsQuery,
} from '../../services/api/requests';

import {
  addressLineOneSelector,
  addressCitySelector,
  addressStateSelector,
} from '../address/address-selectors';

export const usersSelector = (
  requestData: FeaturedBreakersQuery | ScheduledEventsQuery | undefined,
): Users[] => pathOr([], ['Users'], requestData);

export const userSelector = (
  requestData: LoggedUserQuery | undefined,
): Users => {
  const users = usersSelector(requestData) as Users[];
  return head(users) as Users;
};

export const userIdSelector = (user: Partial<Users>): string =>
  pathOr('', ['id'], user);

export const userUsernameSelector = (user: Partial<Users>): string =>
  pathOr('', ['username'], user);

export const userNameSelector = (user: Partial<Users>): string => {
  const firstName = pathOr('', ['first_name'], user);
  const lastName = pathOr('', ['last_name'], user);
  return `${firstName} ${lastName}`;
};

export const userImageSelector = (user: Users): string =>
  pathOr('', ['image'], user);

export const userAddressesSelector = (user: Users): Addresses[] =>
  pathOr([], ['Addresses'], user);

export const userBreakPreferencesSelector = (
  user: Users,
): Partial<UserPreferences> => pathOr({}, ['UserPreferences'], user);

export const userNotificationsSelector = (
  user: Users,
): Partial<Notifications> => pathOr({}, ['Notifications'], user);

export const userDefaultAddressSingleLineSelector = (user: Users): string => {
  const addresses = userAddressesSelector(user);
  const defaultAddress = head(addresses);
  return defaultAddress
    ? `${addressLineOneSelector(defaultAddress)}, ${addressCitySelector(
        defaultAddress,
      )}, ${addressStateSelector(defaultAddress)}`
    : '';
};
