import { waitFor } from '@testing-library/react';
import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('can filter resumes by user', async () => {
  FirebaseStub.database().initializeData();

  let snapshotValue = null;

  FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .orderByChild('user')
    .equalTo(DatabaseConstants.user1.uid)
    .on('value', (snapshot) => {
      snapshotValue = snapshot.val();
    });

  await waitFor(() =>
    snapshotValue ? Promise.resolve(true) : Promise.reject(),
  );

  expect(snapshotValue).not.toBeNull();
  expect(Object.keys(snapshotValue)).toHaveLength(2);
  Object.values(snapshotValue).forEach((resume) =>
    expect(resume.user).toEqual(DatabaseConstants.user1.uid),
  );
});

test('previously set query parameters are not kept when retrieving reference again', () => {
  FirebaseStub.database().initializeData();

  let reference = null;

  reference = FirebaseStub.database().ref(DatabaseConstants.resumesPath);
  expect(reference).toBeTruthy();
  const { uuid } = reference;
  expect(reference.orderByChildPath).toHaveLength(0);
  expect(reference.equalToValue).toHaveLength(0);

  reference = FirebaseStub.database()
    .ref(DatabaseConstants.resumesPath)
    .orderByChild('user')
    .equalTo('testuser1');
  expect(reference).toBeTruthy();
  expect(reference.uuid).toBe(uuid);
  expect(reference.orderByChildPath).toBe('user');
  expect(reference.equalToValue).toBe('testuser1');

  reference = FirebaseStub.database().ref(DatabaseConstants.resumesPath);
  expect(reference).toBeTruthy();
  expect(reference.uuid).toBe(uuid);
  expect(reference.orderByChildPath).toHaveLength(0);
  expect(reference.equalToValue).toHaveLength(0);
});
