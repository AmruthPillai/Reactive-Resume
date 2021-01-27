import React from 'react';
import {
  fireEvent,
  getByText,
  queryByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import fetchMock from 'jest-fetch-mock';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import '../../../i18n/index';
import '../../../utils/dayjs';
import { unsplashPhotoRequestUrl, delay } from '../../../utils/index';
import { dataTestId as loadingScreenTestId } from '../../../components/router/LoadingScreen';
import { createResumeButtonDataTestId } from '../../../components/dashboard/CreateResume';
import { menuToggleDataTestIdPrefix as resumePreviewMenuToggleDataTestIdPrefix } from '../../../components/dashboard/ResumePreview';
import { SettingsProvider } from '../../../contexts/SettingsContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Wrapper from '../../../components/shared/Wrapper';
import Dashboard from '../dashboard';

describe('Dashboard', () => {
  let userResumes = null;
  const user = DatabaseConstants.user1;

  const waitForResumeToBeRenderedInPreview = async (resumeName) => {
    await screen.findByText(resumeName);
  };

  const expectResumeToBeRenderedInPreview = async (resumeName) => {
    await waitFor(() => {
      expect(screen.getByText(resumeName)).toBeInTheDocument();
    });
  };

  const waitForModalWindowToHaveBeenClosed = async () => {
    await waitForElementToBeRemoved(() =>
      screen.getByRole('textbox', { name: /name/i }),
    );
  };

  const dismissNotification = (notification) => {
    fireEvent.click(notification);
  };

  const findAndDismissNotification = async () => {
    const notification = await screen.findByRole('alert');
    dismissNotification(notification);
  };

  const fnWaitForLoadingScreenToDisappear = async () => {
    await waitForElementToBeRemoved(() =>
      screen.getByTestId(loadingScreenTestId),
    );
  };

  async function setup(waitForLoadingScreenToDisappear = true) {
    FirebaseStub.database().initializeData();

    userResumes = (
      await FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(user.uid)
        .once('value')
    ).val();

    FirebaseStub.auth().signInAnonymously();

    render(
      <SettingsProvider>
        <ModalProvider>
          <UserProvider>
            <DatabaseProvider>
              <ResumeProvider>
                <StorageProvider>
                  <Wrapper>
                    <Dashboard user={user} />
                  </Wrapper>
                </StorageProvider>
              </ResumeProvider>
            </DatabaseProvider>
          </UserProvider>
        </ModalProvider>
      </SettingsProvider>,
    );

    if (waitForLoadingScreenToDisappear) {
      await fnWaitForLoadingScreenToDisappear();
    }
  }

  describe('renders', () => {
    beforeEach(async () => {
      await setup();
    });

    it('document title', async () => {
      await waitFor(() => {
        expect(document.title).toEqual('Dashboard | Reactive Resume');
      });
    });

    it('create resume', async () => {
      await waitFor(() => {
        expect(screen.getByText(/create resume/i)).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(
          screen.getByTestId(createResumeButtonDataTestId),
        ).toBeInTheDocument();
      });
    });

    it('preview of user resumes', async () => {
      expect(Object.keys(userResumes)).toHaveLength(2);

      await expectResumeToBeRenderedInPreview(
        Object.values(userResumes)[0].name,
      );
      await expectResumeToBeRenderedInPreview(
        Object.values(userResumes)[1].name,
      );
    });
  });

  describe('when resume is created', () => {
    const unsplashPhotoResponseUrl = 'https://test-url-123456789.com';
    let nameTextBox = null;

    const setupFetchMock = () => {
      fetchMock.resetMocks();

      fetchMock.mockImplementationOnce(async (input) => {
        await delay(100);

        if (input === unsplashPhotoRequestUrl) {
          return {
            url: unsplashPhotoResponseUrl,
          };
        }

        throw new Error('Unsupported input.');
      });
    };

    beforeEach(async () => {
      setupFetchMock();

      await setup();

      const dashboardCreateResumeButton = await screen.findByTestId(
        createResumeButtonDataTestId,
      );
      fireEvent.click(dashboardCreateResumeButton);

      nameTextBox = screen.getByRole('textbox', { name: /name/i });
    });

    describe('with name shorter than 5 characters', () => {
      it('displays validation error and notification', async () => {
        fireEvent.change(nameTextBox, { target: { value: 'CV 1' } });

        fireEvent.focusOut(nameTextBox);

        await waitFor(() =>
          expect(
            screen.getByText(/Please enter at least 5 characters/i),
          ).toBeInTheDocument(),
        );

        const modalCreateResumeButton = screen.getByRole('button', {
          name: /create resume/i,
        });
        fireEvent.click(modalCreateResumeButton);

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
      const resumeName = 'Resume for SW development roles';
      let now = 0;

      beforeEach(() => {
        now = new Date().getTime();

        fireEvent.change(nameTextBox, {
          target: { value: resumeName },
        });

        const modalCreateResumeButton = screen.getByRole('button', {
          name: /create resume/i,
        });
        fireEvent.click(modalCreateResumeButton);
      });

      it('renders loading message', async () => {
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
        await waitForResumeToBeRenderedInPreview(resumeName);
      });

      it('closes modal window', async () => {
        await waitFor(() =>
          expect(waitForModalWindowToHaveBeenClosed()).resolves.toBeUndefined(),
        );

        await waitForResumeToBeRenderedInPreview(resumeName);
      });

      it('renders created resume in preview', async () => {
        await waitForModalWindowToHaveBeenClosed();

        await waitFor(() =>
          expect(
            expectResumeToBeRenderedInPreview(resumeName),
          ).resolves.toBeUndefined(),
        );
      });

      it('adds resume in initial state to database', async () => {
        await waitForModalWindowToHaveBeenClosed();
        await waitForResumeToBeRenderedInPreview(resumeName);

        const actualUserResumes = (
          await FirebaseStub.database()
            .ref(DatabaseConstants.resumesPath)
            .orderByChild('user')
            .equalTo(user.uid)
            .once('value')
        ).val();
        expect(Object.values(actualUserResumes)).toHaveLength(3);

        const actualUserResumesFiltered = Object.values(
          actualUserResumes,
        ).filter((resume) => resume.name === resumeName);
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
  });

  describe('when resume is deleted', () => {
    let mockDatabaseRemoveFunction = null;
    let resumeToDelete = null;
    let undeletedResume = null;
    let resumeToDeleteId = null;

    const waitForDatabaseRemoveToHaveCompleted = async () => {
      await waitFor(() => mockDatabaseRemoveFunction.mock.results[0].value);
    };

    const expectDatabaseRemoveToHaveCompleted = async () => {
      await waitFor(() =>
        expect(mockDatabaseRemoveFunction).toHaveBeenCalledTimes(1),
      );
      await waitFor(() =>
        expect(
          mockDatabaseRemoveFunction.mock.results[0].value,
        ).resolves.toBeUndefined(),
      );
    };

    const waitForResumeToDisappearFromPreview = async (resumeName) => {
      await waitFor(() =>
        screen.queryByText(resumeName) ? Promise.reject() : Promise.resolve(),
      );
    };

    beforeEach(async () => {
      await setup();

      [resumeToDelete] = Object.values(userResumes).filter(
        (resume) => resume.id === DatabaseConstants.demoStateResume1Id,
      );
      resumeToDeleteId = resumeToDelete.id;
      [undeletedResume] = Object.values(userResumes).filter(
        (resume) => resume.id === DatabaseConstants.initialStateResumeId,
      );

      mockDatabaseRemoveFunction = jest.spyOn(
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
    });

    it('removes it from database and preview', async () => {
      await findAndDismissNotification();

      await expectDatabaseRemoveToHaveCompleted();

      await waitFor(() =>
        expect(
          waitForResumeToDisappearFromPreview(resumeToDelete.name),
        ).resolves.toBeUndefined(),
      );
      await expectResumeToBeRenderedInPreview(undeletedResume.name);
    });

    it('displays notification', async () => {
      const notification = await screen.findByRole('alert');
      expect(
        getByText(
          notification,
          new RegExp(`${resumeToDelete.name} was deleted successfully`, 'i'),
        ),
      ).toBeInTheDocument();
      dismissNotification(notification);

      await waitForDatabaseRemoveToHaveCompleted();
      await waitForResumeToDisappearFromPreview(resumeToDelete.name);
    });

    it('closes menu', async () => {
      const menuItems = screen.queryAllByRole('menuitem');
      expect(menuItems).toHaveLength(0);

      await findAndDismissNotification();
      await waitForDatabaseRemoveToHaveCompleted();
      await waitForResumeToDisappearFromPreview(resumeToDelete.name);
    });
  });

  describe('when resume is renamed', () => {
    // const mockDatabaseUpdateFunction = null;
    let resumeToRename = null;
    let resumeToRenameId = null;
    let nameTextBox = null;

    /*
    const waitForDatabaseUpdateToHaveCompleted = async () => {
      await waitFor(() => mockDatabaseUpdateFunction.mock.calls[0][0]);
      await waitFor(() => mockDatabaseUpdateFunction.mock.results[0].value);
    };

    const expectDatabaseUpdateToHaveCompleted = async () => {
      await waitFor(() =>
        expect(mockDatabaseUpdateFunction).toHaveBeenCalledTimes(1),
      );
      await waitFor(() =>
        expect(
          mockDatabaseUpdateFunction.mock.results[0].value,
        ).resolves.toBeUndefined(),
      );
    };
    */

    beforeEach(async () => {
      await setup();

      [resumeToRename] = Object.values(userResumes).filter(
        (resume) => resume.id === DatabaseConstants.demoStateResume1Id,
      );
      resumeToRenameId = resumeToRename.id;

      /*
      mockDatabaseUpdateFunction = jest.spyOn(
        FirebaseStub.database().ref(
          `${DatabaseConstants.resumesPath}/${resumeToRenameId}`,
        ),
        'update',
      );
      */

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

      nameTextBox = screen.getByRole('textbox', { name: /name/i });
    });

    describe('with name shorter than 5 characters', () => {
      it('displays validation error and notification', async () => {
        fireEvent.change(nameTextBox, { target: { value: 'CV 2' } });

        fireEvent.focusOut(nameTextBox);

        await waitFor(() =>
          expect(
            screen.getByText(/Please enter at least 5 characters/i),
          ).toBeInTheDocument(),
        );

        const modalEditResumeButton = screen.getByRole('button', {
          name: /edit resume/i,
        });
        fireEvent.click(modalEditResumeButton);

        // const notification = await screen.findByRole('alert');
        const notification = await screen.findByText(
          /You might need to fill up all the required fields/i,
        );
        expect(
          getByText(
            notification,
            /You might need to fill up all the required fields/i,
          ),
        ).toBeInTheDocument();
        dismissNotification(notification);
      });
    });
  });

  describe('while loading', () => {
    beforeEach(async () => {
      await setup(false);
    });

    it('renders loading screen', async () => {
      expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();
      await fnWaitForLoadingScreenToDisappear();

      await waitForResumeToBeRenderedInPreview(
        Object.values(userResumes)[0].name,
      );
      await waitForResumeToBeRenderedInPreview(
        Object.values(userResumes)[1].name,
      );
    });
  });
});
