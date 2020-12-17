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
      const input = screen.getByLabelText(new RegExp('address line 1', 'i'));
      const newInputValue = 'test street 123';
      const spy = jest.spyOn(
        firebaseMock.database().ref(`resumes/${resumeId}`),
        'update',
      );

      fireEvent.change(input, { target: { value: newInputValue } });

      expect(input.value).toBe(newInputValue);

      await waitFor(() => expect(spy).toHaveBeenCalledTimes(1), {
        timeout: 4000,
      });
      //const promise = spy.mock.results[0].value;
      //await spy();
      //expect(spy).toHaveBeenCalledTimes(1);

      resume = (
        await firebaseMock.database().ref(`resumes/${resumeId}`).once('value')
      ).val();
      expect(resume.profile.address.line1).toBe(newInputValue);
    });
  });
});
