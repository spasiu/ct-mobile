jest.mock('@react-native-firebase/firestore', () => {});
jest.mock('react-native-localize', () => {});
jest.mock('react-native-config', () => {});
jest.mock('../../common/break', () => {});
jest.mock('../../common/chat', () => {});
jest.mock('../../common/user-profile', () => {});
jest.mock('../../components', () => {});
jest.mock('../../services/api/requests', () => {});
jest.mock('../../utils/date', () => {});

import { getNumberOfColumns } from './live-screen.utils';

describe('getNumberOfColumns', () => {
  test('should return 5 columns for 1 user', () => {
    expect(getNumberOfColumns(1)).toBe(5);
  });
});