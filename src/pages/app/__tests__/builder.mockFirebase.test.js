import React from 'react';
import { render, cleanup } from '@testing-library/react';

import firebase, {
  __init as firebaseMockInit,
  __useDemoResume as firebaseMockUseDemoResume,
  __getResumeId as firebaseMockGetResumeId,
} from 'gatsby-plugin-firebase';

import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';

import Builder from '../builder';

beforeEach(() => {
  firebaseMockInit();
});

afterEach(cleanup);

it('renders correctly', async () => {
  firebaseMockUseDemoResume(true);
  const resumeId = firebaseMockGetResumeId();

  const container = render(
    <UserProvider>
      <DatabaseProvider>
        <ResumeProvider>
          <StorageProvider>
            <Builder id={resumeId} />
          </StorageProvider>
        </ResumeProvider>
      </DatabaseProvider>
    </UserProvider>,
  );

  await firebase.auth().signInAnonymously();

  expect(container).toBeTruthy();
  //expect(container).toBeInTheDocument();
});
