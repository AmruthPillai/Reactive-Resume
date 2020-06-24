import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const AboutTab = () => {
  const { t } = useTranslation('rightSidebar');

  return (
    <div>
      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('about.documentation.heading')}</h6>

        <div className="text-sm">{t('about.documentation.body')}</div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.rxresu.me/"
          className="flex justify-center items-center mt-4 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">description</i>
            <span className="text-sm">{t('about.documentation.buttons.documentation')}</span>
          </div>
        </a>
      </div>

      <hr className="my-5" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('about.bugOrFeatureRequest.heading')}</h6>

        <div className="text-sm">{t('about.bugOrFeatureRequest.body')}</div>

        <div className="grid grid-cols-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/AmruthPillai/Reactive-Resume/issues/new"
            className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">bug_report</i>
              <span className="text-sm">{t('about.bugOrFeatureRequest.buttons.raiseIssue')}</span>
            </div>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:im.amruth@gmail.com?subject=Feature Request/Reporting a Bug in Reactive Resume: "
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">email</i>
              <span className="text-sm">{t('about.bugOrFeatureRequest.buttons.sendEmail')}</span>
            </div>
          </a>
        </div>
      </div>

      <hr className="my-5" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('about.sourceCode.heading')}</h6>

        <div className="text-sm">{t('about.sourceCode.body')}</div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AmruthPillai/Reactive-Resume"
          className="flex justify-center items-center mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">code</i>
            <span className="text-sm">{t('about.sourceCode.buttons.githubRepo')}</span>
          </div>
        </a>
      </div>

      <hr className="my-5" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('about.license.heading')}</h6>

        <div className="text-sm">{t('about.license.body')}</div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AmruthPillai/Reactive-Resume/blob/master/LICENSE"
          className="flex justify-center items-center mt-4 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">gavel</i>
            <span className="text-sm">{t('about.license.buttons.mitLicense')}</span>
          </div>
        </a>
      </div>

      <div className="mt-5">
        <p className="text-xs font-gray-600 text-center">
          <Trans t={t} i18nKey="about.footer.credit">
            Made with Love by
            <a
              className="font-bold hover:underline"
              href="https://www.amruthpillai.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Amruth Pillai
            </a>
          </Trans>
        </p>
        <p className="text-xs font-gray-600 text-center">{t('about.footer.thanks')}</p>
      </div>
    </div>
  );
};

export default AboutTab;
