import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';

import Builder from '../builder';

afterEach(cleanup);

it('renders correctly', () => {
  const resumeId = 'ab1c2d';

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

  expect(container).toBeTruthy();
  //expect(container).toBeInTheDocument();
});
