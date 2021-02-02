import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { dataTestId as loadingScreenTestId } from '../../../../components/router/LoadingScreen';
import { SettingsProvider } from '../../../../contexts/SettingsContext';
import { ModalProvider } from '../../../../contexts/ModalContext';
import { UserProvider } from '../../../../contexts/UserContext';
import {
  DatabaseProvider,
  DebounceWaitTime,
} from '../../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../../contexts/ResumeContext';
import { StorageProvider } from '../../../../contexts/StorageContext';
import Wrapper from '../../../../components/shared/Wrapper';
import Builder from '../../builder';

const waitForDatabaseUpdateToHaveCompletedFn = async (
  mockDatabaseUpdateFunction,
) => {
  await waitFor(() => mockDatabaseUpdateFunction.mock.calls[0][0], {
    timeout: DebounceWaitTime,
  });
  await waitFor(() => mockDatabaseUpdateFunction.mock.results[0].value);
};

const expectDatabaseUpdateToHaveCompleted = async (
  mockDatabaseUpdateFunction,
) => {
  await waitFor(
    () => expect(mockDatabaseUpdateFunction).toHaveBeenCalledTimes(1),
    {
      timeout: DebounceWaitTime,
    },
  );
  await waitFor(() =>
    expect(
      mockDatabaseUpdateFunction.mock.results[0].value,
    ).resolves.toBeUndefined(),
  );
};

// eslint-disable-next-line no-underscore-dangle
async function _setup(
  resumeId,
  waitForLoadingScreenToDisappear,
  waitForDatabaseUpdateToHaveCompleted,
) {
  FirebaseStub.database().initializeData();

  const resume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();

  const mockDatabaseUpdateFunction = jest.spyOn(
    FirebaseStub.database().ref(`${DatabaseConstants.resumesPath}/${resumeId}`),
    'update',
  );

  FirebaseStub.auth().signInAnonymously();

  render(
    <SettingsProvider>
      <ModalProvider>
        <UserProvider>
          <DatabaseProvider>
            <ResumeProvider>
              <StorageProvider>
                <Wrapper>
                  <Builder id={resumeId} />
                </Wrapper>
              </StorageProvider>
            </ResumeProvider>
          </DatabaseProvider>
        </UserProvider>
      </ModalProvider>
    </SettingsProvider>,
  );

  if (waitForLoadingScreenToDisappear) {
    await waitForElementToBeRemoved(() =>
      screen.getByTestId(loadingScreenTestId),
    );
  }

  if (waitForDatabaseUpdateToHaveCompleted) {
    await waitForDatabaseUpdateToHaveCompletedFn(mockDatabaseUpdateFunction);
  }

  mockDatabaseUpdateFunction.mockClear();

  return { resume, mockDatabaseUpdateFunction };
}

async function setup(resumeId) {
  const returnValue = await _setup(resumeId, false, false);
  return returnValue;
}

async function setupAndWait(
  resumeId,
  waitForLoadingScreenToDisappear,
  waitForDatabaseUpdateToHaveCompleted,
) {
  const returnValue = await _setup(
    resumeId,
    waitForLoadingScreenToDisappear,
    waitForDatabaseUpdateToHaveCompleted,
  );
  return returnValue;
}

export default setup;

export {
  setupAndWait,
  waitForDatabaseUpdateToHaveCompletedFn as waitForDatabaseUpdateToHaveCompleted,
  expectDatabaseUpdateToHaveCompleted,
};
