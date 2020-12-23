import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import FirebaseStub from 'gatsby-plugin-firebase';

import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Builder from '../builder';

beforeEach(() => {
  FirebaseStub.database().initializeData();
});

afterEach(cleanup);

describe('builder', () => {
  let resumeId = null;
  let resume = null;

  beforeEach(async () => {
    resumeId = FirebaseStub.database().demoResumeId;
    resume = (
      await FirebaseStub.database().ref(`resumes/${resumeId}`).once('value')
    ).val();

    render(
      <UserProvider>
        <DatabaseProvider>
          <ResumeProvider>
            <StorageProvider>
              <Builder id={resume.id} />
            </StorageProvider>
          </ResumeProvider>
        </DatabaseProvider>
      </UserProvider>,
    );

    await act(async () => {
      await FirebaseStub.auth().signInAnonymously();
    });
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
      /*
      const newInputValue = 'test street 123';
      resume.profile.address.line1 = newInputValue;
      const mockUpdateFunction = jest.spyOn(
        FirebaseStub.database().ref(`resumes/${resumeId}`),
        'update',
      );
      const now = new Date().getTime();

      await FirebaseStub.database()
        .ref(`resumes/${resumeId}`)
        .update({
          ...resume,
          updatedAt: FirebaseStub.database.ServerValue.TIMESTAMP,
        });

      await waitFor(() => expect(mockUpdateFunction).toHaveBeenCalledTimes(1));
      const mockUpdateFunctionCallArgument =
        mockUpdateFunction.mock.calls[0][0];
      expect(mockUpdateFunctionCallArgument.id).toBe(resume.id);
      expect(mockUpdateFunctionCallArgument.profile.address.line1).toBe(
        newInputValue,
      );
      expect(mockUpdateFunctionCallArgument.updatedAt).toBeGreaterThanOrEqual(
        now,
      );
      */

      const input = screen.getByLabelText(new RegExp('address line 1', 'i'));
      const newInputValue = 'test street 123';
      const mockUpdateFunction = jest.spyOn(
        FirebaseStub.database().ref(`resumes/${resumeId}`),
        'update',
      );
      const now = new Date().getTime();

      fireEvent.change(input, { target: { value: newInputValue } });

      expect(input.value).toBe(newInputValue);

      await waitFor(() => expect(mockUpdateFunction).toHaveBeenCalledTimes(1), {
        timeout: 4000,
      });
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
});
