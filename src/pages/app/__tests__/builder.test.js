jest.mock('../../../contexts/DatabaseContext');
jest.mock('../../../contexts/UserContext');
jest.mock('../../../contexts/StorageContext');

import React from 'react';
import { render, cleanup } from '@testing-library/react';

//import DatabaseContext from '../../../contexts/DatabaseContext';
import Builder from '../builder';

afterEach(cleanup);

it('renders correctly', () => {
  const resumeId = 'ab1c2d';
  //const resumes = [{ id: resumeId }];
  //DatabaseContext.Provider.__resumes = resumes;

  const { container } = render(<Builder id={resumeId} />);

  expect(container).toBeTruthy();
  expect(container).toBeInTheDocument();
});
