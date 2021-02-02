import { waitFor } from '@testing-library/react';
import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('can spy on it', async () => {
  FirebaseStub.database().initializeData();

  const referencePath = `${DatabaseConstants.resumesPath}/123456`;
  const functionSpy = jest.spyOn(
    FirebaseStub.database().ref(referencePath),
    'update',
  );
  const updateArgument = 'test value 123';

  await FirebaseStub.database().ref(referencePath).update(updateArgument);

  expect(functionSpy).toHaveBeenCalledTimes(1);
  const functionCallArgument = functionSpy.mock.calls[0][0];
  expect(functionCallArgument).toBeTruthy();
  expect(functionCallArgument).toEqual(updateArgument);
});

test('updates data', async () => {
  FirebaseStub.database().initializeData();

  const resumeId = DatabaseConstants.demoStateResume1Id;
  const existingResume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();
  expect(existingResume).toBeTruthy();

  const resumeName = 'Test Resume renamed';
  existingResume.name = resumeName;
  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
    .update(existingResume);

  const actualResume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();
  expect(actualResume).toBeTruthy();
  expect(existingResume).toEqual(actualResume);
  expect(actualResume.name).toEqual(resumeName);
});

test('triggers events', async () => {
  FirebaseStub.database().initializeData();

  let snapshotValue = null;
  const callback = jest.fn((snapshot) => {
    snapshotValue = snapshot.val();
  });
  FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .orderByChild('user')
    .equalTo(DatabaseConstants.user1.uid)
    .on('value', callback);
  await waitFor(() => callback.mock.calls[0][0]);
  callback.mockClear();
  snapshotValue = null;

  const existingResume = (
    await FirebaseStub.database()
      .ref(
        `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
      )
      .once('value')
  ).val();
  expect(existingResume).toBeTruthy();

  existingResume.name = 'Test Resume renamed';
  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${existingResume.id}`)
    .update(existingResume);

  await waitFor(() => callback.mock.calls[0][0]);

  expect(callback.mock.calls).toHaveLength(1);
  expect(snapshotValue).not.toBeNull();
  expect(Object.keys(snapshotValue)).toHaveLength(2);
  expect(snapshotValue[existingResume.id]).toBeTruthy();
  expect(snapshotValue[existingResume.id]).toEqual(existingResume);
});
