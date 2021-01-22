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
import Wrapper from '../../../components/shared/Wrapper';
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
      expect(Object.keys(resumes)).toHaveLength(2);

      expect(Object.values(resumes)[0].user).toEqual(user.uid);
      await waitFor(() => {
        expect(
          screen.getByText(Object.values(resumes)[0].name),
        ).toBeInTheDocument();
      });
      expect(Object.values(resumes)[1].user).toEqual(user.uid);
      await waitFor(() => {
        expect(
          screen.getByText(Object.values(resumes)[1].name),
        ).toBeInTheDocument();
      });
    });
  });

  describe('when resume is deleted', () => {
    let mockDatabaseRemoveFunction = null;
    let resumeToDelete = null;
    let undeletedResume = null;
    let resumeToDeleteId = null;

    const waitForDatabaseRemoveFunctionToHaveCompleted = async () => {
      await waitFor(() => mockDatabaseRemoveFunction.mock.results[0].value);
    };

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

      let resumeToDeleteMenuToggle = null;
      await waitFor(() => {
        resumeToDeleteMenuToggle = screen.queryByTestId(
          `${resumePreviewMenuToggleDataTestIdPrefix}${resumeToDeleteId}`,
        );
        return resumeToDeleteMenuToggle ? Promise.resolve() : Promise.reject();
      });
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

    afterEach(async () => {
      await waitForDatabaseRemoveFunctionToHaveCompleted();
    });

    it('removes it from database and preview', async () => {
      await waitFor(() =>
        expect(mockDatabaseRemoveFunction).toHaveBeenCalledTimes(1),
      );

      await waitForDatabaseRemoveFunctionToHaveCompleted();

      await waitFor(() =>
        expect(screen.queryByText(resumeToDelete.name)).toBeNull(),
      );
      expect(screen.getByText(undeletedResume.name)).toBeInTheDocument();
    });

    it('displays notification', async () => {
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    it('closes menu', () => {
      const menuItems = screen.queryAllByRole('menuitem');
      expect(menuItems).toHaveLength(0);
    });
  });

  describe('while loading', () => {
    beforeEach(async () => {
      await setup(false);
    });

    afterEach(async () => {
      await waitForElementToBeRemoved(() =>
        screen.getByTestId(loadingScreenTestId),
      );
    });

    it('renders loading screen', () => {
      expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();
    });
  });
});
