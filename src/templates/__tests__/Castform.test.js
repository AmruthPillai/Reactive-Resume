import React from 'react';
import { render, screen } from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import '../../i18n/index';
import Castform from '../Castform';

const birthDateLabelMatcher = /Date of birth/i;

async function setup(resumeId) {
  FirebaseStub.database().initializeData();

  const resume = (
    await FirebaseStub.database()
      .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
      .once('value')
  ).val();

  return resume;
}

test('renders correctly', async () => {
  const resume = await setup(DatabaseConstants.initialStateResume1Id);

  const { container } = render(<Castform data={resume} />);

  expect(container).toBeTruthy();
  expect(container).toBeInTheDocument();
});

test('date of birth is not shown if not provided', async () => {
  const resume = await setup(DatabaseConstants.initialStateResume1Id);

  render(<Castform data={resume} />);

  expect(screen.queryByText(birthDateLabelMatcher)).toBeNull();
});

test('date of birth is shown if provided', async () => {
  const resume = await setup(DatabaseConstants.initialStateResume1Id);

  const birthDate = new Date(1990, 0, 20);
  const birthDateFormatted = '20 January 1990';
  resume.profile.birthDate = birthDate;

  render(<Castform data={resume} />);

  expect(screen.getByText(birthDateLabelMatcher)).toBeTruthy();
  expect(screen.getByText(birthDateLabelMatcher)).toBeInTheDocument();
  expect(screen.getByText(birthDateFormatted)).toBeTruthy();
  expect(screen.getByText(birthDateFormatted)).toBeInTheDocument();
});
