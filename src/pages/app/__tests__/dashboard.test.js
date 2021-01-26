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
      await waitForElementToBeRemoved(() =>
        screen.getByTestId(loadingScreenTestId),
      );
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
      fetch.resetMocks();

      fetch.mockImplementationOnce(async (input) => {
        await delay(100);

        if (input === unsplashPhotoRequestUrl) {
          return {
            url: unsplashPhotoResponseUrl,
          };
        }

        throw new Error('Unsupported input.');
      });
    };

    const waitForModalWindowToHaveBeenClosed = async () => {
      await waitFor(() =>
        screen.queryByRole('textbox', { name: /name/i })
          ? Promise.reject()
          : Promise.resolve(),
      );
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
        fireEvent.click(notification);
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
        expect(
          screen.getByRole('button', {
            name: /loading/i,
          }),
        ).toBeInTheDocument();
        await waitFor(() =>
          expect(
            screen.queryByRole('button', {
              name: /loading/i,
            }),
          ).toBeNull(),
        );

        await waitForModalWindowToHaveBeenClosed();
        await waitForResumeToBeRenderedInPreview(resumeName);
      });

      it('closes modal window', async () => {
        await waitFor(() =>
          expect(screen.queryByRole('textbox', { name: /name/i })).toBeNull(),
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

    beforeEach(async () => {
      await setup();

      [resumeToDelete, undeletedResume] = Object.values(userResumes);
      resumeToDeleteId = resumeToDelete.id;

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
      await expectDatabaseRemoveToHaveCompleted();

      await waitFor(() =>
        expect(screen.queryByText(resumeToDelete.name)).toBeNull(),
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
      fireEvent.click(notification);

      await waitForDatabaseRemoveToHaveCompleted();
    });

    it('closes menu', async () => {
      const menuItems = screen.queryAllByRole('menuitem');
      expect(menuItems).toHaveLength(0);

      await waitForDatabaseRemoveToHaveCompleted();
    });
  });

  describe('while loading', () => {
    beforeEach(async () => {
      await setup(false);
    });

    it('renders loading screen', async () => {
      expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();

      await waitForElementToBeRemoved(() =>
        screen.getByTestId(loadingScreenTestId),
      );

      await waitForResumeToBeRenderedInPreview(
        Object.values(userResumes)[0].name,
      );
      await waitForResumeToBeRenderedInPreview(
        Object.values(userResumes)[1].name,
      );
    });
  });
});
