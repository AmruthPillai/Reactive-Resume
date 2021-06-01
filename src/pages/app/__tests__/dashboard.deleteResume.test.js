import {
  fireEvent,
  getByText,
  queryByText,
  screen,
  waitFor,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import {
  dismissNotification,
  expectResumeToBeRenderedInPreview,
  findAndDismissNotification,
  setupAndWait,
  waitForResumeToDisappearFromPreview,
} from './helpers/dashboard';
import { menuToggleDataTestIdPrefix as resumePreviewMenuToggleDataTestIdPrefix } from '../../../components/dashboard/ResumePreview';

const waitForDatabaseRemoveToHaveCompleted = async (
  mockDatabaseRemoveFunction,
) => {
  await waitFor(() => mockDatabaseRemoveFunction.mock.results[0].value);
};

const expectDatabaseRemoveToHaveCompleted = async (
  mockDatabaseRemoveFunction,
) => {
  await waitFor(() =>
    expect(mockDatabaseRemoveFunction).toHaveBeenCalledTimes(1),
  );
  await waitFor(() =>
    expect(
      mockDatabaseRemoveFunction.mock.results[0].value,
    ).resolves.toBeUndefined(),
  );
};

async function setup() {
  const userResumes = await setupAndWait(DatabaseConstants.user1, true);

  const [resumeToDelete] = Object.values(userResumes).filter(
    (resume) => resume.id === DatabaseConstants.demoStateResume1Id,
  );
  const resumeToDeleteId = resumeToDelete.id;
  const [undeletedResume] = Object.values(userResumes).filter(
    (resume) => resume.id === DatabaseConstants.initialStateResume1Id,
  );

  const mockDatabaseRemoveFunction = jest.spyOn(
    FirebaseStub.database().ref(
      `${DatabaseConstants.resumesPath}/${resumeToDeleteId}`,
    ),
    'remove',
  );

  const resumeToDeleteMenuToggle = await screen.findByTestId(
    `${resumePreviewMenuToggleDataTestIdPrefix}${resumeToDeleteId}`,
  );
  fireEvent.click(resumeToDeleteMenuToggle);

  const menuItems = screen.getAllByRole('menuitem');
  let deleteMenuItem = null;
  for (let index = 0; index < menuItems.length; index++) {
    if (queryByText(menuItems[index], /delete/i)) {
      deleteMenuItem = menuItems[index];
      break;
    }
  }
  fireEvent.click(deleteMenuItem);

  return { resumeToDelete, undeletedResume, mockDatabaseRemoveFunction };
}

it('removes resume from database and preview', async () => {
  const { resumeToDelete, undeletedResume, mockDatabaseRemoveFunction } =
    await setup();

  await findAndDismissNotification();

  await expectDatabaseRemoveToHaveCompleted(mockDatabaseRemoveFunction);

  await waitFor(() =>
    expect(
      waitForResumeToDisappearFromPreview(resumeToDelete.name),
    ).resolves.toBeUndefined(),
  );
  await expectResumeToBeRenderedInPreview(undeletedResume.name);
});

it('displays notification', async () => {
  const { resumeToDelete, mockDatabaseRemoveFunction } = await setup();

  const notification = await screen.findByRole('alert');
  expect(
    getByText(
      notification,
      new RegExp(`${resumeToDelete.name} was deleted successfully`, 'i'),
    ),
  ).toBeInTheDocument();
  dismissNotification(notification);

  await waitForDatabaseRemoveToHaveCompleted(mockDatabaseRemoveFunction);
  await waitForResumeToDisappearFromPreview(resumeToDelete.name);
});

it('closes menu', async () => {
  const { resumeToDelete, mockDatabaseRemoveFunction } = await setup();

  const menuItems = screen.queryAllByRole('menuitem');
  expect(menuItems).toHaveLength(0);

  await findAndDismissNotification();
  await waitForDatabaseRemoveToHaveCompleted(mockDatabaseRemoveFunction);
  await waitForResumeToDisappearFromPreview(resumeToDelete.name);
});
