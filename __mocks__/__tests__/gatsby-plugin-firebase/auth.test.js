import FirebaseStub from '../../gatsby-plugin-firebase';

test('reuses existing Auth instance', () => {
  const auth1 = FirebaseStub.auth();
  const auth2 = FirebaseStub.auth();

  expect(auth1.uuid).toBeTruthy();
  expect(auth2.uuid).toBeTruthy();
  expect(auth1.uuid).toEqual(auth2.uuid);
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

test('current user delete calls signOut', async () => {
  const mockSignOut = jest.spyOn(FirebaseStub.auth(), 'signOut');
  await FirebaseStub.auth().signInAnonymously();
  const { currentUser } = FirebaseStub.auth();

  await currentUser.delete();

  expect(mockSignOut).toHaveBeenCalledTimes(1);
});
