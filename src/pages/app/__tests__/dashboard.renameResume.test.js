import {
  fireEvent,
  getByText,
  queryByText,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { menuToggleDataTestIdPrefix as resumePreviewMenuToggleDataTestIdPrefix } from '../../../components/dashboard/ResumePreview';
import {
  setupAndWait,
  waitForResumeToBeRenderedInPreview,
  expectResumeToBeRenderedInPreview,
  dismissNotification,
  waitForModalWindowToHaveBeenClosed,
} from './helpers/dashboard';

const tooShortResumeName = 'CV 2';
const validResumeName = 'Resume for SW development roles - renamed';

const waitForDatabaseUpdateToHaveCompleted = async (
  mockDatabaseUpdateFunction,
) => {
  await waitFor(() => mockDatabaseUpdateFunction.mock.calls[0][0]);
  await waitFor(() => mockDatabaseUpdateFunction.mock.results[0].value);
};

const expectDatabaseUpdateToHaveCompleted = async (
  mockDatabaseUpdateFunction,
) => {
  await waitFor(() =>
    expect(mockDatabaseUpdateFunction).toHaveBeenCalledTimes(1),
  );
  await waitFor(() =>
    expect(
      mockDatabaseUpdateFunction.mock.results[0].value,
    ).resolves.toBeUndefined(),
  );
};

async function setup() {
  const userResumes = await setupAndWait(DatabaseConstants.user1, true);

  const [resumeToRename] = Object.values(userResumes).filter(
    (resume) => resume.id === DatabaseConstants.demoStateResume1Id,
  );
  const resumeToRenameId = resumeToRename.id;

  const mockDatabaseUpdateFunction = jest.spyOn(
    FirebaseStub.database().ref(
      `${DatabaseConstants.resumesPath}/${resumeToRenameId}`,
    ),
    'update',
  );
  mockDatabaseUpdateFunction.mockClear();

  const resumeToRenameMenuToggle = await screen.findByTestId(
    `${resumePreviewMenuToggleDataTestIdPrefix}${resumeToRenameId}`,
  );
  fireEvent.click(resumeToRenameMenuToggle);

  const menuItems = screen.getAllByRole('menuitem');
  let renameMenuItem = null;
  for (let index = 0; index < menuItems.length; index++) {
    if (queryByText(menuItems[index], /rename/i)) {
      renameMenuItem = menuItems[index];
      break;
    }
  }
  fireEvent.click(renameMenuItem);

  const nameTextBox = screen.getByRole('textbox', { name: /name/i });

  return { resumeToRename, mockDatabaseUpdateFunction, nameTextBox };
}

async function setupAndSubmit(resumeNewName) {
  const {
    resumeToRename,
    mockDatabaseUpdateFunction,
    nameTextBox,
  } = await setup();

  fireEvent.change(nameTextBox, {
    target: { value: resumeNewName },
  });

  const modalEditResumeButton = screen.getByRole('button', {
    name: /edit resume/i,
  });
  fireEvent.click(modalEditResumeButton);

  return {
    renamedResume: resumeToRename,
    mockDatabaseUpdateFunction,
    nameTextBox,
  };
}

test('renders current name in modal window', async () => {
  const { resumeToRename, nameTextBox } = await setup();

  expect(nameTextBox).toHaveValue(resumeToRename.name);
});

describe('with invalid name', () => {
  test('displays validation error', async () => {
    const { nameTextBox } = await setup();

    fireEvent.change(nameTextBox, { target: { value: tooShortResumeName } });
    fireEvent.blur(nameTextBox);

    await waitFor(() =>
      expect(
        screen.getByText(/Please enter at least 5 characters/i),
      ).toBeInTheDocument(),
    );
  });

  test('displays notification', async () => {
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
  test('renders loading message', async () => {
    const { mockDatabaseUpdateFunction } = await setupAndSubmit(
      validResumeName,
    );

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
    await waitForDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
    await waitForResumeToBeRenderedInPreview(validResumeName);
  });

  test('closes modal window', async () => {
    const { mockDatabaseUpdateFunction } = await setupAndSubmit(
      validResumeName,
    );

    await waitFor(() =>
      expect(waitForModalWindowToHaveBeenClosed()).resolves.toBeUndefined(),
    );

    await waitForDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
    await waitForResumeToBeRenderedInPreview(validResumeName);
  });

  test('renders renamed resume in preview', async () => {
    const { mockDatabaseUpdateFunction } = await setupAndSubmit(
      validResumeName,
    );

    await waitForModalWindowToHaveBeenClosed();
    await waitForDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);

    await waitFor(() =>
      expect(
        expectResumeToBeRenderedInPreview(validResumeName),
      ).resolves.toBeUndefined(),
    );
  });

  test('updates database', async () => {
    const now = new Date().getTime();
    const { renamedResume, mockDatabaseUpdateFunction } = await setupAndSubmit(
      validResumeName,
    );
    const renamedResumeId = renamedResume.id;

    await waitForModalWindowToHaveBeenClosed();

    await expectDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
    const mockDatabaseUpdateFunctionCallArgument =
      mockDatabaseUpdateFunction.mock.calls[0][0];
    expect(mockDatabaseUpdateFunctionCallArgument.id).toBe(renamedResumeId);
    expect(mockDatabaseUpdateFunctionCallArgument.name).toBe(validResumeName);
    expect(
      mockDatabaseUpdateFunctionCallArgument.updatedAt,
    ).toBeGreaterThanOrEqual(now);

    await waitForResumeToBeRenderedInPreview(validResumeName);
  });
});
