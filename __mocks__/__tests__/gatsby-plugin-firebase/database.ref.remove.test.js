import { waitFor } from '@testing-library/react';
import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('deletes data', async () => {
  FirebaseStub.database().initializeData();

  const resumeId = DatabaseConstants.demoStateResume1Id;
  const removedResume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();
  expect(removedResume).toBeTruthy();

  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
    .remove();

  const actualResume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();
  expect(actualResume).toBeNull();
});

test('triggers events', async () => {
  FirebaseStub.database().initializeData();

  const userUid = DatabaseConstants.user1.uid;

  let valueCallbackSnapshotValue = null;
  const valueCallback = jest.fn((snapshot) => {
    valueCallbackSnapshotValue = snapshot.val();
  });
  FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .orderByChild('user')
    .equalTo(userUid)
    .on('value', valueCallback);
  await waitFor(() => valueCallback.mock.calls[0][0]);
  valueCallback.mockClear();
  valueCallbackSnapshotValue = null;

  let childRemovedCallbackSnapshotValue = null;
  const childRemovedCallback = jest.fn((snapshot) => {
    childRemovedCallbackSnapshotValue = snapshot.val();
  });
  FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .orderByChild('user')
    .equalTo(userUid)
    .on('child_removed', childRemovedCallback);

  const removedResume = (
    await FirebaseStub.database()
      .ref(
        `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
      )
      .once('value')
  ).val();
  expect(removedResume).toBeTruthy();
  expect(removedResume.user).toEqual(userUid);
  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${removedResume.id}`)
    .remove();

  await waitFor(() => childRemovedCallback.mock.calls[0][0]);
  expect(childRemovedCallback.mock.calls).toHaveLength(1);
  expect(childRemovedCallbackSnapshotValue).toBeTruthy();
  expect(childRemovedCallbackSnapshotValue).toEqual(removedResume);

  await waitFor(() => valueCallback.mock.calls[0][0]);
  expect(valueCallback.mock.calls).toHaveLength(1);
  expect(valueCallbackSnapshotValue).toBeTruthy();
  expect(removedResume.id in valueCallbackSnapshotValue).toBe(false);
});
