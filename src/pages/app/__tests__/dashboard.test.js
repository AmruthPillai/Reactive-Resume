import React from 'react';
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import '../../../i18n/index';
import '../../../utils/dayjs';
import { SettingsProvider } from '../../../contexts/SettingsContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Dashboard from '../dashboard';

describe('Dashboard', () => {
  let resumes = null;
  const user = DatabaseConstants.user1;
  const loadingScreenTestId = 'loading-screen';

  async function setup(waitForLoadingScreenToDisappear = true) {
    FirebaseStub.database().initializeData();

    resumes = (
      await FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(user.uid)
        .once('value')
    ).val();

    render(
      <SettingsProvider>
        <ModalProvider>
          <UserProvider>
            <DatabaseProvider>
              <ResumeProvider>
                <StorageProvider>
                  <Dashboard user={user} />
                </StorageProvider>
              </ResumeProvider>
            </DatabaseProvider>
          </UserProvider>
        </ModalProvider>
      </SettingsProvider>,
    );

    await act(async () => {
      await FirebaseStub.auth().signInAnonymously();
    });

    if (waitForLoadingScreenToDisappear) {
      await waitForElementToBeRemoved(() =>
        screen.getByTestId(loadingScreenTestId),
      );
    }
  }

  describe('renders', () => {
    beforeEach(async () => {
      await setup();
    });

    it('document title', () => {
      expect(document.title).toEqual('Dashboard | Reactive Resume');
    });

    it('create resume', () => {
      expect(screen.getByText(/create resume/i)).toBeInTheDocument();
    });

    it('preview of user resumes', () => {
      expect(Object.keys(resumes)).toHaveLength(2);

      expect(Object.values(resumes)[0].user).toEqual(user.uid);
      expect(
        screen.getByText(Object.values(resumes)[0].name),
      ).toBeInTheDocument();
      expect(Object.values(resumes)[1].user).toEqual(user.uid);
      expect(
        screen.getByText(Object.values(resumes)[1].name),
      ).toBeInTheDocument();
    });
  });

  describe('while loading', () => {
    beforeEach(async () => {
      await setup(false);
    });

    it('renders loading screen', () => {
      expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();
    });
  });
});
