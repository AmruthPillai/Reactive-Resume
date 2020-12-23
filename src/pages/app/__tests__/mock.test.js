import { cleanup, waitFor } from '@testing-library/react';

import FirebaseStub from 'gatsby-plugin-firebase';

beforeEach(() => {
  FirebaseStub.database().initializeData();
});

afterEach(cleanup);

describe('builder', () => {
  let resumeId = null;
  let resume = null;

  beforeEach(async () => {
    resumeId = FirebaseStub.database().demoResumeId;
    resume = (
      await FirebaseStub.database().ref(`resumes/${resumeId}`).once('value')
    ).val();
  });

  it('test 1', async () => {
    const now = new Date().getTime();
    const newInputValue = 'test street 123';
    resume.profile.address.line1 = newInputValue;
    const functionSpy = jest.spyOn(
      FirebaseStub.database().ref(`resumes/${resumeId}`),
      'update',
    );

    await FirebaseStub.database()
      .ref(`resumes/${resumeId}`)
      .update({
        ...resume,
        updatedAt: FirebaseStub.database.ServerValue.TIMESTAMP,
      });

    await waitFor(() => expect(functionSpy).toHaveBeenCalledTimes(1));
    const functionCallArgument = functionSpy.mock.calls[0][0];
    expect(functionCallArgument.id).toBe(resume.id);
    expect(functionCallArgument.profile.address.line1).toBe(newInputValue);
    expect(functionCallArgument.updatedAt).toBeGreaterThanOrEqual(now);
  });
});
