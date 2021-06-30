import { pathOr, path } from 'ramda';

import { StatusBadgeTypes } from '../../components';
import {
  FeaturedBreaksQuery,
  Breaks,
  Events,
  Break_Type_Enum,
} from '../../services/api/requests';

import { eventCardStatusSelector, eventTimeSelector } from '../event';

export const breaksSelector = (
  requestData: FeaturedBreaksQuery | undefined,
): Breaks[] => pathOr([], ['Breaks'], requestData);

export const breakEventSelector = (eventBreak: Breaks): Partial<Events> =>
  pathOr({}, ['Event'], eventBreak);

export const breakImageSelector = (eventBreak: Breaks): string =>
  pathOr('', ['image'], eventBreak);

export const breakDescriptionSelector = (eventBreak: Breaks): string =>
  pathOr('', ['description'], eventBreak);

export const breakTitleSelector = (eventBreak: Breaks): string =>
  pathOr('', ['title'], eventBreak);

export const breakPriceSelector = (eventBreak: Breaks): number =>
  pathOr(NaN, ['price'], eventBreak);

export const breakSpotsSelector = (eventBreak: Breaks): number =>
  pathOr(NaN, ['spots'], eventBreak);

export const breakTypeSelector = (eventBreak: Breaks): Break_Type_Enum =>
  path(['breakType'], eventBreak) as Break_Type_Enum;

export const breakCardStatusSelector = (
  eventBreak: Breaks,
): StatusBadgeTypes => {
  const event = breakEventSelector(eventBreak);
  return eventCardStatusSelector(event);
};

export const breakTimeSelector = (eventBreak: Breaks): string => {
  const event = breakEventSelector(eventBreak);
  return eventTimeSelector(event);
};
