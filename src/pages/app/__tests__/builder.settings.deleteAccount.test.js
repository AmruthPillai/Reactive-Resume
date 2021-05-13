import { navigate as mockNavigateFunction } from '@reach/router';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import FirebaseStub, {
  DatabaseConstants,
  FunctionsConstants,
} from 'gatsby-plugin-firebase';

import { delay } from '../../../utils/index';

import { setupAndWait, findAndDismissNotification } from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

async function setup() {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  await setupAndWait(resumeId, true, true);

  const mockFirebaseDeleteUserCloudFunction = jest.fn(async () => {
    await delay(FunctionsConstants.defaultDelayInMilliseconds);
  });
  const mockFirebaseFunctionsHttpsCallable = jest.fn((name) =>
    name === FunctionsConstants.deleteUserFunctionName
      ? mockFirebaseDeleteUserCloudFunction
      : undefined,
  );
  FirebaseStub.functions().httpsCallable = mockFirebaseFunctionsHttpsCallable;

  const mockFirebaseCurrentUserDelete = jest.spyOn(
    FirebaseStub.auth().currentUser,
    'delete',
  );

  const button = screen.getByRole('button', {
    name: /Delete Account/i,
  });

  return {
    button,
    mockFirebaseCurrentUserDelete,
    mockFirebaseDeleteUserCloudFunction,
  };
}

test('prompts for confirmation', async () => {
  const {
    button,
    mockFirebaseDeleteUserCloudFunction,
    mockFirebaseCurrentUserDelete,
  } = await setup();

  fireEvent.click(button);

  expect(button).toHaveTextContent('Are you sure?');

  await waitFor(() =>
    expect(mockFirebaseDeleteUserCloudFunction).not.toHaveBeenCalledTimes(1),
  );
  await waitFor(() =>
    expect(mockFirebaseCurrentUserDelete).not.toHaveBeenCalled(),
  );
});

/*
test('calls Firebase delete user cloud function', async () => {
  const { button, mockFirebaseDeleteUserCloudFunction } = await setup();

  fireEvent.click(button);
  fireEvent.click(button);

  await waitFor(() => expect(mockNavigateFunction).toHaveBeenCalledTimes(1));
  await findAndDismissNotification();
  await waitFor(() =>
    expect(mockFirebaseDeleteUserCloudFunction).toHaveBeenCalledTimes(1),
  );
});

test('calls Firebase current user delete', async () => {
  const { button, mockFirebaseCurrentUserDelete } = await setup();

  fireEvent.click(button);
  fireEvent.click(button);

  await waitFor(() => expect(mockNavigateFunction).toHaveBeenCalledTimes(1));
  await findAndDismissNotification();
  await waitFor(() =>
    expect(mockFirebaseCurrentUserDelete).toHaveBeenCalledTimes(1),
  );
});
*/
