import { Connection } from "./connection";

describe('Connection', () => {
  test('should instaitate Connection with streamName', () => {
    const connection = new Connection('somestreamname');
    expect(connection.streamName).toBe('somestreamname');
  });
});