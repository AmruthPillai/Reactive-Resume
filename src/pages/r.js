import { Redirect, Router } from '@reach/router';
import React, { memo } from 'react';
import NotFound from './404';
import ResumeViewer from './r/view';
import Wrapper from '../components/shared/Wrapper';

const ResumeRouter = () => (
  <Wrapper>
    <Router>
      <Redirect noThrow from="/r" to="/" exact />
      <ResumeViewer path="r/:id" />
      <NotFound default />
    </Router>
  </Wrapper>
);

export default memo(ResumeRouter);
