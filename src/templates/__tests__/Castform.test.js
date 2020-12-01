import React from 'react';
import { render, cleanup } from '@testing-library/react';
import path from 'path';
import fs from 'fs';

import '../../i18n/index';
import Castform from '../Castform';

let data = {};

beforeEach(() => {
  const filePath = path.resolve(__dirname, '../../data/initialState.json');
  const file = fs.readFileSync(filePath);
  data = JSON.parse(file);
});

afterEach(cleanup);

it('renders correctly', () => {
  const { container } = render(<Castform data={data} />);

  expect(container).toBeTruthy();
  expect(container).toBeInTheDocument();
});

describe('date of birth', () => {
  const birthDateLabelMatcher = /Date of birth/i;

  it('is not shown if not provided', () => {
    const { queryByText } = render(<Castform data={data} />);

    expect(queryByText(birthDateLabelMatcher)).toBe(null);
  });

  it('is shown if provided', () => {
    const birthDate = new Date(1990, 0, 20);
    const birthDateFormatted = '20 January 1990';
    data.profile.birthDate = birthDate;

    const { getByText } = render(<Castform data={data} />);

    expect(getByText(birthDateLabelMatcher)).toBeTruthy();
    expect(getByText(birthDateLabelMatcher)).toBeInTheDocument();
    expect(getByText(birthDateFormatted)).toBeTruthy();
    expect(getByText(birthDateFormatted)).toBeInTheDocument();
  });
});
