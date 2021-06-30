import { pathOr } from 'ramda';

import { Events, Event_Status_Enum } from '../../services/api/requests';
import { StatusBadgeTypes } from '../../components';

import { EventStatusType } from './event';

export const eventStatusSelector = (event: Partial<Events>): EventStatusType =>
  pathOr(Event_Status_Enum.Completed, ['status'], event);

export const eventTimeSelector = (event: Partial<Events>): string =>
  pathOr('', ['start_time'], event);

export const eventCardStatusSelector = (
  event: Partial<Events>,
): StatusBadgeTypes => {
  const eventStatus = eventStatusSelector(event);

  if (eventStatus === Event_Status_Enum.Live) {
    // StatusBadgeTypes.upcoming depends on the status of the event being live
    // but currently there is no way of knowing which break is hapenning
    return StatusBadgeTypes.live;
  }

  if (eventStatus === Event_Status_Enum.Scheduled) {
    return StatusBadgeTypes.scheduled;
  }

  return StatusBadgeTypes.completed;
};

export const eventImageSelector = (event: Partial<Events>): string =>
  pathOr('', ['image'], event);

export const eventTitleSelector = (event: Partial<Events>): string =>
  pathOr('', ['title'], event);

export const eventIdSelector = (event: Partial<Events>): string =>
  pathOr('', ['id'], event);

export const eventDescriptionSelector = (event: Partial<Events>): string =>
  pathOr('', ['description'], event);