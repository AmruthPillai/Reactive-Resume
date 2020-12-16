import React from 'react';
import { act, render, cleanup } from '@testing-library/react';

import firebaseMock from 'gatsby-plugin-firebase';

import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';

import Builder from '../builder';

beforeEach(() => {
  firebaseMock.auth().__init();
  firebaseMock.database().__init();
});

afterEach(cleanup);

it('renders correctly', async () => {
  firebaseMock.database().__useDemoResume(true);
  const resume = firebaseMock.database().__getResume();

  const element = (
    <UserProvider>
      <DatabaseProvider>
        <ResumeProvider>
          <StorageProvider>
            <Builder id={resume.id} />
          </StorageProvider>
        </ResumeProvider>
      </DatabaseProvider>
    </UserProvider>
  );
  let container = null;

  act(() => {
    container = render(element);
  });

  await firebaseMock.auth().signInAnonymously();

  expect(container).toBeTruthy();
});
