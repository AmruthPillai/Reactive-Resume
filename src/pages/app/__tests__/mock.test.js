import { cleanup, waitFor } from '@testing-library/react';

import firebaseMock from 'gatsby-plugin-firebase';

beforeEach(() => {
  firebaseMock.database().__init();
});

afterEach(cleanup);

describe('builder', () => {
  let resumeId = null;
  let resume = null;

  beforeEach(async () => {
    resumeId = firebaseMock.database().__demoResumeId;
    resume = (
      await firebaseMock.database().ref(`resumes/${resumeId}`).once('value')
    ).val();
  });

  it('test 1', async () => {
    const now = new Date().getTime();
    const newInputValue = 'test street 123';
    resume.profile.address.line1 = newInputValue;
    const ref = firebaseMock.database().ref(`resumes/${resumeId}`);
    const functionSpy = jest.spyOn(ref, 'update');

    await ref.update({
      ...resume,
      updatedAt: firebaseMock.database.ServerValue.TIMESTAMP,
    });

    await waitFor(() => expect(functionSpy).toHaveBeenCalledTimes(1), {
      timeout: 4000,
    });
    const functionCallArgument = functionSpy.mock.calls[0][0];
    expect(functionCallArgument.id).toBe(resume.id);
    expect(functionCallArgument.profile.address.line1).toBe(newInputValue);
    expect(functionCallArgument.updatedAt).toBeGreaterThanOrEqual(now);
  });
});
