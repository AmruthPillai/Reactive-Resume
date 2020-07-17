import { Redirect, Router } from '@reach/router';
import React, { memo } from 'react';
import Wrapper from '../components/shared/Wrapper';
import ResumeViewer from './r/view';
import NotFound from './404';

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
