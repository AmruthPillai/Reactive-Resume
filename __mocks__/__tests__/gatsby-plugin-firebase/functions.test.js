import FirebaseStub from '../../gatsby-plugin-firebase';

test('reuses existing Functions instance', () => {
  const functions1 = FirebaseStub.functions();
  const functions2 = FirebaseStub.functions();

  expect(functions1.uuid).toBeTruthy();
  expect(functions2.uuid).toBeTruthy();
  expect(functions1.uuid).toEqual(functions2.uuid);
});

test('deleteUser function returns true', async () => {
  const deleteUser = FirebaseStub.functions().httpsCallable('deleteUser');

  const result = await deleteUser();

  expect(result).toBeTruthy();
  expect(result.data).toEqual(true);
});
