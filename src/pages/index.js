import { Link } from '@reach/router';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { FaUserSecret, FaWalking } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import { RiRefreshLine } from 'react-icons/ri';
import Hero from '../components/landing/Hero';
import Screenshots from '../components/landing/Screenshots';
import Wrapper from '../components/shared/Wrapper';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Helmet>
        <title>{t('shared.appName')}</title>
        <link rel="canonical" href="https://rxresu.me/" />
      </Helmet>

      <div className="container px-8 xl:px-0 text-center md:text-left mt-24">
        <Hero />

        <p className="leading-loose text-lg mt-16">
          Reactive Resume is a free and open source resume builder that’s built
          to make the mundane tasks of creating, updating and sharing your
          resume as easy as 1, 2, 3. With this app, you can create multiple
          resumes, share them with recruiters through a unique link and print as
          PDF, all for free, no advertisements, without losing the integrity and
          privacy of your data.
        </p>

        <Screenshots />

        <div className="pt-8 grid lg:grid-cols-2 lg:col-gap-10">
          <Feature
            icon={IoIosRocket}
            title="Create a resume that’s worthy of who you are."
          >
            Keep up with the latest trends in resume design without having to
            start from scratch. With new templates being designed every week and
            having made it that easy to design your own templates and submit
            them to the community, you’ll never have to copy and edit your
            friend’s resume again.
          </Feature>

          <Feature
            icon={RiRefreshLine}
            title="Updating your resume shouldn’t be a chore."
          >
            The biggest problem I’ve faced was when I had to update my resume
            when I learned a new skill or found a new job. The ever-shifting
            layouts and inconsistency with design over a number of years made it
            difficult to update your own resume, but Reactive Resume makes it as
            easy as few clicks.
          </Feature>

          <Feature
            icon={FaWalking}
            title="Kickstarting your career shouldn’t come at a cost."
          >
            There are brilliant alternatives to this app like Novoresume and
            Zety , but they come at a cost, mainly because of the time the
            developers and the marketing they had to incur to make the product.
            This app might not be better than them, but it does cater to people
            who are just not in a position to pay hundreds of dollars to create
            a resume to bootstrap their career.
          </Feature>

          <Feature
            icon={FaUserSecret}
            title="Your data is your data, none of my data."
          >
            You must be thinking, if you&apos;re not paying for the product,
            then you are the product. Or, at least your data is?{' '}
            <strong>Well, this is the exception</strong>. Your data is your own,
            as stated in the ridiculously simple{' '}
            <Link to="/faq">Privacy Policy</Link>, I don&apos;t do anything with
            the data, it just exists on a database for the convenient features
            provided by Reactive Resume.
          </Feature>
        </div>

        <div className="my-24">
          <div className="text-xl uppercase font-bold mb-8">
            Links of Interest
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
            <Link to="/faq">Frequently Asked Questions</Link>
            <a
              href="https://github.com/AmruthPillai/Reactive-Resume"
              rel="noreferrer"
              target="_blank"
            >
              Check Out Source Code
            </a>
            <Link to="/faq">Upvote on Product Hunt</Link>
            <a
              href="https://www.buymeacoffee.com/AmruthPillai"
              rel="noreferrer"
              target="_blank"
            >
              Donate to Reactive Resume
            </a>
            <Link to="/blog/design-beautiful-resumes">
              Design Beautiful Resumes
            </Link>
            <Link to="/blog/ats-friendly-resumes">ATS-Friendly Resumes</Link>
            <Link to="/blog/acing-video-interviews">
              Acing Video Interviews
            </Link>
            <Link to="/blog/jobs-during-covid-19">Jobs During COVID-19</Link>
          </div>
        </div>

        <footer className="my-24">
          <p className="text-primary-500">
            Licensed under <a href="/">MIT</a>
            <br />
            Made with love by{' '}
            <a href="https://www.amruthpillai.com/">Amruth Pillai</a>
          </p>
        </footer>
      </div>
    </Wrapper>
  );
};

const Feature = ({ icon: Icon, title, children }) => {
  return (
    <div className="mt-16">
      <div className="flex items-center">
        <Icon size="18px" className="text-primary-900 mr-4" />
        <div className="text-3xl">{title}</div>
      </div>
      <p className="mt-6 text-lg leading-loose">{children}</p>
    </div>
  );
};

export default memo(Home);
