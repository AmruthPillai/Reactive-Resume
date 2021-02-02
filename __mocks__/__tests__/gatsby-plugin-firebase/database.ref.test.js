import FirebaseStub, { DatabaseConstants } from '../../gatsby-plugin-firebase';

test('reuses existing Reference instance', () => {
  const ref1 = FirebaseStub.database().ref(
    `${DatabaseConstants.resumesPath}/123`,
  );
  const ref2 = FirebaseStub.database().ref(
    `${DatabaseConstants.resumesPath}/123`,
  );

  expect(ref1).toBeTruthy();
  expect(ref2).toBeTruthy();
  expect(ref1).toEqual(ref2);
});

test('leading slash in reference path is ignored', () => {
  const path = `${DatabaseConstants.resumesPath}/123`;

  const ref1 = FirebaseStub.database().ref(path);
  expect(ref1).toBeTruthy();
  expect(ref1.path).toEqual(path);

  const ref2 = FirebaseStub.database().ref(`/${path}`);
  expect(ref2).toBeTruthy();
  expect(ref2).toEqual(ref1);
});
