import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

import { FAQSection } from "./sections/faq";
import { HeroSection } from "./sections/hero";
import { TestimonialsSection } from "./sections/testimonials";
import { PricingSection } from "./sections/pricing";
import { HowItWorksSection } from "./sections/how-it-works";
import { WhatWeOfferSection } from "./sections/what-we-offer";
import { SITE_URL } from "@/client/config/site";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>CV Builder — {t`Create a Professional Kenyan CV Online`}</title>
        <meta name="description" content={t`Free resume builder with M-PESA payments and AI writing tools.`} />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CV Builder" />
        <meta property="og:locale" content="en_KE" />
        <meta property="og:title" content={"CV Builder — " + i18n._("Create a Professional Kenyan CV Online")} />
        <meta property="og:description" content={i18n._("Free resume builder with M-PESA payments and AI writing tools.")} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/screenshots/builder.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"CV Builder — " + i18n._("Create a Professional Kenyan CV Online")} />
        <meta name="twitter:description" content={i18n._("Free resume builder with M-PESA payments and AI writing tools.")} />
        <meta name="twitter:image" content={`${SITE_URL}/screenshots/builder.jpg`} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'CV Builder',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            url: (typeof window !== 'undefined' ? window.location.origin : ''),
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'KES',
              lowPrice: '0',
              highPrice: '1000'
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CV Builder',
            url: (typeof window !== 'undefined' ? window.location.origin : ''),
            logo: '/logo/light.svg'
          })}
        </script>
      </Helmet>

      <HeroSection />
      <WhatWeOfferSection />
      <PricingSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
};
