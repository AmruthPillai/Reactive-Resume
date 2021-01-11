import React from 'react';
import { render, screen } from '@testing-library/react';

import FirebaseStub, { DatabaseConstants } from 'gatsby-plugin-firebase';

import '../../i18n/index';
import Castform from '../Castform';

describe('Castform', () => {
  let resume = {};

  beforeEach(async () => {
    FirebaseStub.database().initializeData();

    const resumeId = DatabaseConstants.initialStateResumeId;
    resume = (
      await FirebaseStub.database()
        .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
        .once('value')
    ).val();
  });

  it('renders correctly', () => {
    const { container } = render(<Castform data={resume} />);

    expect(container).toBeTruthy();
    expect(container).toBeInTheDocument();
  });

  describe('date of birth', () => {
    const birthDateLabelMatcher = /Date of birth/i;

    it('is not shown if not provided', () => {
      render(<Castform data={resume} />);

      expect(screen.queryByText(birthDateLabelMatcher)).toBeNull();
    });

    it('is shown if provided', () => {
      const birthDate = new Date(1990, 0, 20);
      const birthDateFormatted = '20 January 1990';
      resume.profile.birthDate = birthDate;

      render(<Castform data={resume} />);

      expect(screen.getByText(birthDateLabelMatcher)).toBeTruthy();
      expect(screen.getByText(birthDateLabelMatcher)).toBeInTheDocument();
      expect(screen.getByText(birthDateFormatted)).toBeTruthy();
      expect(screen.getByText(birthDateFormatted)).toBeInTheDocument();
    });
  });
});
