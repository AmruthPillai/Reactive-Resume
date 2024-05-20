/* eslint-disable lingui/no-unlocalized-strings */

import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";

export const PrivacyPolicyPage = () => (
  <main className="relative isolate bg-background">
    <Helmet prioritizeSeoTags>
      <title>
        {t`Privacy Policy`} - {t`Reactive Resume`}
      </title>

      <meta
        name="description"
        content="A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume."
      />
    </Helmet>

    <section
      id="privacy-policy"
      className="container prose prose-zinc relative max-w-4xl py-32 dark:prose-invert"
    >
      <h1 className="mb-4">{t`Privacy Policy`}</h1>
      <h6 className="text-sm">Last updated on 3rd May 2024</h6>

      <hr className="my-6" />

      <ol>
        <li>
          <h2 className="mb-2">Introduction</h2>
          <p>
            This privacy policy outlines how we collect, use, and protect the personal information
            you provide when using our web application. By accessing or using Reactive Resume, you
            agree to the collection and use of information in accordance with this policy.
          </p>
        </li>

        <li>
          <h2 className="mb-2">Information Collection and Use</h2>
          <p>
            For a better experience while using our Service, we may require you to provide us with
            certain personally identifiable information, including but not limited to your name and
            email address. The information that we collect will be used to contact or identify you
            primarily for the following purposes:
          </p>

          <ul>
            <li>
              <strong>Account Creation:</strong> to allow you to create and manage your account.
            </li>
            <li>
              <strong>Functionality:</strong> to enable the various features of the application that
              you choose to utilize, such as building and saving resumes.
            </li>
          </ul>
        </li>

        <li>
          <h2 className="mb-2">How We Collect Information</h2>
          <p>
            All personal data is provided directly by you. We collect information through our web
            application when you voluntarily provide it to us as part of using our service.
          </p>
        </li>

        <li>
          <h2 className="mb-2">Data Security</h2>
          <p>
            Reactive Resume is committed to ensuring the security of your data. Our application and
            database are hosted on a secure server from DigitalOcean, which has both SOC 2 and SOC 3
            compliance, ensuring that your data is protected with industry-standard security
            measures.
          </p>
        </li>

        <li>
          <h2 className="mb-2">Data Retention</h2>
          <p>
            We retain your personal data as long as your account is active or as needed to provide
            you services. If you do not use your account for 6 months, your personal information is
            automatically deleted from our servers. You may also delete your data at any time via
            the user dashboard.
          </p>
        </li>

        <li>
          <h2 className="mb-2">Third-Party Disclosure</h2>
          <p>
            We do not share your personal information with third parties, ensuring your data is used
            exclusively for the purposes stated in this privacy policy.
          </p>
        </li>

        <li>
          <h2 className="mb-2">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </li>

        <li>
          <h2 className="mb-2">Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to
            contact us at <code>hello[at]amruthpillai[dot]com</code>.
          </p>
        </li>
      </ol>
    </section>
  </main>
);
