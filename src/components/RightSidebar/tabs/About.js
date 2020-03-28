import React from 'react';

const AboutTab = () => {
  return (
    <div>
      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">Bug? Feature Request?</h6>

        <div className="text-sm">
          Something halting your progress from making a resume? Found a pesky bug that just
          won&apos;t quit? Talk about it on the GitHub Issues section, or send me and email using
          the actions below.
        </div>

        <div className="grid grid-cols-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/AmruthPillai/Reactive-Resume/issues/new"
            className="flex justify-center mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">bug_report</i>
              <span className="text-sm">Raise an Issue</span>
            </div>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:im.amruth@gmail.com?subject=Feature Request/Reporting a Bug in Reactive Resume: "
            className="flex justify-center mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">email</i>
              <span className="text-sm">Send an Email</span>
            </div>
          </a>
        </div>
      </div>

      <hr className="my-5" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">Source Code</h6>

        <div className="text-sm">
          Want to run the project from it&apos;s source? Are you a developer willing to contribute
          to the open source development of this project? Click the button below.
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AmruthPillai/Reactive-Resume"
          className="flex justify-center mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">code</i>
            <span className="text-sm">GitHub Repo</span>
          </div>
        </a>
      </div>

      <hr className="my-5" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">License Information</h6>

        <div className="text-sm">
          The project is governed under the MIT License, which you can read more about below.
          Basically, you are allowed to use the project anywhere provided you give credits to the
          original author.
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AmruthPillai/Reactive-Resume/blob/master/LICENSE"
          className="flex justify-center mt-4 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">policy</i>
            <span className="text-sm">MIT License</span>
          </div>
        </a>
      </div>

      <div className="mt-5">
        <p className="text-xs font-gray-600 text-center">
          Reactive Resume is a project by{' '}
          <a
            className="hover:underline"
            href="https://www.amruthpillai.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <strong>Amruth Pillai</strong>
          </a>{' '}
          in hopes of allowing anyone to make beautiful resumes and get equal job opportunities.
          <br />
          <br />
          Thank you for using Reactive Resume!
        </p>
      </div>
    </div>
  );
};

export default AboutTab;
