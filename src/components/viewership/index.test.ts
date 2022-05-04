jest.mock('@react-native-firebase/firestore', () => jest.fn(() => ({})));
import firestore from '@react-native-firebase/firestore';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockDocs = (docs: [] = [], set=jest.fn(() => Promise.resolve(true)), update=jest.fn(() => Promise.resolve(true))) =>
  jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            set,
            update,
            delete: jest.fn(() => Promise.resolve(true)),
          })),
          get: jest.fn(() => Promise.resolve({ docs })),
        })),
        set: jest.fn(() => Promise.resolve(true)),
        update: jest.fn(() => Promise.resolve(true)),
      })),
      get: jest.fn(() => Promise.resolve(true)),
    })),
  }));

import { getCount, poll, configure } from '../viewership';
configure({ timeoutMs: 100, intervalMs: 100 });

describe('Viewer Counts', () => {
  describe('no views', () => {
    let setFn: any;
    let updateFn: any;
    beforeEach(() => {
      setFn = jest.fn(() => Promise.resolve(true));
      updateFn = jest.fn(() => Promise.resolve(true));
      firestore.mockImplementation(mockDocs([], setFn, updateFn));
    });
    test('getCount should return a view count of zero for an empty collection', done => {
      getCount('some_event')
        .then(count => {
          expect(count).toBe(0);
          done();
        })
        .catch(done);
    });

    test('poll should callback with count of zero', done => {
      const cancel = poll('some_event', undefined, count => {
        expect(setFn.mock.calls.length).toBe(0);
        expect(count).toBe(0);
        cancel();
        done();
      });
    });

    test('poll should create a view count when a user ID provided', done => {
      const cancel = poll('some_event', 'some_user', count => {
        expect(setFn.mock.calls.length).toBe(1);
        cancel();
        done();
      });
    });

    test('poll should update timestamp after interval', done => {
      const cancel = poll('some_event', 'some_user', count => {});
      wait(150).then(() => {
        expect(updateFn.mock.calls.length).toBe(1);
        cancel();
        done();
      });
    });

    afterEach(() => firestore.mockImplementation(jest.fn(() => ({}))));
  });

  describe('one expired view', () => {
    beforeAll(() =>
      firestore.mockImplementation(
        mockDocs([{ data: () => ({ timestamp: 0 }) }]),
      ),
    );
    test('getCount should return a view count of zero for a collection of expired views', done => {
      getCount('some_event')
        .then(count => {
          expect(count).toBe(0);
          done();
        })
        .catch(done);
    });

    test('poll should callback with count of zero', done => {
      const cancel = poll('some_event', undefined, count => {
        expect(count).toBe(0);
        cancel();
        done();
      });
    });

    afterAll(() => firestore.mockImplementation(jest.fn(() => ({}))));
  });

  describe('one expired view and one recent view', () => {
    beforeAll(() => {
      const timestamp = Date.now();
      firestore.mockImplementation(mockDocs([
          { data: () => ({ timestamp }) },
          { data: () => ({ timestamp: 0 }) },
        ]));
    });
    test('getCount should return a view count of one for a collection with a recent view', done => {
      getCount('some_event')
        .then(count => {
          expect(count).toBe(1);
          done();
        })
        .catch(done);
    });

    test('poll should callback with count of one', done => {
      const cancel = poll('some_event', undefined, count => {
        expect(count).toBe(1);
        cancel();
        done();
      });
    });

    test('count should expire after timeout', done => {
      wait(150)
        .then(() => getCount('some_event'))
        .then(count => {
          expect(count).toBe(0);
          done();
        })
        .catch(done);
    });

    afterAll(() => firestore.mockImplementation(jest.fn(() => ({}))));
  });
});
