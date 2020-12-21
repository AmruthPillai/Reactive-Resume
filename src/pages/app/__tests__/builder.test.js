import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import firebaseMock from 'gatsby-plugin-firebase';

import { UserProvider } from '../../../contexts/UserContext';
import { DatabaseProvider } from '../../../contexts/DatabaseContext';
import { ResumeProvider } from '../../../contexts/ResumeContext';
import { StorageProvider } from '../../../contexts/StorageContext';
import Builder from '../builder';

beforeEach(() => {
  firebaseMock.auth().__init();
  firebaseMock.database().__init();
});

afterEach(cleanup);

describe('builder', () => {
  let resumeId = null;
  let resume = null;

  beforeEach(async () => {
    resumeId = firebaseMock.database().__demoResumeId;
    resume = (
      await firebaseMock.database().ref(`resumes/${resumeId}`).once('value')
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
      await firebaseMock.auth().signInAnonymously();
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
      const ref = firebaseMock.database().ref(`resumes/${resumeId}`);
      const firebaseMockUpdateFunction = jest.spyOn(ref, 'update');
      const now = Date.now();

      await ref.update({
        ...resume,
        updatedAt: firebaseMock.database().ServerValue.TIMESTAMP,
      });

      await waitFor(() =>
        expect(firebaseMockUpdateFunction).toHaveBeenCalledTimes(1),
      );
      const firebaseMockUpdateFunctionCallArgument =
        firebaseMockUpdateFunction.mock.calls[0][0];
      expect(firebaseMockUpdateFunctionCallArgument.id).toBe(resume.id);
      expect(firebaseMockUpdateFunctionCallArgument.profile.address.line1).toBe(newInputValue);
      expect(firebaseMockUpdateFunctionCallArgument.updatedAt).toBeGreaterThanOrEqual(now);
      */

      const input = screen.getByLabelText(new RegExp('address line 1', 'i'));
      const newInputValue = 'test street 123';
      const now = Date.now();

      fireEvent.change(input, { target: { value: newInputValue } });

      expect(input.value).toBe(newInputValue);

      const databaseRef = firebaseMock.database().ref(`resumes/${resume.id}`);
      await waitFor(() => expect(databaseRef.__updateCalls.length).toBe(1), {
        timeout: 4000,
      });
      const databaseRefUpdateCallArgument = databaseRef.__updateCalls[0];
      expect(databaseRefUpdateCallArgument.id).toBe(resume.id);
      expect(databaseRefUpdateCallArgument.profile.address.line1).toBe(
        newInputValue,
      );
      expect(databaseRefUpdateCallArgument.updatedAt).toBeGreaterThanOrEqual(
        now,
      );
    });
  });
});
