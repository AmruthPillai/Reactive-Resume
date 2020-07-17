import { Link } from '@reach/router';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Wrapper from '../components/shared/Wrapper';

const FrequentlyAskedQuestions = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Frequently Asked Questions | Reactive Resume</title>
        <link rel="canonical" href="https://rxresu.me/app/dashboard" />
      </Helmet>

      <div className="md:w-1/2 container px-8 md:px-0 py-16 grid gap-12">
        <div className="flex items-center">
          <Link to="/">
            <MdKeyboardArrowLeft size="32px" />
          </Link>
          <h1 className="ml-6 text-4xl font-semibold">
            Frequently Asked Questions
          </h1>
        </div>

        <div>
          <p className="leading-loose">
            This is aimed to be the world&apos;s simplest privacy policy. This
            document should explain to you why the app collects some
            information, what happens when your account is deleted and some
            other frequently asked questions answered regarding your privacy.
          </p>

          <p className="mt-6 leading-loose">
            If you have any more questions, please raise an issue regarding the
            same on GitHub and I&apos;ll answer as honest and quickly as
            possible :)
          </p>
        </div>

        <hr />

        <div>
          <h4 className="text-xl font-medium mb-4">
            What identifiable information is stored about me?
          </h4>
          <p className="leading-loose">
            Your name and your email address is stored along with your user
            information, if you signed in with Google, and of course, all the
            information you input in your resume is also stored in the database.
            You won&apos;t even get any marketing emails, feature updates,
            newsletters, notification emails, nothing.
          </p>
        </div>

        <hr />

        <div>
          <h4 className="text-xl font-medium mb-4">
            Why are you using a database, why not keep everything local like in
            the first version of Reactive Resume?
          </h4>
          <p className="leading-loose">
            Not having a centralized database cause a lot more problems than I
            could solve, mainly having a large chunk of the users of the app
            having an outdated schema as the app evolved. This was a problem I
            could not solve without having at least some control.
          </p>

          <p className="mt-6 leading-loose">
            Also, a lot of users were having trouble printing their resumes on
            their browsers, so with the help of Cloud Functions from Firebase,
            you can now print your resumes remotely. None of the resumes are
            stored, and they are sent to you immediately after generation, which
            can be verified by looking through the source code.
          </p>
        </div>

        <hr />

        <div>
          <h4 className="text-xl font-medium mb-4">
            How is this all free? There must be a catch!
          </h4>
          <p className="leading-loose">
            <strong>Absolutely no catch to this freebie.</strong> This project
            is just my way of giving back to the community that I&apos;ve
            learned so much from. If you&apos;d like to show your appreciation
            however, you can follow me on my social media and let me know how
            much it helped you, or donate to help pay the cloud bills, or if you
            are a fellow developer, you can head to GitHub and contribute to the
            code and raising a PR.
          </p>
        </div>

        <hr />

        <div>
          <h4 className="text-xl font-medium mb-4">
            Is there a mobile app for Reactive Resume?
          </h4>
          <p className="leading-loose">
            <strong>Not yet. But soon, maybe?</strong> One of the main
            motivations for me to shift to a centralized database approach was
            that I could one day build a mobile app as well that could let users
            jump from editing on their desktops to editing on their phones. It
            requires a lot of time, so I would not expect it any time soon, but
            it&apos;s definitely in the pipeline.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default FrequentlyAskedQuestions;
