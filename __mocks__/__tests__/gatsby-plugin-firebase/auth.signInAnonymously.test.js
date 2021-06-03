import FirebaseStub, { AuthConstants } from '../../gatsby-plugin-firebase';

test('sets current user to anonymous user 1', async () => {
  await FirebaseStub.auth().signInAnonymously();

  const { currentUser } = FirebaseStub.auth();
  expect(currentUser).toBeTruthy();
  expect(currentUser.uid).toEqual(AuthConstants.anonymousUser1.uid);
});

test('calls onAuthStateChanged observer with anonymous user 1', async () => {
  let user = null;
  let error = null;
  FirebaseStub.auth().onAuthStateChanged(
    (_user) => {
      user = _user;
    },
    (_error) => {
      error = _error;
    },
  );

  await FirebaseStub.auth().signInAnonymously();

  expect(user).toBeTruthy();
  expect(user.uid).toEqual(AuthConstants.anonymousUser1.uid);
  expect(error).toBeNull();
});

test('returns anonymous user 1', async () => {
  const user = await FirebaseStub.auth().signInAnonymously();

  expect(user).toBeTruthy();
  expect(user.uid).toEqual(AuthConstants.anonymousUser1.uid);
});
