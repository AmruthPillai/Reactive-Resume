import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

// import { ContributorsSection } from "./sections/contributors";
// import { FAQSection } from "./sections/faq";
// import { FeaturesSection } from "./sections/features";
// import { LogoCloudSection } from "./sections/logo-cloud";
// import { StatisticsSection } from "./sections/statistics";
// import { SupportSection } from "./sections/support";
// import { TestimonialsSection } from "./sections/testimonials";
import { HeroSection } from "./sections/hero";
import { TemplatesSection } from "./sections/templates";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          {t`Talent Hub`} - {t`Talent Resume`}
        </title>

        <meta
          name="description"
          content="A free resume builder that simplifies the process of creating, updating, and sharing your resume..."
        />
      </Helmet>

      <HeroSection />
      {/* <LogoCloudSection /> */}
      {/* <StatisticsSection /> */}
      {/* <FeaturesSection /> */}
      <TemplatesSection />
      {/* <TestimonialsSection /> */}
      {/* <SupportSection /> */}
      {/* <FAQSection /> */}
      {/* <ContributorsSection /> */}
    </main>
  );
};
