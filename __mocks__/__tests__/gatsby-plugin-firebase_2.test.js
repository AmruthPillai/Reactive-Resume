import FirebaseMock from '../gatsby-plugin-firebase_2';

describe('database', () => {
  it('reuses existing Database instance', async () => {
    const database1 = FirebaseMock.database();
    const database2 = FirebaseMock.database();

    expect(database1.uuid).toBeTruthy();
    expect(database2.uuid).toBeTruthy();
    expect(database1.uuid).toEqual(database2.uuid);
  });

  it('reuses existing Reference instance', async () => {
    const ref1 = FirebaseMock.database().ref('resumes/123');
    const ref2 = FirebaseMock.database().ref('resumes/123');

    expect(ref1.uuid).toBeTruthy();
    expect(ref2.uuid).toBeTruthy();
    expect(ref1.uuid).toEqual(ref2.uuid);
  });

  it('ServerValue.TIMESTAMP returns current time in milliseconds', async () => {
    const now = new Date().getTime();
    const timestamp = FirebaseMock.database.ServerValue.TIMESTAMP;

    expect(timestamp).toBeTruthy();
    expect(timestamp).toBeGreaterThanOrEqual(now);
  });

  it("can spy on Reference 'update' function", async () => {
    const referencePath = 'resumes/123456';
    const functionSpy = jest.spyOn(
      FirebaseMock.database().ref(referencePath),
      'update',
    );
    const updateArgument = 'test value 123';

    await FirebaseMock.database().ref(referencePath).update(updateArgument);

    expect(functionSpy).toHaveBeenCalledTimes(1);
    const functionCallArgument = functionSpy.mock.calls[0][0];
    expect(functionCallArgument).toBeTruthy();
    expect(functionCallArgument).toEqual(updateArgument);
  });
});
