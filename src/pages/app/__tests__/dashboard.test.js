import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

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

  beforeEach(async () => {
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

    await waitFor(() => screen.getByText('Create Resume'));
  });

  describe('renders', () => {
    it('document title', async () => {
      expect(document.title).toEqual('Dashboard | Reactive Resume');
    });

    it('create resume', async () => {
      expect(screen.getByText('Create Resume')).toBeInTheDocument();
    });

    it('preview of user resumes', async () => {
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
});
