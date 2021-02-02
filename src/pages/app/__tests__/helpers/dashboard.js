import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import fetchMock from 'jest-fetch-mock';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import '../../../../i18n/index';
import '../../../../utils/dayjs';
import { dataTestId as loadingScreenTestId } from '../../../../components/router/LoadingScreen';
import { unsplashPhotoRequestUrl, delay } from '../../../../utils/index';
import { SettingsProvider } from '../../../../contexts/SettingsContext';
import { ModalProvider } from '../../../../contexts/ModalContext';
import { UserProvider } from '../../../../contexts/UserContext';
import { DatabaseProvider } from '../../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../../contexts/ResumeContext';
import { StorageProvider } from '../../../../contexts/StorageContext';
import Wrapper from '../../../../components/shared/Wrapper';
import Dashboard from '../../dashboard';

const waitForResumeToBeRenderedInPreview = async (resumeName) => {
  await screen.findByText(resumeName);
};

const waitForResumeToDisappearFromPreview = async (resumeName) => {
  await waitFor(() =>
    screen.queryByText(resumeName) ? Promise.reject() : Promise.resolve(),
  );
};

const expectResumeToBeRenderedInPreview = async (resumeName) => {
  await waitFor(() => {
    expect(screen.getByText(resumeName)).toBeInTheDocument();
  });
};

const waitForModalWindowToHaveBeenClosed = async () => {
  await waitFor(() =>
    screen.queryByRole('textbox', { name: /name/i })
      ? Promise.reject()
      : Promise.resolve(),
  );
};

const dismissNotification = (notification) => {
  fireEvent.click(notification);
};

const findAndDismissNotification = async () => {
  const notification = await screen.findByRole('alert');
  dismissNotification(notification);
};

const expectLoadingScreenToBeRendered = () => {
  expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();
};

const waitForLoadingScreenToDisappearFn = async () => {
  await waitForElementToBeRemoved(() =>
    screen.getByTestId(loadingScreenTestId),
  );
};

const unsplashPhotoResponseUrl = 'https://test-url-123456789.com';

const setupFetchMockFn = () => {
  fetchMock.resetMocks();

  fetchMock.mockImplementationOnce(async (input) => {
    await delay(100);

    if (input === unsplashPhotoRequestUrl) {
      return {
        url: unsplashPhotoResponseUrl,
      };
    }

    throw new Error('Unsupported input.');
  });
};

// eslint-disable-next-line no-underscore-dangle
async function _setup(user, waitForLoadingScreenToDisappear, setupFetchMock) {
  if (setupFetchMock) {
    setupFetchMockFn();
  }

  FirebaseStub.database().initializeData();

  const userResumes = (
    await FirebaseStub.database()
      .ref(DatabaseConstants.resumesPath)
      .orderByChild('user')
      .equalTo(user.uid)
      .once('value')
  ).val();

  FirebaseStub.auth().signInAnonymously();

  render(
    <SettingsProvider>
      <ModalProvider>
        <UserProvider>
          <DatabaseProvider>
            <ResumeProvider>
              <StorageProvider>
                <Wrapper>
                  <Dashboard user={user} />
                </Wrapper>
              </StorageProvider>
            </ResumeProvider>
          </DatabaseProvider>
        </UserProvider>
      </ModalProvider>
    </SettingsProvider>,
  );

  if (waitForLoadingScreenToDisappear) {
    await waitForLoadingScreenToDisappearFn();
  }

  return userResumes;
}

async function setup(user) {
  const userResumes = await _setup(user, false, false);
  return userResumes;
}

async function setupAndWaitForLoadingScreenToDisappear(user) {
  const userResumes = await _setup(user, true, false);
  return userResumes;
}

async function setupWithFetchMockAndWaitForLoadingScreenToDisappear(user) {
  const userResumes = await _setup(user, true, true);
  return userResumes;
}

export default setup;

export {
  setupAndWaitForLoadingScreenToDisappear,
  setupWithFetchMockAndWaitForLoadingScreenToDisappear,
  waitForResumeToBeRenderedInPreview,
  waitForResumeToDisappearFromPreview,
  expectResumeToBeRenderedInPreview,
  waitForModalWindowToHaveBeenClosed,
  dismissNotification,
  findAndDismissNotification,
  expectLoadingScreenToBeRendered,
  waitForLoadingScreenToDisappearFn as waitForLoadingScreenToDisappear,
  unsplashPhotoResponseUrl,
};
