import { navigate as mockNavigateFunction } from '@reach/router';
import { toast } from 'react-toastify';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import FirebaseStub, {
  DatabaseConstants,
  FunctionsConstants,
} from 'gatsby-plugin-firebase';

import { setupAndWait } from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

async function setup() {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  await setupAndWait(resumeId, true, true);

  const mockFirebaseDeleteUserCloudFunction = jest.fn(async () => {});
  const mockFirebaseFunctionsHttpsCallable = jest.fn((name) =>
    name === FunctionsConstants.deleteUserFunctionName
      ? mockFirebaseDeleteUserCloudFunction
      : undefined,
  );
  FirebaseStub.functions().httpsCallable = mockFirebaseFunctionsHttpsCallable;

  const mockFirebaseCurrentUserDelete = jest.fn(async () => {
    throw new Error('Error occurred while deleting user.');
  });
  FirebaseStub.auth().currentUser.delete = mockFirebaseCurrentUserDelete;

  const mockFirebaseAuthSignOut = jest.fn(async () => {
    throw new Error('Error occurred while signing out.');
  });
  FirebaseStub.auth().signOut = mockFirebaseAuthSignOut;

  // eslint-disable-next-line no-unused-vars
  const mockToastError = jest.fn((content, options) => {});
  toast.error = mockToastError;

  const deleteAccountRegExp = /Delete Account/i;
  const button = screen.getByRole('button', {
    name: deleteAccountRegExp,
  });

  const waitForButtonNameToBeSetToDeleteAccount = async () => {
    waitFor(() => {
      expect(button).toHaveTextContent(deleteAccountRegExp);
    });
  };

  return {
    button,
    mockFirebaseDeleteUserCloudFunction,
    mockFirebaseCurrentUserDelete,
    mockFirebaseAuthSignOut,
    mockToastError,
    waitForButtonNameToBeSetToDeleteAccount,
  };
}

test('prompts for confirmation', async () => {
  const {
    button,
    mockFirebaseDeleteUserCloudFunction,
    mockFirebaseCurrentUserDelete,
    mockFirebaseAuthSignOut,
    mockToastError,
  } = await setup();

  fireEvent.click(button);

  expect(button).toHaveTextContent(/Are you sure?/i);

  expect(mockFirebaseDeleteUserCloudFunction).not.toHaveBeenCalled();
  expect(mockFirebaseCurrentUserDelete).not.toHaveBeenCalled();
  expect(mockFirebaseAuthSignOut).not.toHaveBeenCalled();
  expect(mockNavigateFunction).not.toHaveBeenCalled();
  expect(mockToastError).not.toHaveBeenCalled();
});

test('calls Firebase delete user cloud function', async () => {
  const {
    button,
    mockFirebaseDeleteUserCloudFunction,
    waitForButtonNameToBeSetToDeleteAccount,
  } = await setup();

  fireEvent.click(button);
  fireEvent.click(button);

  await waitForButtonNameToBeSetToDeleteAccount();
  await waitFor(() =>
    expect(mockFirebaseDeleteUserCloudFunction).toHaveBeenCalledTimes(1),
  );
});

test('calls Firebase current user delete', async () => {
  const {
    button,
    mockFirebaseCurrentUserDelete,
    waitForButtonNameToBeSetToDeleteAccount,
  } = await setup();

  fireEvent.click(button);
  fireEvent.click(button);

  await waitForButtonNameToBeSetToDeleteAccount();
  await waitFor(() =>
    expect(mockFirebaseCurrentUserDelete).toHaveBeenCalledTimes(1),
  );
});

test('calls Firebase auth sign out', async () => {
  const {
    button,
    mockFirebaseAuthSignOut,
    waitForButtonNameToBeSetToDeleteAccount,
  } = await setup();

  fireEvent.click(button);
  fireEvent.click(button);

  await waitForButtonNameToBeSetToDeleteAccount();
  await waitFor(() => expect(mockFirebaseAuthSignOut).toHaveBeenCalledTimes(1));
});

describe('if an error occurs while signing out the current user', () => {
  test('does not navigate away', async () => {
    const { button, waitForButtonNameToBeSetToDeleteAccount } = await setup();

    fireEvent.click(button);
    fireEvent.click(button);

    await waitForButtonNameToBeSetToDeleteAccount();
    expect(mockNavigateFunction).not.toHaveBeenCalled();
  });

  /*
  test('displays toast', async () => {
    const {
      button,
      waitForButtonNameToBeSetToDeleteAccount,
      mockToastError,
    } = await setup();

    fireEvent.click(button);
    fireEvent.click(button);

    await waitForButtonNameToBeSetToDeleteAccount();
    expect(mockToastError).toHaveBeenCalledTimes(2);
    expect(mockToastError).toHaveBeenLastCalledWith(
      'An error occurred deleting your account.',
    );
  });
  */
});
