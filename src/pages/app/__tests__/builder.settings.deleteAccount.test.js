import { navigate as mockNavigateFunction } from '@reach/router';
import { toast } from 'react-toastify';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import FirebaseStub, {
  AuthConstants,
  DatabaseConstants,
  FunctionsConstants,
} from 'gatsby-plugin-firebase';

import { setupAndWait } from './helpers/builder';
import { delay } from '../../../utils/index';

const testTimeoutInMilliseconds = 60000;
jest.setTimeout(testTimeoutInMilliseconds);

async function setup(signInWithGoogle, failReauthentication) {
  const resumeId = signInWithGoogle
    ? DatabaseConstants.demoStateResume3Id
    : DatabaseConstants.demoStateResume1Id;

  await setupAndWait(resumeId, signInWithGoogle, true, true);

  let mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage;
  let mockFirebaseCurrentUserReauthenticateWithPopup;
  if (failReauthentication) {
    mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage =
      'Error occurred while reauthenticating.';
    mockFirebaseCurrentUserReauthenticateWithPopup = jest.fn(async () => {
      await delay(AuthConstants.defaultDelayInMilliseconds);
      throw new Error(
        mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage,
      );
    });
    FirebaseStub.auth().currentUser.reauthenticateWithPopup =
      mockFirebaseCurrentUserReauthenticateWithPopup;
  } else {
    mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage = null;
    mockFirebaseCurrentUserReauthenticateWithPopup = jest.spyOn(
      FirebaseStub.auth().currentUser,
      'reauthenticateWithPopup',
    );
  }

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

  const mockFirebaseAuthSignOutErrorMessage =
    'Error occurred while signing out.';
  const mockFirebaseAuthSignOut = jest.fn(async () => {
    await delay(AuthConstants.defaultDelayInMilliseconds);
    throw new Error(mockFirebaseAuthSignOutErrorMessage);
  });
  FirebaseStub.auth().signOut = mockFirebaseAuthSignOut;

  // eslint-disable-next-line no-unused-vars
  const mockToastError = jest.fn((content, options) => {});
  toast.error = mockToastError;

  const deleteAccountButtonText = /Delete Account/i;
  const areYouSureButtonText = /Are you sure?/i;
  const deleteAccountButton = screen.getByRole('button', {
    name: deleteAccountButtonText,
  });
  const waitForDeleteAccountButtonTextToChangeTo = async (text) => {
    await waitFor(() => expect(deleteAccountButton).toHaveTextContent(text), {
      timeout: 30000,
    });
  };

  return {
    deleteAccountButton,
    areYouSureButtonText,
    deleteAccountButtonText,
    waitForDeleteAccountButtonTextToChangeTo,
    mockFirebaseCurrentUserReauthenticateWithPopup,
    mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage,
    mockFirebaseDeleteUserCloudFunction,
    mockFirebaseCurrentUserDelete,
    mockFirebaseAuthSignOut,
    mockFirebaseAuthSignOutErrorMessage,
    mockToastError,
  };
}

test('prompts for confirmation', async () => {
  const {
    deleteAccountButton,
    areYouSureButtonText,
    waitForDeleteAccountButtonTextToChangeTo,
    mockFirebaseDeleteUserCloudFunction,
    mockFirebaseCurrentUserDelete,
    mockFirebaseAuthSignOut,
    mockToastError,
  } = await setup(false, false);

  fireEvent.click(deleteAccountButton);

  await expect(
    waitForDeleteAccountButtonTextToChangeTo(areYouSureButtonText),
  ).resolves.toBeUndefined();
  expect(mockFirebaseDeleteUserCloudFunction).not.toHaveBeenCalled();
  expect(mockFirebaseCurrentUserDelete).not.toHaveBeenCalled();
  expect(mockFirebaseAuthSignOut).not.toHaveBeenCalled();
  expect(mockNavigateFunction).not.toHaveBeenCalled();
  expect(mockToastError).not.toHaveBeenCalled();
});

test('calls Firebase delete user cloud function', async () => {
  const {
    deleteAccountButton,
    deleteAccountButtonText,
    mockFirebaseDeleteUserCloudFunction,
    waitForDeleteAccountButtonTextToChangeTo,
  } = await setup(false, false);

  fireEvent.click(deleteAccountButton);
  fireEvent.click(deleteAccountButton);

  await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

  await waitFor(() =>
    expect(mockFirebaseDeleteUserCloudFunction).toHaveBeenCalledTimes(1),
  );
});

test('calls Firebase current user delete', async () => {
  const {
    deleteAccountButton,
    deleteAccountButtonText,
    mockFirebaseCurrentUserDelete,
    waitForDeleteAccountButtonTextToChangeTo,
  } = await setup(false, false);

  fireEvent.click(deleteAccountButton);
  fireEvent.click(deleteAccountButton);

  await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

  await waitFor(() =>
    expect(mockFirebaseCurrentUserDelete).toHaveBeenCalledTimes(1),
  );
});

test('calls Firebase auth sign out', async () => {
  const {
    deleteAccountButton,
    deleteAccountButtonText,
    mockFirebaseAuthSignOut,
    waitForDeleteAccountButtonTextToChangeTo,
  } = await setup(false, false);

  fireEvent.click(deleteAccountButton);
  fireEvent.click(deleteAccountButton);

  await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

  await waitFor(() => expect(mockFirebaseAuthSignOut).toHaveBeenCalledTimes(1));
});

describe('if an error occurs while signing out the current user', () => {
  test('does not navigate away', async () => {
    const {
      deleteAccountButton,
      deleteAccountButtonText,
      waitForDeleteAccountButtonTextToChangeTo,
    } = await setup(false, false);

    fireEvent.click(deleteAccountButton);
    fireEvent.click(deleteAccountButton);

    await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

    expect(mockNavigateFunction).not.toHaveBeenCalled();
  });

  test('displays error notifications', async () => {
    const {
      deleteAccountButton,
      deleteAccountButtonText,
      mockFirebaseAuthSignOutErrorMessage,
      waitForDeleteAccountButtonTextToChangeTo,
      mockToastError,
    } = await setup(false, false);

    fireEvent.click(deleteAccountButton);
    fireEvent.click(deleteAccountButton);

    await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

    expect(mockToastError).toHaveBeenCalledTimes(2);
    expect(mockToastError).toHaveBeenNthCalledWith(
      1,
      mockFirebaseAuthSignOutErrorMessage,
    );
    expect(mockToastError).toHaveBeenNthCalledWith(
      2,
      'An error occurred deleting your account.',
    );
  });
});

describe('if the current user is signed in with Google', () => {
  test('reauthenticates the user', async () => {
    const googleAuthProvider = new FirebaseStub.auth.GoogleAuthProvider();
    const {
      deleteAccountButton,
      deleteAccountButtonText,
      mockFirebaseCurrentUserReauthenticateWithPopup,
      waitForDeleteAccountButtonTextToChangeTo,
    } = await setup(true, false);

    fireEvent.click(deleteAccountButton);
    fireEvent.click(deleteAccountButton);

    await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

    expect(
      mockFirebaseCurrentUserReauthenticateWithPopup,
    ).toHaveBeenCalledTimes(1);
    expect(mockFirebaseCurrentUserReauthenticateWithPopup).toHaveBeenCalledWith(
      googleAuthProvider,
    );
  });

  describe('and reauthentication fails', () => {
    test('does not proceed further', async () => {
      const {
        deleteAccountButton,
        deleteAccountButtonText,
        waitForDeleteAccountButtonTextToChangeTo,
        mockFirebaseDeleteUserCloudFunction,
        mockFirebaseCurrentUserDelete,
        mockFirebaseAuthSignOut,
      } = await setup(true, true);

      fireEvent.click(deleteAccountButton);
      fireEvent.click(deleteAccountButton);

      await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

      expect(mockFirebaseDeleteUserCloudFunction).not.toHaveBeenCalled();
      expect(mockFirebaseCurrentUserDelete).not.toHaveBeenCalled();
      expect(mockFirebaseAuthSignOut).not.toHaveBeenCalled();
      expect(mockNavigateFunction).not.toHaveBeenCalled();
    });

    test('displays error notifications', async () => {
      const {
        deleteAccountButton,
        deleteAccountButtonText,
        waitForDeleteAccountButtonTextToChangeTo,
        mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage,
        mockToastError,
      } = await setup(true, true);

      fireEvent.click(deleteAccountButton);
      fireEvent.click(deleteAccountButton);

      await waitForDeleteAccountButtonTextToChangeTo(deleteAccountButtonText);

      expect(mockToastError).toHaveBeenCalledTimes(2);
      expect(mockToastError).toHaveBeenNthCalledWith(
        1,
        mockFirebaseCurrentUserReauthenticateWithPopupErrorMessage,
      );
      expect(mockToastError).toHaveBeenNthCalledWith(
        2,
        'An error occurred deleting your account.',
      );
    });
  });
});
