import FirebaseStub, { AuthConstants } from '../../gatsby-plugin-firebase';

describe('with Google auth provider', () => {
  test('sets current user to Google user 3', async () => {
    await FirebaseStub.auth().signInWithPopup(
      new FirebaseStub.auth.GoogleAuthProvider(),
    );

    const { currentUser } = FirebaseStub.auth();
    expect(currentUser).toBeTruthy();
    expect(currentUser.uid).toEqual(AuthConstants.googleUser3.uid);
  });

  test('sets current user provider data', async () => {
    const provider = new FirebaseStub.auth.GoogleAuthProvider();
    await FirebaseStub.auth().signInWithPopup(provider);

    const { currentUser } = FirebaseStub.auth();
    expect(currentUser).toBeTruthy();
    expect(currentUser.providerData).toBeTruthy();
    expect(currentUser.providerData).toHaveLength(1);
    expect(currentUser.providerData[0].providerId).toEqual(provider.providerId);
  });

  test('calls onAuthStateChanged observer with Google user 3', async () => {
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

    await FirebaseStub.auth().signInWithPopup(
      new FirebaseStub.auth.GoogleAuthProvider(),
    );

    expect(user).toBeTruthy();
    expect(user.uid).toEqual(AuthConstants.googleUser3.uid);
    expect(error).toBeNull();
  });

  test('returns Google user 3', async () => {
    const user = await FirebaseStub.auth().signInWithPopup(
      new FirebaseStub.auth.GoogleAuthProvider(),
    );

    expect(user).toBeTruthy();
    expect(user.uid).toEqual(AuthConstants.googleUser3.uid);
  });
});
