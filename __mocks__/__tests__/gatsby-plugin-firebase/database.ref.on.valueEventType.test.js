import { waitFor } from '@testing-library/react';
import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('triggers event with true if on the connected reference path', async () => {
  FirebaseStub.database().initializeData();

  let snapshotValue = null;

  FirebaseStub.database()
    .ref(DatabaseConstants.connectedPath)
    .on('value', (snapshot) => {
      snapshotValue = snapshot.val();
    });

  await waitFor(() =>
    snapshotValue ? Promise.resolve(true) : Promise.reject(),
  );

  expect(snapshotValue).not.toBeNull();
  expect(snapshotValue).toBe(true);
});

test('triggers event with resumes if on the resumes reference path', async () => {
  FirebaseStub.database().initializeData();

  const resumesDataSnapshot = await FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .once('value');
  const resumes = resumesDataSnapshot.val();

  let snapshotValue = null;

  FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .on('value', (snapshot) => {
      snapshotValue = snapshot.val();
    });

  await waitFor(() =>
    snapshotValue ? Promise.resolve(true) : Promise.reject(),
  );

  expect(snapshotValue).not.toBeNull();
  expect(snapshotValue).toEqual(resumes);
});
