import React from 'react';
import { act, render, screen } from '@testing-library/react';

import FirebaseStub from 'gatsby-plugin-firebase';

import '../../../i18n/index';
import { SettingsProvider } from '../../../contexts/SettingsContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Dashboard from '../dashboard';

beforeEach(() => {
  FirebaseStub.database().initializeData();
});

describe('Dashboard', () => {
  const resumesPath = FirebaseStub.database().resumesPath;
  let resumes = null;
  let user = FirebaseStub.database().anonymousUser;
  let container = null;

  beforeEach(async () => {
    resumes = (
      await FirebaseStub.database()
        .ref(resumesPath)
        .orderByChild('user')
        .equalTo(user.uid)
        .once('value')
    ).val();
    expect(resumes).toBeTruthy();
    expect(Object.keys(resumes).length).toEqual(2);

    container = render(
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
  });

  describe('renders', () => {
    it('create resume', async () => {
      expect(screen.getByText(new RegExp('Create Resume'))).toBeInTheDocument();
    });

    it('preview of user resumes', async () => {
      expect(
        screen.getByText(new RegExp(Object.values(resumes)[0].name)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(Object.values(resumes)[1].name)),
      ).toBeInTheDocument();
    });
  });
});
