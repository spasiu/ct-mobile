import { ApolloCache, FetchResult, Reference } from '@apollo/client';
import dayjs from 'dayjs';
import { append, filter, path } from 'ramda';
import { breakFollowedByUserIdSelector } from '../common/break';
import {
  breakerFollowedByUser,
  breakerFollowedByUserIdSelector,
} from '../common/breaker';

import { eventFollowedByUserIdSelector } from '../common/event';
import {
  Breaks,
  Events,
  FollowBreakerMutation,
  FollowBreakMutation,
  FollowEventMutation,
  UnfollowBreakerMutation,
  UnfollowBreakMutation,
  UnfollowEventMutation,
  Users,
} from '../services/api/requests';

export const optimisticUnfollowEventResponse = (
  event: Events,
  userId: string,
): Partial<UnfollowEventMutation> => ({
  delete_SaveEvent: {
    __typename: 'SaveEvent_mutation_response',
    returning: [
      {
        id: eventFollowedByUserIdSelector(event),
        Event: {
          id: event.id,
          __typename: 'Events',
        },
        User: {
          id: userId,
          __typename: 'Users',
        },
      },
    ],
  },
});

export const optimisticUnfollowBreakResponse = (
  eventBreak: Breaks,
  userId: string,
): Partial<UnfollowBreakMutation> => ({
  delete_SaveBreak: {
    __typename: 'SaveBreak_mutation_response',
    returning: [
      {
        id: breakFollowedByUserIdSelector(eventBreak),
        Break: {
          id: eventBreak.id,
          __typename: 'Breaks',
        },
        User: {
          id: userId,
          __typename: 'Users',
        },
      },
    ],
  },
});

export const optimisticUnfollowBreakerResponse = (
  breaker: Users,
  userId: string,
): Partial<UnfollowBreakerMutation> => ({
  delete_SaveBreaker: {
    __typename: 'SaveBreaker_mutation_response',
    returning: [
      {
        id: breakerFollowedByUser(breaker),
        Breaker: {
          id: breaker.id,
          __typename: 'Users',
        },
        User: {
          id: userId,
          __typename: 'Users',
        },
      },
    ],
  },
});

export const updateUnfollowEventCache = (
  cache: ApolloCache<UnfollowEventMutation>,
  event: Events,
): void => {
  cache.modify({
    id: cache.identify({
      __typename: 'Events',
      id: event.id,
    }),
    fields: {
      Saves(savesRefs = [], { readField }) {
        const removedItemId = eventFollowedByUserIdSelector(event);
        return filter(savesRef => {
          const itemReference = savesRef as Reference;
          return removedItemId !== readField('id', itemReference);
        }, savesRefs);
      },
    },
  });
};

export const updateUnfollowBreakCache = (
  cache: ApolloCache<UnfollowBreakMutation>,
  eventBreak: Breaks,
): void => {
  cache.modify({
    id: cache.identify({
      __typename: 'Breaks',
      id: eventBreak.id,
    }),
    fields: {
      Saves(savesRefs = [], { readField }) {
        const removedItemId = breakFollowedByUserIdSelector(eventBreak);
        return filter(savesRef => {
          const itemReference = savesRef as Reference;
          return removedItemId !== readField('id', itemReference);
        }, savesRefs);
      },
    },
  });
};

export const updateUnfollowBreakerCache = (
  cache: ApolloCache<UnfollowBreakerMutation>,
  breaker: Users,
): void => {
  cache.modify({
    id: cache.identify({
      __typename: 'Users',
      id: breaker.id,
    }),
    fields: {
      Followers(savesRefs = [], { readField }) {
        const removedItemId = breakerFollowedByUserIdSelector(breaker);
        return filter(savesRef => {
          const itemReference = savesRef as Reference;
          return removedItemId !== readField('id', itemReference);
        }, savesRefs);
      },
    },
  });
};

export const optimisticFollowEventResponse = (
  event: Events,
  userId: string,
): Partial<FollowEventMutation> => ({
  insert_SaveEvent_one: {
    id: `temp-id-${dayjs().valueOf()}`,
    __typename: 'SaveEvent',
    Event: {
      id: event.id,
      __typename: 'Events',
    },
    User: {
      id: userId,
      __typename: 'Users',
    },
  },
});

export const optimisticFollowBreakResponse = (
  eventBreak: Breaks,
  userId: string,
): Partial<FollowBreakMutation> => ({
  insert_SaveBreak_one: {
    id: `temp-id-${dayjs().valueOf()}`,
    __typename: 'SaveBreak',
    Break: {
      id: eventBreak.id,
      __typename: 'Breaks',
    },
    User: {
      id: userId,
      __typename: 'Users',
    },
  },
});

export const optimisticFollowBreakerResponse = (
  breaker: Users,
  userId: string,
): Partial<FollowBreakerMutation> => ({
  insert_SaveBreaker_one: {
    id: `temp-id-${dayjs().valueOf()}`,
    __typename: 'SaveBreaker',
    Breaker: {
      id: breaker.id,
      __typename: 'Users',
    },
    User: {
      id: userId,
      __typename: 'Users',
    },
  },
});

export const updateFollowEventCache = (
  cache: ApolloCache<FollowEventMutation>,
  response: FetchResult<FollowEventMutation>,
  event: Events,
): void => {
  cache.modify({
    id: cache.identify({
      __typename: 'Events',
      id: event.id,
    }),
    fields: {
      Saves(savesRef = []) {
        const addedFollow = path(['data', 'insert_SaveEvent_one'], response);
        return append(addedFollow, savesRef);
      },
    },
  });
};

export const updateFollowBreakCache = (
  cache: ApolloCache<FollowBreakMutation>,
  response: FetchResult<FollowBreakMutation>,
  eventBreak: Partial<Breaks>,
): void => {
  cache.modify({
    id: cache.identify({
      __typename: 'Breaks',
      id: eventBreak.id,
    }),
    fields: {
      Saves(savesRef = []) {
        const addedFollow = path(['data', 'insert_SaveBreak_one'], response);
        return append(addedFollow, savesRef);
      },
    },
  });
};

export const updateFollowBreakerCache = (
  cache: ApolloCache<FollowBreakerMutation>,
  response: FetchResult<FollowBreakerMutation>,
  breaker: Partial<Users>,
): void => {
  cache.modify({
    id: cache.identify({
      __typename: 'Users',
      id: breaker.id,
    }),
    fields: {
      Followers(savesRef = []) {
        const addedFollow = path(['data', 'insert_SaveBreaker_one'], response);
        return append(addedFollow, savesRef);
      },
    },
  });
};