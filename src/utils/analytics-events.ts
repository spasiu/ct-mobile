import Intercom from '@intercom/intercom-react-native';

export enum AnalyticsEventTypes {
  viewed_hit = 'viewed_hit',
  purchased_break = 'purchased_break',
  joined_live = 'joined_live',
  viewed_breakers = 'viewed_breaker',
  viewed_schedule = 'viewed_schedule',
  viewed_hits = 'viewed_hits',
  viewed_profile = 'viewed_profile',
  viewed_breaker_profile = 'viewed_breaker_profile',
  viewed_event = 'viewed_event',
  viewed_break = 'viewed_break',
  viewed_my_hits = 'viewed_my_hits',
  shared_hit = 'shared_hit',
  commented_in_live = 'commented_in_live',
  used_home_filter = 'used_home_filter',
  used_schedule_filter = 'used_schedule_filter',
  used_search = 'used_search',
  added_address = 'added_address',
  added_payment_method = 'added_payment_method',
}

export interface AnalyticsEventProps {
  event: keyof typeof AnalyticsEventTypes;
  customProperties?: { [key: string]: string | number };
}

export const triggerIntercomEvent = (eventProps: AnalyticsEventProps): void => {
  Intercom.logEvent(eventProps.event, eventProps.customProperties);
};

export const triggerAnalyticsEvent = (
  eventProps: AnalyticsEventProps,
): void => {
  triggerIntercomEvent(eventProps);
};
