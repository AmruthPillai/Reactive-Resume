import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

import { FAQSection } from "./sections/faq";
import { FeaturesSection } from "./sections/features";
import { HeroSection } from "./sections/hero";
import { KeywordsSection } from "./sections/keywords";
import { LogoCloudSection } from "./sections/logo-cloud";
import { TemplatesSection } from "./sections/templates";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          {t`Reactive Resume`} - {t`A free and open-source resume builder`}
        </title>

        <meta
          name="description"
          content="A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume."
        />
      </Helmet>

      <HeroSection />
      <LogoCloudSection />
      <FeaturesSection />
      <TemplatesSection />
      <KeywordsSection />
      {/* <TestimonialsSection /> */}
      {/* <SupportSection /> */}
      <FAQSection />
      {/* <ContributorsSection /> */}
    </main>
  );
};
