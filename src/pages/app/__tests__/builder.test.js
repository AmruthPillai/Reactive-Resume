import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';

import firebaseMock from 'gatsby-plugin-firebase';

import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Builder from '../builder';

let resume = null;

beforeEach(() => {
  firebaseMock.auth().__init();
  firebaseMock.database().__init();
});

afterEach(cleanup);

describe('builder', () => {
  describe('with demo resume', () => {
    beforeEach(async () => {
      firebaseMock.database().__useDemoResume(true);
      resume = firebaseMock.database().__getResume();

      render(
        <UserProvider>
          <DatabaseProvider>
            <ResumeProvider>
              <StorageProvider>
                <Builder id={resume.id} />
              </StorageProvider>
            </ResumeProvider>
          </DatabaseProvider>
        </UserProvider>,
      );

      await act(async () => {
        await firebaseMock.auth().signInAnonymously();
      });
    });

    it('renders first and last name', async () => {
      expect(
        screen.getByLabelText(new RegExp('first name', 'i')),
      ).toHaveDisplayValue(resume.profile.firstName);
      expect(
        screen.getByLabelText(new RegExp('last name', 'i')),
      ).toHaveDisplayValue(resume.profile.lastName);
      expect(
        screen.getAllByText(new RegExp(resume.profile.firstName, 'i')).length,
      ).toBeTruthy();
      expect(
        screen.getAllByText(new RegExp(resume.profile.lastName, 'i')).length,
      ).toBeTruthy();
    });
  });

  describe('with empty resume', () => {
    beforeEach(async () => {
      firebaseMock.database().__useDemoResume(false);
      resume = firebaseMock.database().__getResume();

      render(
        <UserProvider>
          <DatabaseProvider>
            <ResumeProvider>
              <StorageProvider>
                <Builder id={resume.id} />
              </StorageProvider>
            </ResumeProvider>
          </DatabaseProvider>
        </UserProvider>,
      );

      await act(async () => {
        await firebaseMock.auth().signInAnonymously();
      });
    });

    it('renders empty first and last name', async () => {
      expect(
        screen.getByLabelText(new RegExp('first name', 'i')),
      ).not.toHaveDisplayValue();
      expect(
        screen.getByLabelText(new RegExp('last name', 'i')),
      ).not.toHaveDisplayValue();
    });
  });
});
