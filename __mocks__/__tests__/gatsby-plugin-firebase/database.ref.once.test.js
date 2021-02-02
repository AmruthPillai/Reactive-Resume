import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('retrieves resume if it exists', async () => {
  FirebaseStub.database().initializeData();

  const resumeId = DatabaseConstants.demoStateResume1Id;

  const resume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();

  expect(resume).toBeTruthy();
  expect(resume.id).toEqual(resumeId);
});

test('retrieves null if resume does not exist', async () => {
  FirebaseStub.database().initializeData();

  const resumeId = 'invalidResumeId';

  const resume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();

  expect(resume).toBeNull();
});

test('retrieves user if it exists', async () => {
  FirebaseStub.database().initializeData();

  const expectedUser = DatabaseConstants.user1;

  const user = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.usersPath}/${expectedUser.uid}`)
      .once('value')
  ).val();

  expect(user).toBeTruthy();
  expect(user).toEqual(expectedUser);
});

test('retrieves null if user does not exist', async () => {
  FirebaseStub.database().initializeData();

  const userId = 'invalidUserId';

  const user = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.usersPath}/${userId}`)
      .once('value')
  ).val();

  expect(user).toBeNull();
});
