jest.mock('../../../contexts/UserContext');
jest.mock('../../../contexts/DatabaseContext');
jest.mock('../../../contexts/ResumeContext');
jest.mock('../../../contexts/StorageContext');

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
  //const resumes = [{ id: resumeId }];
  // The call below does not seem to work, therefore the "resumes" array initial value is currently set directly in the mock.
  //DatabaseProvider.__resumes = resumes;

  const container = render(
    <DatabaseProvider>
      <Builder id={resumeId} />
    </DatabaseProvider>,
  );

  expect(container).toBeTruthy();
  //expect(container).toBeInTheDocument();
});
