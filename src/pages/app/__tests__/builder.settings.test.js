import { fireEvent, screen } from '@testing-library/react';

import { DatabaseConstants } from 'gatsby-plugin-firebase';

import { languageStorageItemKey } from '../../../contexts/SettingsContext';

import {
  expectDatabaseUpdateToHaveCompleted,
  setupAndWait,
} from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

test('allows to change the language', async () => {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  const { mockDatabaseUpdateFunction } = await setupAndWait(
    resumeId,
    false,
    true,
    true,
  );

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

  await expectDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
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
