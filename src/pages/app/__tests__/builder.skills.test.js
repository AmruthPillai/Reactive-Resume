import { get } from 'lodash';
import { screen } from '@testing-library/react';

import { DatabaseConstants } from 'gatsby-plugin-firebase';

import { dataTestIdPrefix as listItemDataTestIdPrefix } from '../../../components/builder/lists/ListItem';

import {
  setupAndWait,
  expectDatabaseUpdateToHaveCompleted,
  dragAndDropDirectionDown,
  dragAndDropListItem,
} from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

test('allows to drag & drop', async () => {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  const { resume, mockDatabaseUpdateFunction } = await setupAndWait(
    resumeId,
    true,
    true,
  );

  const now = new Date().getTime();

  const dataPath = 'skills.items';
  const dataItems = get(resume, dataPath);
  expect(dataItems.length).toBeGreaterThan(1);

  const listItems = screen.getAllByTestId(
    `${listItemDataTestIdPrefix}${dataPath}`,
  );
  const firstListItem = listItems[0];
  expect(firstListItem).toHaveTextContent(dataItems[0].name);
  const secondListItem = listItems[1];
  expect(secondListItem).toHaveTextContent(dataItems[1].name);

  dragAndDropListItem(firstListItem, dragAndDropDirectionDown);

  const actualListItems = screen.getAllByTestId(
    `${listItemDataTestIdPrefix}${dataPath}`,
  );
  const actualFirstListItem = actualListItems[0];
  expect(actualFirstListItem).toHaveTextContent(dataItems[1].name);
  const actualSecondListItem = actualListItems[1];
  expect(actualSecondListItem).toHaveTextContent(dataItems[0].name);

  await expectDatabaseUpdateToHaveCompleted(mockDatabaseUpdateFunction);
  const mockDatabaseUpdateFunctionCallArgument =
    mockDatabaseUpdateFunction.mock.calls[0][0];
  expect(mockDatabaseUpdateFunctionCallArgument.id).toBe(resumeId);
  expect(mockDatabaseUpdateFunctionCallArgument.skills.items[0]).toEqual(
    dataItems[1],
  );
  expect(mockDatabaseUpdateFunctionCallArgument.skills.items[1]).toEqual(
    dataItems[0],
  );
  expect(
    mockDatabaseUpdateFunctionCallArgument.updatedAt,
  ).toBeGreaterThanOrEqual(now);
});
