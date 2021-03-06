import { filter, find, head, isEmpty, pathOr, propEq } from 'ramda';

import {
  NewBreakerEventsSubscription,
  Breaks,
  Break_Status_Enum,
  Events,
  Event_Status_Enum,
  LiveStreamSubscription,
  FeaturedEventsSubscription,
  SaveEvent,
  Users,
  CompletedEventsQuery,
  NewScheduledEventsSubscription,
} from '../../services/api/requests';
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

export const eventVideoSelector = (
  event: Partial<Events>,
): string | undefined => event.video_url || undefined;

export const eventBreakerSelector = (event: Partial<Events>): Partial<Users> =>
  pathOr({}, ['User'], event);

export const eventsSelector = (
  requestData:
    | NewBreakerEventsSubscription
    | LiveStreamSubscription
    | FeaturedEventsSubscription
    | undefined,
): Events[] => pathOr([], ['Events'], requestData);

export const eventSavesSelector = (event: Partial<Events>): SaveEvent[] =>
  pathOr([], ['Saves'], event);

export const eventBreaksSelector = (event: Partial<Events>): Breaks[] =>
  pathOr([], ['Breaks'], event);

export const eventFollowedByUserSelector = (
  event: Partial<Events>,
): boolean => {
  const saves = eventSavesSelector(event);
  return saves.length > 0;
};

export const eventFollowedByUserIdSelector = (event: Events): string => {
  const saves = eventSavesSelector(event);
  return pathOr('', ['id'], head(saves));
};

export const eventSelector = (
  requestData: LiveStreamSubscription | undefined,
): Partial<Events> => {
  const events = eventsSelector(requestData);
  return isEmpty(events) ? {} : (head(events) as Events);
};

export const eventViewCountSelector = (event: Partial<Events>): string =>
  pathOr('', ['viewCount'], event);

export const eventLiveBreakSelector = (
  event: Partial<Events>,
): Partial<Breaks> => {
  const breaks = eventBreaksSelector(event);
  const liveBreak = find(propEq('status', Break_Status_Enum.Live), breaks);
  return liveBreak || {};
};

export const eventNotifiedBreakSelector = (
  event: Partial<Events>,
): Partial<Breaks> => {
  const breaks = eventBreaksSelector(event);
  const notifiedBreaks = find(propEq('status', Break_Status_Enum.Notified), breaks);
  return notifiedBreaks || {};
};

export const eventUpcomingBreaksSelector = (
  event: Partial<Events>,
): Breaks[] => {
  const eventBreaks = eventBreaksSelector(event);
  return filter(eventBreak => {
    const breakStatus = eventBreak.status;
    return (
      breakStatus !== Break_Status_Enum.Notified &&
      breakStatus !== Break_Status_Enum.Live &&
      breakStatus !== Break_Status_Enum.Completed
    );
  }, eventBreaks);
};

export const eventUpcomingBreakSelector = (
  event: Partial<Events>,
): Partial<Breaks> => {
  const breaks = eventUpcomingBreaksSelector(event);
  return head(breaks) || {};
};

export const eventStreamNameSelector = (event: Partial<Events>) =>
  event.stream_name || undefined;

export const formatEvents = (
  data: NewScheduledEventsSubscription | CompletedEventsQuery | undefined,
): Users[] => {
  const userEvents: { [key: string]: Users } = {};
  data?.Events.forEach((eventData: any) => {
    const { User, ...event } = eventData;
    if (User) {
      userEvents[User.id]
        ? userEvents[User.id].Events?.push(event)
        : (userEvents[User.id] = { ...User, Events: [event] });
    }
  });
  return Object.keys(userEvents).map(userId => userEvents[userId]) as Users[];
};
