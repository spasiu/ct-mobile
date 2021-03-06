import { pathOr, head, find, propEq } from 'ramda';

import {
  Users,
  Addresses,
  UserPreferences,
  Notifications,
  FeaturedBreakersQuery,
  LoggedUserQuery,
  UserAddressesQuery,
  UserMinimalInformationQuery,
} from '../../services/api/requests';

import {
  addressCleanSelector,
  addressSingleLineSelector,
} from '../address/address-selectors';

export const usersSelector = (
  requestData:
    | FeaturedBreakersQuery
    | LoggedUserQuery
    | UserAddressesQuery
    | UserMinimalInformationQuery
    | undefined,
): Users[] => pathOr([], ['Users'], requestData);

export const userSelector = (
  requestData:
    | FeaturedBreakersQuery
    | LoggedUserQuery
    | UserAddressesQuery
    | UserMinimalInformationQuery
    | undefined,
): Users => {
  const users = usersSelector(requestData) as Users[];
  return head(users) as Users;
};

export const userIdSelector = (user: Partial<Users>): string =>
  pathOr('', ['id'], user);

export const userUsernameSelector = (user: Partial<Users>): string =>
  pathOr('', ['username'], user);

export const userFirstNameSelector = (user: Partial<Users>): string =>
  pathOr('', ['first_name'], user);

export const userLastNameSelector = (user: Partial<Users>): string =>
  pathOr('', ['last_name'], user);

export const userNameSelector = (user: Partial<Users>): string => {
  return `${userFirstNameSelector(user)} ${userLastNameSelector(user)}`;
};

export const userImageSelector = (user: Partial<Users>): string =>
  pathOr('', ['image'], user);

export const userAddressesSelector = (user: Users): Addresses[] =>
  pathOr([], ['Addresses'], user);

export const userDefaultAddressSelector = (user: Users): Addresses => {
  const userAddresses = userAddressesSelector(user);
  return find(propEq('is_default', true))(userAddresses) as Addresses;
};

export const userDefaultAddressCleanSelector = (user: Users): Addresses => {
  const defaultAddress = userDefaultAddressSelector(user);
  return addressCleanSelector(defaultAddress);
};

export const userBreakPreferencesSelector = (
  user: Users,
): Partial<UserPreferences> => pathOr({}, ['UserPreference'], user);

export const userNotificationsSelector = (
  user: Users,
): Partial<Notifications> => pathOr({}, ['Notifications'], user);

export const userDefaultAddressSingleLineSelector = (user: Users): string => {
  const defaultAddress = userDefaultAddressSelector(user);
  return addressSingleLineSelector(defaultAddress);
};

export const userStreamUrlSelector = (user: Partial<Users>): string =>
  pathOr('', ['Stream', 'stream_url'], user);
