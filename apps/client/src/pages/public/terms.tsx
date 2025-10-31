import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";

export const TermsOfServicePage = () => (
  <>
    <Helmet>
      <title>
        {t`Terms of Service`} - {t`CV Builder`}
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
            {t`Terms of Service`}
          </h1>
          <p className="text-muted-foreground">
            {t`Last updated: January 2025`}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h2>{t`1. Acceptance of Terms`}</h2>
          <p>
            {t`By accessing and using CV Builder ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.`}
          </p>

          <h2>{t`2. Description of Service`}</h2>
          <p>
            {t`CV Builder is an online platform that allows users to create, edit, and manage professional CVs and resumes. The Service includes both free and paid features, with payments processed securely through Paystack and M-PESA.`}
          </p>

          <h2>{t`3. User Accounts`}</h2>
          <p>
            {t`To access certain features of the Service, you must create an account. You are responsible for:`}
          </p>
          <ul>
            <li>{t`Maintaining the confidentiality of your account credentials`}</li>
            <li>{t`All activities that occur under your account`}</li>
            <li>{t`Notifying us immediately of any unauthorized use`}</li>
            <li>{t`Providing accurate and complete information`}</li>
          </ul>

          <h2>{t`4. Payments and Subscriptions`}</h2>
          <p>
            {t`CV Builder offers various pricing plans:`}
          </p>
          <ul>
            <li>{t`Free Plan: Basic features at no cost`}</li>
            <li>{t`Templates Pack: One-time payment of KES 100`}</li>
            <li>{t`AI Power: One-time payment of KES 500`}</li>
            <li>{t`Lifetime Access: One-time payment of KES 1,000`}</li>
          </ul>
          <p>
            {t`All payments are processed securely through Paystack. Payments are non-refundable except as required by law or as stated in our refund policy.`}
          </p>

          <h2>{t`5. Refund Policy`}</h2>
          <p>
            {t`We offer a 7-day money-back guarantee. If you are not satisfied with your purchase, contact our support team within 7 days of payment for a full refund.`}
          </p>

          <h2>{t`6. User Content`}</h2>
          <p>
            {t`You retain all rights to the content you create using CV Builder, including your CV data and personal information. We do not claim ownership of your content. You grant us a limited license to host and display your content solely for the purpose of providing the Service.`}
          </p>

          <h2>{t`7. Prohibited Uses`}</h2>
          <p>
            {t`You may not use the Service to:`}
          </p>
          <ul>
            <li>{t`Violate any laws or regulations`}</li>
            <li>{t`Infringe on intellectual property rights`}</li>
            <li>{t`Upload malicious code or viruses`}</li>
            <li>{t`Harass, abuse, or harm others`}</li>
            <li>{t`Attempt to gain unauthorized access to our systems`}</li>
            <li>{t`Use the Service for any illegal or fraudulent purpose`}</li>
          </ul>

          <h2>{t`8. Intellectual Property`}</h2>
          <p>
            {t`The Service, including its original content, features, and functionality, is owned by CV Builder and is protected by international copyright, trademark, and other intellectual property laws.`}
          </p>

          <h2>{t`9. AI Features`}</h2>
          <p>
            {t`Our AI-powered features use OpenAI's technology to help improve your CV content. By using AI features, you acknowledge that AI-generated content should be reviewed and may require editing. We are not responsible for the accuracy or appropriateness of AI-generated suggestions.`}
          </p>

          <h2>{t`10. Termination`}</h2>
          <p>
            {t`We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.`}
          </p>

          <h2>{t`11. Limitation of Liability`}</h2>
          <p>
            {t`To the maximum extent permitted by law, CV Builder shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.`}
          </p>

          <h2>{t`12. Changes to Terms`}</h2>
          <p>
            {t`We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated terms.`}
          </p>

          <h2>{t`13. Governing Law`}</h2>
          <p>
            {t`These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.`}
          </p>

          <h2>{t`14. Contact Information`}</h2>
          <p>
            {t`If you have any questions about these Terms of Service, please contact us at:`}
          </p>
          <p>
            <strong>{t`Email:`}</strong> support@cvbuilder.ke
          </p>
        </div>
      </div>
    </main>
  </>
);
