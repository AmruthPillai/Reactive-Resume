import { waitFor } from '@testing-library/react';
import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('removes event callbacks', async () => {
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

  FirebaseStub.database().ref(DatabaseConstants.resumesPath).off();

  await FirebaseStub.database()
    .ref(`${DatabaseConstants.resumesPath}/${removedResume.id}`)
    .remove();

  expect(childRemovedCallback.mock.calls).toHaveLength(0);
  expect(childRemovedCallbackSnapshotValue).toBeNull();
  expect(valueCallback.mock.calls).toHaveLength(0);
  expect(valueCallbackSnapshotValue).toBeNull();
});
