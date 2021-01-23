import { navigate as mockNavigateFunction } from 'gatsby';
import React from 'react';
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { dataTestId as loadingScreenTestId } from '../../../components/router/LoadingScreen';
import {
  SettingsProvider,
  languageStorageItemKey,
} from '../../../contexts/SettingsContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { UserProvider } from '../../../contexts/UserContext';
import {
  DatabaseProvider,
  DebounceWaitTime,
} from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Wrapper from '../../../components/shared/Wrapper';
import Builder from '../builder';

describe('Builder', () => {
  let resumeId = null;
  let resume = null;
  let mockDatabaseUpdateFunction = null;

  const fnWaitForDatabaseUpdateToHaveCompleted = async () => {
    await waitFor(() => mockDatabaseUpdateFunction.mock.calls[0][0], {
      timeout: DebounceWaitTime,
    });
    await waitFor(() => mockDatabaseUpdateFunction.mock.results[0].value);
  };

  const expectDatabaseUpdateToHaveCompleted = async () => {
    await waitFor(
      () => expect(mockDatabaseUpdateFunction).toHaveBeenCalledTimes(1),
      {
        timeout: DebounceWaitTime,
      },
    );
    await waitFor(() =>
      expect(
        mockDatabaseUpdateFunction.mock.results[0].value,
      ).resolves.toBeUndefined(),
    );
  };

  async function setup(
    resumeIdParameter,
    waitForLoadingScreenToDisappear = true,
    waitForDatabaseUpdateToHaveCompleted = true,
  ) {
    FirebaseStub.database().initializeData();

    resumeId = resumeIdParameter;
    resume = (
      await FirebaseStub.database()
        .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
        .once('value')
    ).val();

    mockDatabaseUpdateFunction = jest.spyOn(
      FirebaseStub.database().ref(
        `${DatabaseConstants.resumesPath}/${resumeId}`,
      ),
      'update',
    );

    FirebaseStub.auth().signInAnonymously();

    render(
      <SettingsProvider>
        <ModalProvider>
          <UserProvider>
            <DatabaseProvider>
              <ResumeProvider>
                <StorageProvider>
                  <Wrapper>
                    <Builder id={resumeId} />
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

    if (waitForDatabaseUpdateToHaveCompleted) {
      await fnWaitForDatabaseUpdateToHaveCompleted();
      mockDatabaseUpdateFunction.mockClear();
    }
  }

  describe('handles errors', () => {
    describe('if resume does not exist', () => {
      beforeEach(async () => {
        await setup('xxxxxx', false, false);
      });

      it('navigates to Dashboard and displays notification', async () => {
        await waitFor(() =>
          expect(mockNavigateFunction).toHaveBeenCalledTimes(1),
        );
        expect(mockNavigateFunction).toHaveBeenCalledWith('/app/dashboard');

        const notification = await screen.findByRole('alert');
        expect(
          getByText(
            notification,
            /The resume you were looking for does not exist anymore/i,
          ),
        ).toBeInTheDocument();
        fireEvent.click(notification);

        await waitFor(() =>
          expect(
            mockNavigateFunction.mock.results[0].value,
          ).resolves.toBeUndefined(),
        );
      });
    });
  });

  describe('renders', () => {
    beforeEach(async () => {
      await setup(DatabaseConstants.demoStateResume1Id);
    });

    it('first and last name', () => {
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
  });

  describe('settings', () => {
    beforeEach(async () => {
      await setup(DatabaseConstants.demoStateResume1Id);
    });

    it('allow to change the language', async () => {
      const languageElement = screen.getByLabelText(/language/i);
      const italianLanguageCode = 'it';
      const now = new Date().getTime();

      fireEvent.change(languageElement, {
        target: { value: italianLanguageCode },
      });

      expect(languageElement).toHaveValue(italianLanguageCode);

      expect(screen.queryByLabelText(/date of birth/i)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/data di nascita/i)).toBeInTheDocument();

      const languageStorageItem = localStorage.getItem(languageStorageItemKey);
      expect(languageStorageItem).toBe(italianLanguageCode);

      await expectDatabaseUpdateToHaveCompleted();
      const mockDatabaseUpdateFunctionCallArgument =
        mockDatabaseUpdateFunction.mock.calls[0][0];
      expect(mockDatabaseUpdateFunctionCallArgument.id).toBe(resumeId);
      expect(mockDatabaseUpdateFunctionCallArgument.metadata.language).toBe(
        italianLanguageCode,
      );
      expect(
        mockDatabaseUpdateFunctionCallArgument.updatedAt,
      ).toBeGreaterThanOrEqual(now);
    });

    afterEach(() => {
      const englishLanguageCode = 'en';
      localStorage.setItem(languageStorageItemKey, englishLanguageCode);
    });
  });

  describe('updates data', () => {
    beforeEach(async () => {
      await setup(DatabaseConstants.demoStateResume1Id);
    });

    it('when input value is changed', async () => {
      const input = screen.getByRole('textbox', { name: /address line 1/i });
      const newInputValue = 'test street 123';
      const now = new Date().getTime();

      fireEvent.change(input, { target: { value: newInputValue } });

      expect(input.value).toBe(newInputValue);

      await expectDatabaseUpdateToHaveCompleted();
      const mockDatabaseUpdateFunctionCallArgument =
        mockDatabaseUpdateFunction.mock.calls[0][0];
      expect(mockDatabaseUpdateFunctionCallArgument.id).toBe(resumeId);
      expect(mockDatabaseUpdateFunctionCallArgument.profile.address.line1).toBe(
        newInputValue,
      );
      expect(
        mockDatabaseUpdateFunctionCallArgument.updatedAt,
      ).toBeGreaterThanOrEqual(now);
    });
  });

  describe('while loading', () => {
    beforeEach(async () => {
      await setup(DatabaseConstants.demoStateResume1Id, false, false);
    });

    it('renders loading screen', async () => {
      expect(screen.getByTestId(loadingScreenTestId)).toBeInTheDocument();

      await waitForElementToBeRemoved(() =>
        screen.getByTestId(loadingScreenTestId),
      );

      await fnWaitForDatabaseUpdateToHaveCompleted();
    });
  });

  describe('with resume in initial state', () => {
    beforeEach(async () => {
      await setup(DatabaseConstants.initialStateResumeId, false, false);
    });

    it('displays load demo data notification', async () => {
      const notification = await screen.findByRole('alert');
      expect(
        getByText(
          notification,
          /Not sure where to begin\? Try loading demo data/i,
        ),
      ).toBeInTheDocument();
      fireEvent.click(notification);
    });
  });
});
