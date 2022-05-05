import { Events, Users } from 'services/api/requests';
import {
  featuredBreakerSelector,
  featuredEventDetailSelector,
  featuredEventSelector,
} from './home-screen.logic';

jest.mock('../../providers/filter', () => {});
jest.mock('../../components', () => ({
  ...jest.requireActual('../../components/status-badge/status-badge.props'),
}));

const rawEventData = {
  id: '84e224bc-e0c9-48ba-8ed9-9bf9e2319b0a',
  title: 'Even Newer Event',
  status: 'SCHEDULED',
  image: '/images/events/f8ca8527-356b-4326-bae7-2402179f7eeb.jpg',
  start_time: '2021-04-21T13:22:41+00:00',
  description: 'just an exciting test',
  User: {
    id: 'JC0kt5QwPvbvgeiryKkNuL5KWR23',
    first_name: 'Jonathan',
    last_name: ' Weiss',
    image:
      '/users/JC0kt5QwPvbvgeiryKkNuL5KWR23/9EC1E183-F337-405C-B62D-614158F6456C.jpg',
    __typename: 'Users',
  },
  __typename: 'Events',
};

describe('featureEventSelector', () => {
  const refinedData = {
    eventId: '84e224bc-e0c9-48ba-8ed9-9bf9e2319b0a',
    status: 'scheduled',
    eventDate: '04/21/2021',
    viewCount: '',
    image: '/images/events/f8ca8527-356b-4326-bae7-2402179f7eeb.jpg',
    title: 'Even Newer Event',
    description: 'just an exciting test',
  };
  test('should return the expected data', () => {
    expect(featuredEventSelector(rawEventData as Events)).toEqual(refinedData);
  });
});

describe('featuredEventDetailSelector', () => {
  const refinedData = {
    eventId: '84e224bc-e0c9-48ba-8ed9-9bf9e2319b0a',
    title: 'Even Newer Event',
    image: '/images/events/f8ca8527-356b-4326-bae7-2402179f7eeb.jpg',
    breaker: {
      name: 'Jonathan  Weiss',
      image:
        '/users/JC0kt5QwPvbvgeiryKkNuL5KWR23/9EC1E183-F337-405C-B62D-614158F6456C.jpg',
    },
    status: 'scheduled',
    description: 'just an exciting test',
    eventDate: '04/21/2021',
  };
  test('should return the expected data', () => {
    expect(featuredEventDetailSelector(rawEventData as Events)).toEqual(refinedData);
  });
});

describe('featuredBreakerSelector', () => {
  const rawData = {
    __typename: 'Users',
    id: 'weWyhBTvZzar8YUd2vVLE12zEDx1',
    first_name: '514',
    last_name: 'Breaks',
    image: '/images/profile/00b129c0-0066-4b2a-bbc1-a109f1e520cb.png',
    BreakerProfile: {
      __typename: 'BreakerProfiles',
      id: 'a6fdde59-fc3d-4a07-8a5d-11aac4501c3b',
      twitter: 'https://twitter.com/',
      facebook: null,
      instagram: 'https://www.instagram.com/',
      video: 'https://player.vimeo.com/video/652936543',
      bio: 'A long time lover of the Hobby, I have been breaking basketball and football cards for the last 3 years. I have loved to witness how the Hobby has taken off and how there are so many new collectors. Come break with me live Tuesdays, Thursdays and Friday at 9:00pm EST. We have all the latest products. Whether searching for a Zion rookie to Lamelo from Herbert to Lawrence, I will do everything in my power to help you get it. We ship you your cards, upload your hits and share the love with the community. ',
    },
  };
  const refinedData = {
    breakerId: 'weWyhBTvZzar8YUd2vVLE12zEDx1',
    title: '514 Breaks',
    description:
      'A long time lover of the Hobby, I have been breaking basketball and football cards for the last 3 years. I have loved to witness how the Hobby has taken off and how there are so many new collectors. Come break with me live Tuesdays, Thursdays and Friday at 9:00pm EST. We have all the latest products. Whether searching for a Zion rookie to Lamelo from Herbert to Lawrence, I will do everything in my power to help you get it. We ship you your cards, upload your hits and share the love with the community. ',
    image: '/images/profile/00b129c0-0066-4b2a-bbc1-a109f1e520cb.png',
  };
  test('should return the expected data', () => {
    expect(featuredBreakerSelector(rawData as Users)).toEqual(refinedData);
  });
});
