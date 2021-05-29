import { fireEvent, screen } from '@testing-library/react';

import { DatabaseConstants } from 'gatsby-plugin-firebase';

import {
  expectDatabaseUpdateToHaveCompleted,
  setupAndWait,
} from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

test('when input value is changed, updates database', async () => {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  const { mockDatabaseUpdateFunction } = await setupAndWait(
    resumeId,
    true,
    true,
  );

  const input = screen.getByRole('textbox', { name: /address line 1/i });
  const newInputValue = 'test street 123';
  const now = new Date().getTime();

  fireEvent.change(input, { target: { value: newInputValue } });

  expect(input.value).toBe(newInputValue);

  await expectDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
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
