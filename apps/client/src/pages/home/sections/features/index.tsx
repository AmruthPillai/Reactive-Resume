import { t } from "@lingui/macro";
import { IconContext } from "@phosphor-icons/react";
import { cn, languages, templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { useCallback } from "react";

import type { Feature } from "@/client/data/features";
import { getFeaturesData } from "@/client/data/features";

const featureLabel = cn(
  "flex cursor-default items-center justify-center gap-x-2 rounded bg-secondary px-4 py-3 text-sm font-medium leading-none text-primary transition-colors hover:bg-primary hover:text-background",
);

export const FeaturesSection = () => {
  const languagesCount = languages.length;
  const templatesCount = templatesList.length;

  const features = useCallback(
    (): Feature[] => getFeaturesData(languagesCount, templatesCount),
    [languagesCount, templatesCount],
  );

  return (
    <section id="features" className="relative bg-secondary-accent py-24 sm:py-32">
      <div className="container">
        <div className="space-y-6 leading-loose">
          <h2 className="text-4xl font-bold">{t`Rich in features, not in pricing.`}</h2>
          <p className="max-w-4xl text-base leading-relaxed">
            {t`Reactive Resume is a passion project of over 3 years of hard work, and with that comes a number of re-iterated ideas and features that have been built to (near) perfection.`}
          </p>

          <IconContext.Provider value={{ size: 14, weight: "bold" }}>
            <div className="!mt-12 flex flex-wrap items-center gap-4">
              {features().map((feature, index) => (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  className={cn(featureLabel, feature.className)}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                >
                  {feature.icon}
                  <h3>{feature.title}</h3>
                </motion.div>
              ))}

              <motion.p
                viewport={{ once: true }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: (features.length + 1) * 0.1 },
                }}
              >
                {t`and many more...`}
              </motion.p>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </section>
  );
};
