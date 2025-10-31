import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";

export const PrivacyPolicyPage = () => (
  <>
    <Helmet>
      <title>
        {t`Privacy Policy`} - {t`CV Builder`}
      </title>
    </Helmet>

    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            {t`Back to Home`}
          </Link>
        </Button>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {t`Privacy Policy`}
          </h1>
          <p className="text-muted-foreground">
            {t`Last updated: January 2025`}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h2>{t`1. Introduction`}</h2>
          <p>
            {t`CV Builder ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this policy carefully.`}
          </p>

          <h2>{t`2. Information We Collect`}</h2>

          <h3>{t`2.1 Personal Information`}</h3>
          <p>
            {t`We collect information that you provide directly to us, including:`}
          </p>
          <ul>
            <li>{t`Name and email address (for account creation)`}</li>
            <li>{t`Username and password`}</li>
            <li>{t`CV/Resume content (personal details, work experience, education, skills, etc.)`}</li>
            <li>{t`Profile picture (optional)`}</li>
            <li>{t`Payment information (processed securely through Paystack)`}</li>
          </ul>

          <h3>{t`2.2 Automatically Collected Information`}</h3>
          <p>
            {t`When you use our Service, we automatically collect certain information, including:`}
          </p>
          <ul>
            <li>{t`Device information (browser type, operating system)`}</li>
            <li>{t`IP address and location data`}</li>
            <li>{t`Usage data (pages visited, features used, time spent)`}</li>
            <li>{t`Cookies and similar tracking technologies`}</li>
          </ul>

          <h2>{t`3. How We Use Your Information`}</h2>
          <p>
            {t`We use the collected information for the following purposes:`}
          </p>
          <ul>
            <li>{t`To provide, maintain, and improve our Service`}</li>
            <li>{t`To create and manage your account`}</li>
            <li>{t`To process your payments and transactions`}</li>
            <li>{t`To generate and store your CV documents`}</li>
            <li>{t`To provide AI-powered features and suggestions`}</li>
            <li>{t`To send you technical notices and support messages`}</li>
            <li>{t`To respond to your inquiries and provide customer support`}</li>
            <li>{t`To detect and prevent fraud and security issues`}</li>
            <li>{t`To analyze usage patterns and improve user experience`}</li>
          </ul>

          <h2>{t`4. Data Storage and Security`}</h2>
          <p>
            {t`We implement industry-standard security measures to protect your information:`}
          </p>
          <ul>
            <li>{t`Data is encrypted in transit using SSL/TLS`}</li>
            <li>{t`Passwords are securely hashed and never stored in plain text`}</li>
            <li>{t`Database access is restricted and monitored`}</li>
            <li>{t`Regular security audits and updates`}</li>
            <li>{t`Data is stored on secure cloud infrastructure`}</li>
          </ul>
          <p>
            {t`However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`}
          </p>

          <h2>{t`5. Data Sharing and Disclosure`}</h2>
          <p>
            {t`We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:`}
          </p>
          <ul>
            <li>
              <strong>{t`Service Providers:`}</strong> {t`We work with third-party service providers (Paystack for payments, OpenAI for AI features, Minio for file storage) who help us operate our Service.`}
            </li>
            <li>
              <strong>{t`Legal Requirements:`}</strong> {t`We may disclose your information if required by law or in response to valid legal requests.`}
            </li>
            <li>
              <strong>{t`Business Transfers:`}</strong> {t`In the event of a merger, acquisition, or sale of assets, your information may be transferred.`}
            </li>
            <li>
              <strong>{t`With Your Consent:`}</strong> {t`We may share information with your explicit consent or at your direction.`}
            </li>
          </ul>

          <h2>{t`6. Your Rights and Choices`}</h2>
          <p>
            {t`You have the following rights regarding your personal information:`}
          </p>
          <ul>
            <li>
              <strong>{t`Access:`}</strong> {t`You can access your account information at any time.`}
            </li>
            <li>
              <strong>{t`Correction:`}</strong> {t`You can update or correct your information through your account settings.`}
            </li>
            <li>
              <strong>{t`Deletion:`}</strong> {t`You can delete your account and all associated data at any time. Once deleted, your data cannot be recovered.`}
            </li>
            <li>
              <strong>{t`Export:`}</strong> {t`You can download your CV data in JSON format.`}
            </li>
            <li>
              <strong>{t`Opt-out:`}</strong> {t`You can opt out of marketing communications (we don't send marketing emails currently).`}
            </li>
          </ul>

          <h2>{t`7. Cookies and Tracking`}</h2>
          <p>
            {t`We use cookies and similar technologies to:`}
          </p>
          <ul>
            <li>{t`Keep you signed in`}</li>
            <li>{t`Remember your preferences (theme, language)`}</li>
            <li>{t`Analyze usage patterns`}</li>
            <li>{t`Improve Service performance`}</li>
          </ul>
          <p>
            {t`You can control cookies through your browser settings, but disabling cookies may affect Service functionality.`}
          </p>

          <h2>{t`8. Third-Party Services`}</h2>
          <p>
            {t`Our Service integrates with third-party services:`}
          </p>
          <ul>
            <li>
              <strong>{t`Paystack:`}</strong> {t`Payment processing (see Paystack's Privacy Policy)`}
            </li>
            <li>
              <strong>{t`OpenAI:`}</strong> {t`AI-powered features (see OpenAI's Privacy Policy)`}
            </li>
            <li>
              <strong>{t`Minio:`}</strong> {t`File storage for images and PDFs`}
            </li>
          </ul>
          <p>
            {t`These third parties have their own privacy policies governing their use of your information.`}
          </p>

          <h2>{t`9. Children's Privacy`}</h2>
          <p>
            {t`Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us to have it removed.`}
          </p>

          <h2>{t`10. International Data Transfers`}</h2>
          <p>
            {t`Your information may be transferred to and processed in countries other than Kenya. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.`}
          </p>

          <h2>{t`11. Data Retention`}</h2>
          <p>
            {t`We retain your information for as long as your account is active or as needed to provide you with our Service. You can delete your account at any time, and we will delete your personal information within 30 days, except as required by law.`}
          </p>

          <h2>{t`12. Changes to This Privacy Policy`}</h2>
          <p>
            {t`We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.`}
          </p>

          <h2>{t`13. Contact Us`}</h2>
          <p>
            {t`If you have any questions about this Privacy Policy or our data practices, please contact us at:`}
          </p>
          <p>
            <strong>{t`Email:`}</strong> support@cvbuilder.ke
          </p>

          <h2>{t`14. Your Kenyan Privacy Rights`}</h2>
          <p>
            {t`Under the Kenya Data Protection Act, 2019, you have specific rights regarding your personal data. We are committed to complying with all applicable Kenyan data protection laws and regulations.`}
          </p>
        </div>
      </div>
    </main>
  </>
);
