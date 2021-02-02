import { waitFor } from '@testing-library/react';
import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('inserts data', async () => {
  FirebaseStub.database().initializeData();

  const existingResume = (
    await FirebaseStub.database()
      .ref(
        `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
      )
      .once('value')
  ).val();
  expect(existingResume).toBeTruthy();

  const newResume = JSON.parse(JSON.stringify(existingResume));
  newResume.id = 'newre1';
  newResume.name = `Test Resume ${newResume.id}`;
  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${newResume.id}`)
    .set(newResume);

  const actualResume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${newResume.id}`)
      .once('value')
  ).val();
  expect(actualResume).toBeTruthy();
  expect(actualResume).toEqual(newResume);
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

  const newResume = JSON.parse(JSON.stringify(existingResume));
  newResume.id = 'newre1';
  newResume.name = `Test Resume ${newResume.id}`;
  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${newResume.id}`)
    .set(newResume);

  await waitFor(() => callback.mock.calls[0][0]);

  expect(callback.mock.calls).toHaveLength(1);
  expect(snapshotValue).not.toBeNull();
  expect(Object.keys(snapshotValue)).toHaveLength(3);
  expect(snapshotValue[newResume.id]).toBeTruthy();
  expect(snapshotValue[newResume.id]).toEqual(newResume);
});
