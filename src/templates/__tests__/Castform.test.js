import React from 'react';
import { render } from '@testing-library/react';
import FirebaseStub from 'gatsby-plugin-firebase';

import '../../i18n/index';
import Castform from '../Castform';

describe('Castform', () => {
  let resume = {};

  beforeEach(async () => {
    FirebaseStub.database().initializeData();
    const resumesPath = FirebaseStub.database().resumesPath;
    const resumeId = FirebaseStub.database().initialStateResumeId;
    resume = (
      await FirebaseStub.database()
        .ref(`${resumesPath}/${resumeId}`)
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
      const { queryByText } = render(<Castform data={resume} />);

      expect(queryByText(birthDateLabelMatcher)).toBe(null);
    });

    it('is shown if provided', () => {
      const birthDate = new Date(1990, 0, 20);
      const birthDateFormatted = '20 January 1990';
      resume.profile.birthDate = birthDate;

      const { getByText } = render(<Castform data={resume} />);

      expect(getByText(birthDateLabelMatcher)).toBeTruthy();
      expect(getByText(birthDateLabelMatcher)).toBeInTheDocument();
      expect(getByText(birthDateFormatted)).toBeTruthy();
      expect(getByText(birthDateFormatted)).toBeInTheDocument();
    });
  });
});
