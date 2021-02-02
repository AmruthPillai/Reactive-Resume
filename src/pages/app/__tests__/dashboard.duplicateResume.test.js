import {
  fireEvent,
  queryByText,
  screen,
  waitFor,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { menuToggleDataTestIdPrefix as resumePreviewMenuToggleDataTestIdPrefix } from '../../../components/dashboard/ResumePreview';
import {
  setupWithFetchMockAndWait,
  waitForResumeToBeRenderedInPreview,
  expectResumeToBeRenderedInPreview,
  unsplashPhotoResponseUrl,
} from './helpers/dashboard';

async function setup() {
  const user = DatabaseConstants.user1;
  const userResumes = await setupWithFetchMockAndWait(user, true);

  const [resumeToDuplicate] = Object.values(userResumes).filter(
    (resume) => resume.id === DatabaseConstants.demoStateResume1Id,
  );
  const resumeToDuplicateId = resumeToDuplicate.id;
  const duplicateResumeName = `${resumeToDuplicate.name} Copy`;

  const resumeToDuplicateMenuToggle = await screen.findByTestId(
    `${resumePreviewMenuToggleDataTestIdPrefix}${resumeToDuplicateId}`,
  );
  fireEvent.click(resumeToDuplicateMenuToggle);

  const menuItems = screen.getAllByRole('menuitem');
  let duplicateMenuItem = null;
  for (let index = 0; index < menuItems.length; index++) {
    if (queryByText(menuItems[index], /duplicate/i)) {
      duplicateMenuItem = menuItems[index];
      break;
    }
  }
  fireEvent.click(duplicateMenuItem);

  return { user, resumeToDuplicate, duplicateResumeName };
}

it('renders duplicate resume in preview', async () => {
  const { duplicateResumeName } = await setup();

  await waitFor(() =>
    expect(
      expectResumeToBeRenderedInPreview(duplicateResumeName),
    ).resolves.toBeUndefined(),
  );
});

it('adds duplicate resume to database', async () => {
  const now = new Date().getTime();
  const { user, resumeToDuplicate, duplicateResumeName } = await setup();

  await waitForResumeToBeRenderedInPreview(duplicateResumeName);

  const actualUserResumes = (
    await FirebaseStub.database()
      .ref(DatabaseConstants.resumesPath)
      .orderByChild('user')
      .equalTo(user.uid)
      .once('value')
  ).val();
  expect(Object.values(actualUserResumes)).toHaveLength(3);

  const actualUserResumesFiltered = Object.values(actualUserResumes).filter(
    (resume) =>
      resume.name === duplicateResumeName && resume.id !== resumeToDuplicate.id,
  );
  expect(actualUserResumesFiltered).toHaveLength(1);
  const createdResume = actualUserResumesFiltered[0];
  expect(createdResume.id).toBeTruthy();
  expect(createdResume.preview).toBeTruthy();
  expect(createdResume.preview).toEqual(unsplashPhotoResponseUrl);
  expect(createdResume.createdAt).toBeTruthy();
  expect(createdResume.createdAt).toBeGreaterThanOrEqual(now);
  expect(createdResume.createdAt).toEqual(createdResume.updatedAt);
  const expectedResume = {
    ...resumeToDuplicate,
    id: createdResume.id,
    name: createdResume.name,
    preview: createdResume.preview,
    createdAt: createdResume.createdAt,
    updatedAt: createdResume.updatedAt,
  };
  expect(createdResume).toEqual(expectedResume);
});

it('closes menu', async () => {
  const { duplicateResumeName } = await setup();

  const menuItems = screen.queryAllByRole('menuitem');
  expect(menuItems).toHaveLength(0);

  await waitForResumeToBeRenderedInPreview(duplicateResumeName);
});
