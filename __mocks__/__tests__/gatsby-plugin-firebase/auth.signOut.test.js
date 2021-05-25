import FirebaseStub from '../../gatsby-plugin-firebase';

test('sets current user to null', async () => {
  await FirebaseStub.auth().signInAnonymously();

  await FirebaseStub.auth().signOut();

  const { currentUser } = FirebaseStub.auth();
  expect(currentUser).toBeNull();
});

test('calls onAuthStateChanged observer with null', async () => {
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

  await FirebaseStub.auth().signOut();

  expect(user).toBeNull();
  expect(error).toBeNull();
});
