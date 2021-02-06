import FirebaseStub, { AuthConstants } from '../../gatsby-plugin-firebase';

test('reuses existing Auth instance', () => {
  const auth1 = FirebaseStub.auth();
  const auth2 = FirebaseStub.auth();

  expect(auth1.uuid).toBeTruthy();
  expect(auth2.uuid).toBeTruthy();
  expect(auth1.uuid).toEqual(auth2.uuid);
});

test('returns anonymous user 1 when signing in anonymously', async () => {
  const user = await FirebaseStub.auth().signInAnonymously();

  expect(user).toBeTruthy();
  expect(user).toEqual(AuthConstants.anonymousUser1);
});

test('calls onAuthStateChanged observer with anonymous user 1 when signing in anonymously', async () => {
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
  expect(user).toEqual(AuthConstants.anonymousUser1);
  expect(error).toBeNull();
});

test('onAuthStateChanged unsubscribe removes observer', () => {
  const observer = () => {};
  const unsubscribe = FirebaseStub.auth().onAuthStateChanged(observer);
  expect(unsubscribe).toBeTruthy();
  expect(
    FirebaseStub.auth().onAuthStateChangedObservers.indexOf(observer),
  ).toBeGreaterThanOrEqual(0);

  unsubscribe();

  expect(
    FirebaseStub.auth().onAuthStateChangedObservers.indexOf(observer),
  ).not.toBeGreaterThanOrEqual(0);
});
