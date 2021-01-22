import React from 'react';
import {
  fireEvent,
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
import Dashboard from '../dashboard';

describe('Dashboard', () => {
  let resumes = null;
  const user = DatabaseConstants.user1;

  async function setup(waitForLoadingScreenToDisappear = true) {
    FirebaseStub.database().initializeData();

    resumes = (
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
                  <Dashboard user={user} />
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

    it('document title', () => {
      expect(document.title).toEqual('Dashboard | Reactive Resume');
    });

    it('create resume', () => {
      expect(screen.getByText(/create resume/i)).toBeInTheDocument();
    });

    it('preview of user resumes', () => {
      expect(Object.keys(resumes)).toHaveLength(2);

      expect(Object.values(resumes)[0].user).toEqual(user.uid);
      expect(
        screen.getByText(Object.values(resumes)[0].name),
      ).toBeInTheDocument();
      expect(Object.values(resumes)[1].user).toEqual(user.uid);
      expect(
        screen.getByText(Object.values(resumes)[1].name),
      ).toBeInTheDocument();
    });
  });

  describe('when resume is deleted', () => {
    let mockDatabaseRemoveFunction = null;
    let resumeToDelete = null;
    let undeletedResume = null;
    let resumeToDeleteId = null;

    beforeEach(async () => {
      await setup();

      [resumeToDelete, undeletedResume] = Object.values(resumes);
      resumeToDeleteId = resumeToDelete.id;

      mockDatabaseRemoveFunction = jest.spyOn(
        FirebaseStub.database().ref(
          `${DatabaseConstants.resumesPath}/${resumeToDeleteId}`,
        ),
        'remove',
      );

      const resumeToDeleteMenuToggle = screen.getByTestId(
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
      await waitFor(() =>
        expect(mockDatabaseRemoveFunction).toHaveBeenCalledTimes(1),
      );

      await waitFor(() =>
        expect(screen.queryByText(resumeToDelete.name)).toBeNull(),
      );
      expect(screen.getByText(undeletedResume.name)).toBeInTheDocument();
    });

    /*
    it('displays notification', async () => {
      await waitFor(() =>
        expect(
          screen.getByText(`${resumeToDelete.name} was deleted successfully`),
        ).toBeInTheDocument(),
      );
    });
    */

    it('closes menu', () => {
      const menuItems = screen.queryAllByRole('menuitem');
      expect(menuItems).toHaveLength(0);
    });
  });

  describe('while loading', () => {
    beforeEach(async () => {
      await setup(false);
    });

    it('renders loading screen', () => {
      expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();
    });
  });
});
