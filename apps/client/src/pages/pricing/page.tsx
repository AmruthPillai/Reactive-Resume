/* eslint-disable lingui/no-unlocalized-strings */
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

import { Pricing } from "./sections/pricing/Pricing";

export const PricingPage = () => {
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

      <Pricing />
    </main>
  );
};
