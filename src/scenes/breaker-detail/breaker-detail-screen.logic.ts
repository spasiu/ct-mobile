import { map, filter } from 'ramda';
import {
  BreakCardProps,
  EventCardProps,
  SocialIconTypes,
} from '../../components';
import {
  BreakerProfiles,
  BreakerProfiles_Select_Column,
  Breaks,
  Events,
  Hits,
  useBreakerHitsQuery,
  useFollowBreakMutation,
  useFollowEventMutation,
  useNewBreakerBreaksSubscription,
  useNewBreakerEventsSubscription,
  Users,
  useUnfollowBreakMutation,
  useUnfollowEventMutation,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { SOCIAL_PROFILES } from '../../common/breaker/social-profile-options';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import {
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breaksSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import {
  breakerBioSelector,
  breakerFollowedByUser,
  breakerProfileSelector,
  breakerVideoSelector,
} from '../../common/breaker';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventIdSelector,
  eventDescriptionSelector,
  eventFollowedByUserSelector,
  eventsSelector,
} from '../../common/event';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import {
  BreakerProfileComponentProps,
  SimpleBreaker,
  useBreakerDetailScreenHookType,
  useBreaksViewHookType,
  useEventsViewHookType,
} from './breaker-detail-screen.props';
import { hitsSelector } from '../../common/hit';
import { useContext, useState } from 'react';
import { BreakerDetailScreenRouteProp } from './breaker-detail-screen.props';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  optimisticUnfollowBreakResponse,
  updateUnfollowBreakCache,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
  optimisticFollowEventResponse,
  optimisticUnfollowEventResponse,
  updateFollowEventCache,
  updateUnfollowEventCache,
} from '../../utils/cache';

const getSocialProfiles = (breaker: BreakerProfiles) =>
  map(profile => {
    return {
      name: profile as keyof typeof SocialIconTypes,
      url: breaker[profile as BreakerProfiles_Select_Column],
    };
  }, SOCIAL_PROFILES);

export const breakerDetailScreenSelector = (
  breaker: Users,
): BreakerProfileComponentProps => {
  const breakerProfile = breakerProfileSelector(breaker);
  const social = filter(
    profile => profile.url,
    getSocialProfiles(breakerProfile as BreakerProfiles),
  );
  return {
    id: breaker.id,
    name: userNameSelector(breaker),
    image: userImageSelector(breaker),
    video: breakerVideoSelector(breaker),
    description: breakerBioSelector(breaker),
    userFollows: breakerFollowedByUser(breaker),
    social,
  };
};

export const breakerDetailBreakSelector = (
  eventBreak: Breaks,
  breakerImage: string,
): BreakCardProps => {
  const breakTime = breakTimeSelector(eventBreak);
  return {
    eventDate: formatScheduledStatus(breakTime),
    status: breakCardStatusSelector(eventBreak),
    price: breakPriceSelector(eventBreak),
    spotsLeft: breakSpotsSelector(eventBreak),
    title: breakTitleSelector(eventBreak),
    breakType: breakTypeSelector(eventBreak),
    league: breakSportSelector(eventBreak),
    breakerImage,
    userFollows: breakFollowedByUserSelector(eventBreak),
  };
};

export const breakerEventDetailSelector = (event: Events): EventCardProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    eventDate: formatScheduledStatus(eventTime),
    title: eventTitleSelector(event),
    status: eventCardStatusSelector(event),
    image: eventImageSelector(event),
    userFollows: eventFollowedByUserSelector(event),
  };
};

export const eventDetailSelector = (
  event: Events,
  breaker: SimpleBreaker,
): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: breaker.name as string,
      image: breaker.image as string,
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
  };
};

export const useBreakerDetailScreenHook = (
  route: BreakerDetailScreenRouteProp,
): useBreakerDetailScreenHookType => {
  const { breaker, startOnEventsView = false } = route.params;
  const [eventsView, setEventsView] = useState(startOnEventsView);
  const [hitDetail, setHitDetail] = useState<Partial<Hits>>({});
  const { id, name, image, social, description, video } =
    breakerDetailScreenSelector(breaker);
  const { data: hitsRequestData } = useBreakerHitsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      breakerId: id,
      offset: 0,
    },
  });
  const hits = hitsSelector(hitsRequestData);
  return {
    video,
    image,
    name,
    id,
    social,
    description,
    hitDetail,
    setHitDetail,
    hits,
    eventsView,
    setEventsView,
  };
};

export const useBreaksViewHook = (
  breaker: SimpleBreaker,
): useBreaksViewHookType => {
  const [breakId, setBreakId] = useState<string>();
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useNewBreakerBreaksSubscription({
    variables: { id: breaker.id, userId: authUser?.uid },
  });
  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();
  const breaks = breaksSelector(data);
  const onPressFollow = (
    breakItem: Breaks,
    breakerBreakDetail: BreakCardProps,
  ): void => {
    const followData = {
      user_id: authUser?.uid,
      break_id: breakItem.id,
    };
    breakerBreakDetail.userFollows
      ? unfollowBreak({
          optimisticResponse: optimisticUnfollowBreakResponse(
            breakItem,
            authUser?.uid as string,
          ),
          update: cache => updateUnfollowBreakCache(cache, breakItem),
          variables: followData,
        })
      : followBreak({
          optimisticResponse: optimisticFollowBreakResponse(
            breakItem,
            authUser?.uid as string,
          ),
          update: (cache, followResponse) =>
            updateFollowBreakCache(cache, followResponse, breakItem),
          variables: {
            follow: followData,
          },
        });
  };
  return {
    breakId,
    setBreakId,
    loading,
    data,
    breaks,
    onPressFollow,
  };
};

export const useEventsViewHook = (
  breaker: SimpleBreaker,
): useEventsViewHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { loading, data } = useNewBreakerEventsSubscription({
    variables: { id: breaker.id, userId: authUser?.uid as string },
  });
  const [followEvent] = useFollowEventMutation();
  const [unfollowEvent] = useUnfollowEventMutation();
  const events = eventsSelector(data);
  const onPressFollow = (item: Events, eventData: EventCardProps) => {
    const followData = {
      user_id: authUser?.uid,
      event_id: item.id,
    };

    eventData.userFollows
      ? unfollowEvent({
          optimisticResponse: optimisticUnfollowEventResponse(
            item,
            authUser?.uid as string,
          ),
          update: cache => updateUnfollowEventCache(cache, item),
          variables: followData,
        })
      : followEvent({
          optimisticResponse: optimisticFollowEventResponse(
            item,
            authUser?.uid as string,
          ),
          update: (cache, followResponse) =>
            updateFollowEventCache(cache, followResponse, item),
          variables: {
            follow: followData,
          },
        });
  };
  return { loading, data, events, event, setEvent, onPressFollow };
};
