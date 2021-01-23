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
import { dataTestId as loadingScreenTestId } from '../../../components/router/LoadingScreen';
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

  const waitForResumeToBeRenderedInPreview = async (resume) => {
    await screen.findByText(resume.name);
  };

  const expectResumeToBeRenderedInPreview = async (resume) => {
    await waitFor(() => {
      expect(screen.getByText(resume.name)).toBeInTheDocument();
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
    });

    it('preview of user resumes', async () => {
      expect(Object.keys(userResumes)).toHaveLength(2);

      await expectResumeToBeRenderedInPreview(Object.values(userResumes)[0]);
      await expectResumeToBeRenderedInPreview(Object.values(userResumes)[1]);
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
      await expectResumeToBeRenderedInPreview(undeletedResume);
    });

    it('displays notification', async () => {
      const notification = await screen.findByRole('alert');
      expect(
        getByText(
          notification,
          new RegExp(`${resumeToDelete.name} was deleted successfully`, 'i'),
        ),
      ).toBeInTheDocument();

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

      await waitForResumeToBeRenderedInPreview(Object.values(userResumes)[0]);
      await waitForResumeToBeRenderedInPreview(Object.values(userResumes)[1]);
    });
  });
});
