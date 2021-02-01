import {
  fireEvent,
  getByText,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { createResumeButtonDataTestId } from '../../../components/dashboard/CreateResume';
import {
  waitForResumeToBeRenderedInPreview,
  expectResumeToBeRenderedInPreview,
  waitForModalWindowToHaveBeenClosed,
  dismissNotification,
  unsplashPhotoResponseUrl,
  setupWithFetchMockAndWaitForLoadingScreenToDisappear,
} from './helpers/dashboard';

const tooShortResumeName = 'CV 1';
const validResumeName = 'Resume for SW development roles';

async function setup() {
  const user = DatabaseConstants.user1;
  await setupWithFetchMockAndWaitForLoadingScreenToDisappear(user);

  const dashboardCreateResumeButton = await screen.findByTestId(
    createResumeButtonDataTestId,
  );
  fireEvent.click(dashboardCreateResumeButton);

  const nameTextBox = screen.getByRole('textbox', { name: /name/i });
  return { user, nameTextBox };
}

async function setupAndSubmit(resumeName) {
  const { user, nameTextBox } = await setup();

  fireEvent.change(nameTextBox, {
    target: { value: resumeName },
  });

  const modalCreateResumeButton = screen.getByRole('button', {
    name: /create resume/i,
  });
  fireEvent.click(modalCreateResumeButton);

  return { user };
}

describe('with invalid name', () => {
  it('displays validation error', async () => {
    const { nameTextBox } = await setup();

    fireEvent.change(nameTextBox, { target: { value: tooShortResumeName } });
    fireEvent.blur(nameTextBox);

    await waitFor(() =>
      expect(
        screen.getByText(/Please enter at least 5 characters/i),
      ).toBeInTheDocument(),
    );
  });

  it('displays notification', async () => {
    await setupAndSubmit(tooShortResumeName);

    const notification = await screen.findByRole('alert');
    expect(
      getByText(
        notification,
        /You might need to fill up all the required fields/i,
      ),
    ).toBeInTheDocument();
    dismissNotification(notification);
  });
});

describe('with valid name', () => {
  it('renders loading message', async () => {
    await setupAndSubmit(validResumeName);

    await waitFor(() =>
      expect(
        screen.getByRole('button', {
          name: /loading/i,
        }),
      ).toBeInTheDocument(),
    );
    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', {
        name: /loading/i,
      }),
    );

    await waitForModalWindowToHaveBeenClosed();
    await waitForResumeToBeRenderedInPreview(validResumeName);
  });

  it('closes modal window', async () => {
    await setupAndSubmit(validResumeName);

    await waitFor(() =>
      expect(waitForModalWindowToHaveBeenClosed()).resolves.toBeUndefined(),
    );

    await waitForResumeToBeRenderedInPreview(validResumeName);
  });

  it('renders created resume in preview', async () => {
    await setupAndSubmit(validResumeName);

    await waitForModalWindowToHaveBeenClosed();

    await waitFor(() =>
      expect(
        expectResumeToBeRenderedInPreview(validResumeName),
      ).resolves.toBeUndefined(),
    );
  });

  it('adds resume in initial state to database', async () => {
    const now = new Date().getTime();
    const { user } = await setupAndSubmit(validResumeName);

    await waitForModalWindowToHaveBeenClosed();
    await waitForResumeToBeRenderedInPreview(validResumeName);

    const actualUserResumes = (
      await FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(user.uid)
        .once('value')
    ).val();
    expect(Object.values(actualUserResumes)).toHaveLength(3);

    const actualUserResumesFiltered = Object.values(actualUserResumes).filter(
      (resume) => resume.name === validResumeName,
    );
    expect(actualUserResumesFiltered).toHaveLength(1);
    const createdResume = actualUserResumesFiltered[0];
    expect(createdResume.id).toBeTruthy();
    expect(createdResume.preview).toBeTruthy();
    expect(createdResume.preview).toEqual(unsplashPhotoResponseUrl);
    expect(createdResume.createdAt).toBeTruthy();
    expect(createdResume.createdAt).toBeGreaterThanOrEqual(now);
    expect(createdResume.createdAt).toEqual(createdResume.updatedAt);
  });
});
