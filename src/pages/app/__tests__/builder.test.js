import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { SettingsProvider } from '../../../contexts/SettingsContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { UserProvider } from '../../../contexts/UserContext';
import {
  DatabaseProvider,
  DebounceWaitTime,
} from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Builder from '../builder';

describe('Builder', () => {
  let resumeId = null;
  let resume = null;
  let mockUpdateFunction = null;

  beforeEach(async () => {
    FirebaseStub.database().initializeData();

    resumeId = DatabaseConstants.demoStateResume1Id;
    resume = (
      await FirebaseStub.database()
        .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
        .once('value')
    ).val();
    mockUpdateFunction = jest.spyOn(
      FirebaseStub.database().ref(
        `${DatabaseConstants.resumesPath}/${resumeId}`,
      ),
      'update',
    );

    render(
      <SettingsProvider>
        <ModalProvider>
          <UserProvider>
            <DatabaseProvider>
              <ResumeProvider>
                <StorageProvider>
                  <Builder id={resume.id} />
                </StorageProvider>
              </ResumeProvider>
            </DatabaseProvider>
          </UserProvider>
        </ModalProvider>
      </SettingsProvider>,
    );

    await act(async () => {
      await FirebaseStub.auth().signInAnonymously();
    });

    await waitFor(() => mockUpdateFunction.mock.calls[0][0], {
      timeout: DebounceWaitTime,
    });
    mockUpdateFunction.mockClear();
  });

  describe('renders', () => {
    it('first and last name', async () => {
      expect(
        screen.getByLabelText(new RegExp('first name', 'i')),
      ).toHaveDisplayValue(resume.profile.firstName);
      expect(
        screen.getByLabelText(new RegExp('last name', 'i')),
      ).toHaveDisplayValue(resume.profile.lastName);
      expect(
        screen.getAllByText(new RegExp(resume.profile.firstName, 'i')).length,
      ).toBeTruthy();
      expect(
        screen.getAllByText(new RegExp(resume.profile.lastName, 'i')).length,
      ).toBeTruthy();
    });
  });

  describe('updates data', () => {
    it('when input value is changed', async () => {
      const input = screen.getByLabelText(new RegExp('address line 1', 'i'));
      const newInputValue = 'test street 123';
      const now = new Date().getTime();

      fireEvent.change(input, { target: { value: newInputValue } });

      expect(input.value).toBe(newInputValue);

      await waitFor(() => mockUpdateFunction.mock.calls[0][0], {
        timeout: DebounceWaitTime,
      });
      expect(mockUpdateFunction).toHaveBeenCalledTimes(1);
      const mockUpdateFunctionCallArgument =
        mockUpdateFunction.mock.calls[0][0];
      expect(mockUpdateFunctionCallArgument.id).toBe(resume.id);
      expect(mockUpdateFunctionCallArgument.profile.address.line1).toBe(
        newInputValue,
      );
      expect(mockUpdateFunctionCallArgument.updatedAt).toBeGreaterThanOrEqual(
        now,
      );
    });
  });

  describe('settings', () => {
    it('allow to change the language', async () => {
      const languageSelectElement = screen.getByLabelText('Language');
      const newLanguage = 'it';
      const now = new Date().getTime();

      fireEvent.change(languageSelectElement, {
        target: { value: newLanguage },
      });

      expect(languageSelectElement).toHaveValue(newLanguage);

      expect(
        screen.queryByLabelText(new RegExp('date of birth', 'i')),
      ).toBeNull();
      expect(
        screen.getByLabelText(new RegExp('data di nascita', 'i')),
      ).toBeInTheDocument();

      await waitFor(() => mockUpdateFunction.mock.calls[0][0], {
        timeout: DebounceWaitTime,
      });
      expect(mockUpdateFunction).toHaveBeenCalledTimes(1);
      const mockUpdateFunctionCallArgument =
        mockUpdateFunction.mock.calls[0][0];
      expect(mockUpdateFunctionCallArgument.id).toBe(resume.id);
      expect(mockUpdateFunctionCallArgument.metadata.language).toBe(
        newLanguage,
      );
      expect(mockUpdateFunctionCallArgument.updatedAt).toBeGreaterThanOrEqual(
        now,
      );
    });
  });
});
