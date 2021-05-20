import {
  fireEvent,
  getByText,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { DatabaseConstants } from 'gatsby-plugin-firebase';

import { dataTestId as loadingScreenTestId } from '../../../components/router/LoadingScreen';

import setup, {
  setupAndWait,
  waitForDatabaseUpdateToHaveCompleted,
} from './helpers/builder';

const testTimeoutInMilliseconds = 10000;
jest.setTimeout(testTimeoutInMilliseconds);

test('renders first and last name', async () => {
  const { resume } = await setupAndWait(
    DatabaseConstants.demoStateResume1Id,
    false,
    true,
    true,
  );

  expect(
    screen.getByRole('textbox', { name: /first name/i }),
  ).toHaveDisplayValue(resume.profile.firstName);
  expect(
    screen.getByRole('textbox', { name: /last name/i }),
  ).toHaveDisplayValue(resume.profile.lastName);
  expect(
    screen.getAllByText(new RegExp(resume.profile.firstName, 'i')).length,
  ).toBeTruthy();
  expect(
    screen.getAllByText(new RegExp(resume.profile.lastName, 'i')).length,
  ).toBeTruthy();
});

test('renders loading screen', async () => {
  const { mockDatabaseUpdateFunction } = await setup(
    DatabaseConstants.demoStateResume1Id,
  );

  expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();

  await waitForElementToBeRemoved(() =>
    screen.getByTestId(loadingScreenTestId),
  );

  await waitForDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
});

test('if resume is in initial state, renders load demo data notification', async () => {
  await setup(DatabaseConstants.initialStateResume1Id);

  const notification = await screen.findByRole('alert');
  expect(
    getByText(notification, /Not sure where to begin\? Try loading demo data/i),
  ).toBeInTheDocument();
  fireEvent.click(notification);
});
