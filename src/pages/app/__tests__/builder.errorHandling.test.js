import { navigate as mockNavigateFunction } from 'gatsby';
import { fireEvent, getByText, screen, waitFor } from '@testing-library/react';

import setup from './helpers/builder';

test('if resume does not exist, navigates to Dashboard and displays notification', async () => {
  await setup('xxxxxx');

  await waitFor(() => expect(mockNavigateFunction).toHaveBeenCalledTimes(1));
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
    expect(mockNavigateFunction.mock.results[0].value).resolves.toBeUndefined(),
  );
});
