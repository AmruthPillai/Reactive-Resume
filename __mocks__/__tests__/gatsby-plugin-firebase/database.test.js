import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('reuses existing Database instance', () => {
  const database1 = FirebaseStub.database();
  const database2 = FirebaseStub.database();

  expect(database1.uuid).toBeTruthy();
  expect(database2.uuid).toBeTruthy();
  expect(database1.uuid).toEqual(database2.uuid);
});

test('ServerValue.TIMESTAMP returns current time in milliseconds', () => {
  const now = new Date().getTime();
  const timestamp = FirebaseStub.database.ServerValue.TIMESTAMP;

  expect(timestamp).toBeTruthy();
  expect(timestamp).toBeGreaterThanOrEqual(now);
});

test('initializing data sets up resumes and users', async () => {
  FirebaseStub.database().initializeData();

  const resumesRef = FirebaseStub.database().ref(DatabaseConstants.resumesPath);
  const resumesDataSnapshot = await resumesRef.once('value');
  const resumes = resumesDataSnapshot.val();
  expect(resumes).toBeTruthy();
  expect(Object.keys(resumes)).toHaveLength(5);
  const demoStateResume1 = resumes[DatabaseConstants.demoStateResume1Id];
  expect(demoStateResume1).toBeTruthy();
  expect(demoStateResume1.id).toEqual(DatabaseConstants.demoStateResume1Id);
  expect(demoStateResume1.user).toEqual(DatabaseConstants.user1.uid);
  const demoStateResume2 = resumes[DatabaseConstants.demoStateResume2Id];
  expect(demoStateResume2).toBeTruthy();
  expect(demoStateResume2.id).toEqual(DatabaseConstants.demoStateResume2Id);
  expect(demoStateResume2.user).toEqual(DatabaseConstants.user2.uid);
  const initialStateResume1 = resumes[DatabaseConstants.initialStateResume1Id];
  expect(initialStateResume1).toBeTruthy();
  expect(initialStateResume1.id).toEqual(
    DatabaseConstants.initialStateResume1Id,
  );
  expect(initialStateResume1.user).toEqual(DatabaseConstants.user1.uid);
  const demoStateResume3 = resumes[DatabaseConstants.demoStateResume3Id];
  expect(demoStateResume3).toBeTruthy();
  expect(demoStateResume3.id).toEqual(DatabaseConstants.demoStateResume3Id);
  expect(demoStateResume3.user).toEqual(DatabaseConstants.user3.uid);
  const initialStateResume2 = resumes[DatabaseConstants.initialStateResume2Id];
  expect(initialStateResume2).toBeTruthy();
  expect(initialStateResume2.id).toEqual(
    DatabaseConstants.initialStateResume2Id,
  );
  expect(initialStateResume2.user).toEqual(DatabaseConstants.user3.uid);

  const usersRef = FirebaseStub.database().ref(DatabaseConstants.usersPath);
  const usersDataSnapshot = await usersRef.once('value');
  const users = usersDataSnapshot.val();
  expect(users).toBeTruthy();
  expect(Object.keys(users)).toHaveLength(3);
  const anonymousUser1 = users[DatabaseConstants.user1.uid];
  expect(anonymousUser1).toBeTruthy();
  expect(anonymousUser1).toEqual(DatabaseConstants.user1);
  const anonymousUser2 = users[DatabaseConstants.user2.uid];
  expect(anonymousUser2).toBeTruthy();
  expect(anonymousUser2).toEqual(DatabaseConstants.user2);
  const googleUser3 = users[DatabaseConstants.user3.uid];
  expect(googleUser3).toBeTruthy();
  expect(googleUser3).toEqual(DatabaseConstants.user3);
});
