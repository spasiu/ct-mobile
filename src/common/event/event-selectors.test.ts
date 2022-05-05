import { formatEvents } from './event-selectors';
import { CompletedEventsQuery } from '../../services/api/requests';
jest.mock('../../components', () => ({
  ...jest.requireActual(
    '../../components/address-prediction-list/address-prediction-list.props',
  ),
}));
describe('formatEvents', () => {
  const queryData = {
    Events: [
      {
        __typename: 'Events',
        id: 'fd6204b7-4889-491f-a367-368f5b3a89c8',
        title: 'Test Live ',
        image: '/images/events/46be5f8d-fd15-4c43-9856-f047d90bcfec.png',
        start_time: '2022-04-27T00:00:00+00:00',
        description: 'Test test test!',
        video_url: null,
        User: {
          __typename: 'Users',
          id: 'hoPscrfn8ndOjSGHJ6184dK88kH2',
          image:
            '/users/hoPscrfn8ndOjSGHJ6184dK88kH2/159DC592-A3A0-4AC1-A962-38EDD276D26D.jpg',
          first_name: 'Tyler',
          last_name: ' Lemco',
          username: 'therock',
        },
      },
    ],
  };

  const expectedData = [
    {
      __typename: 'Users',
      id: 'hoPscrfn8ndOjSGHJ6184dK88kH2',
      image:
        '/users/hoPscrfn8ndOjSGHJ6184dK88kH2/159DC592-A3A0-4AC1-A962-38EDD276D26D.jpg',
      first_name: 'Tyler',
      last_name: ' Lemco',
      username: 'therock',
      Events: [
        {
          __typename: 'Events',
          id: 'fd6204b7-4889-491f-a367-368f5b3a89c8',
          title: 'Test Live ',
          image: '/images/events/46be5f8d-fd15-4c43-9856-f047d90bcfec.png',
          start_time: '2022-04-27T00:00:00+00:00',
          description: 'Test test test!',
          video_url: null,
        },
      ],
    },
  ];
  test('should return expected data', () => {
    expect(formatEvents(queryData as CompletedEventsQuery)).toEqual(
      expectedData,
    );
  });
});
