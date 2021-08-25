import { pathOr, head, find, propEq, omit } from 'ramda';

import {
  Users,
  Addresses,
  UserPreferences,
  Notifications,
  FeaturedBreakersQuery,
  LoggedUserQuery,
  ScheduledEventsQuery,
  UserAddressesQuery,
  UserMinimalInformationQuery,
} from '../../services/api/requests';

import {
  addressLineOneSelector,
  addressCitySelector,
  addressStateSelector,
} from '../address/address-selectors';

export const usersSelector = (
  requestData:
    | FeaturedBreakersQuery
    | ScheduledEventsQuery
    | LoggedUserQuery
    | UserAddressesQuery
    | UserMinimalInformationQuery
    | undefined,
): Users[] => pathOr([], ['Users'], requestData);

export const userSelector = (
  requestData:
    | FeaturedBreakersQuery
    | ScheduledEventsQuery
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
  return omit(
    ['first_name', 'last_name', 'is_default', '__typename', 'id'],
    defaultAddress,
  ) as Addresses;
};

export const userBreakPreferencesSelector = (
  user: Users,
): Partial<UserPreferences> => pathOr({}, ['UserPreference'], user);

export const userNotificationsSelector = (
  user: Users,
): Partial<Notifications> => pathOr({}, ['Notifications'], user);

export const userDefaultAddressSingleLineSelector = (user: Users): string => {
  const defaultAddress = userDefaultAddressSelector(user);
  return defaultAddress
    ? `${addressLineOneSelector(defaultAddress)}, ${addressCitySelector(
        defaultAddress,
      )}, ${addressStateSelector(defaultAddress)}`
    : '';
};

export const userStreamUrlSelector = (user: Partial<Users>): string =>
  pathOr('', ['Stream', 'stream_url'], user);
