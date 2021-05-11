import { fireEvent, screen } from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import { setupAndWait } from './helpers/builder';

const testTimeoutInMilliseconds = 20000;
jest.setTimeout(testTimeoutInMilliseconds);

async function setup() {
  const resumeId = DatabaseConstants.demoStateResume1Id;
  await setupAndWait(resumeId, true, true);

  const button = screen.getByRole('button', {
    name: /Delete Account/i,
  });

  const mockFirebaseFunctionsHttpsCallable = jest.spyOn(
    FirebaseStub.functions(),
    'httpsCallable',
  );

  return {
    button,
    mockFirebaseFunctionsHttpsCallable,
  };
}

test('prompts for confirmation', async () => {
  const { button, mockFirebaseFunctionsHttpsCallable } = await setup();

  fireEvent.click(button);

  expect(button).toHaveTextContent('Are you sure?');
  expect(mockFirebaseFunctionsHttpsCallable).not.toHaveBeenCalled();
});
