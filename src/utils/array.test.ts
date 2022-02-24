import { postgresStringArray } from './array';

describe('postgresStringArray', () => {
  test('should format array', () => {
    const output = postgresStringArray(['hello', 'goodbye', 'soso']);
    expect(output).toBe("{hello,goodbye,soso}");
  });
});
