import { fireEvent, screen } from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { setupAndWait } from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

async function setup() {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  await setupAndWait(resumeId, true, true);

  const button = screen.getByRole('button', {
    name: /Delete Account/i,
  });

  const mockFirebaseUserDelete = jest.spyOn(
    FirebaseStub.auth().currentUser,
    'delete',
  );

  return {
    button,
    mockFirebaseUserDelete,
  };
}

test('prompts for confirmation', async () => {
  const { button, mockFirebaseUserDelete } = await setup();

  fireEvent.click(button);

  expect(button).toHaveTextContent('Are you sure?');
  expect(mockFirebaseUserDelete).not.toHaveBeenCalled();
});

/*
test('calls Firebase user delete', async () => {
  const { button, mockFirebaseUserDelete } = await setup();

  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockFirebaseUserDelete).toHaveBeenCalledTimes(1);
});
*/
