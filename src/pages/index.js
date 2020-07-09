import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/landing/Hero';
import Wrapper from '../components/shared/Wrapper';

const Home = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Reactive Resume</title>
        <link rel="canonical" href="https://rxresu.me/" />
      </Helmet>

      <div className="container mt-24">
        <Hero />

        <div className="pt-8">
          <Feature title="Create a resume that’s worthy of who you are.">
            Keep up with the latest trends in resume design without having to
            start from scratch. With new templates being designed every week and
            having made it that easy to design your own templates and submit
            them to the community, you’ll never have to copy and edit your
            friend’s resume again.
          </Feature>

          <Feature title="Updating your resume shouldn’t be a chore.">
            The biggest problem I’ve faced was when I had to update my resume
            when I learned a new skill or found a new job. The ever-shifting
            layouts and inconsistency with design over a number of years made it
            difficult to update your own resume, but Reactive Resume makes it as
            easy as few clicks.
          </Feature>

          <Feature title="Kickstarting your career shouldn’t come at a cost.">
            There are brilliant alternatives to this app like{' '}
            <a href="/" target="blank">
              Novoresume
            </a>{' '}
            and{' '}
            <a href="/" target="blank">
              Zety
            </a>
            , but they come at a cost, mainly because of the time the developers
            and the marketing they had to incur to make the product. This app
            might not be better than them, but it does cater to people who are
            just not in a position to pay hundreds of dollars to create a resume
            to bootstrap their career.
          </Feature>
        </div>

        <footer className="my-24">
          <p className="font-medium text-gray-500">
            Licensed under <a href="/">MIT</a> | Made with love by{' '}
            <a href="https://www.amruthpillai.com/">Amruth Pillai</a>
          </p>
        </footer>
      </div>
    </Wrapper>
  );
};

const Feature = ({ title, children }) => {
  return (
    <div className="mt-16">
      <h3 className="text-3xl">{title}</h3>
      <p className="mt-6 text-lg">{children}</p>
    </div>
  );
};

export default memo(Home);
