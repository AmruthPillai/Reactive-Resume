import { t } from "@lingui/macro";
import {
  BrainIcon,
  CheckCircleIcon,
  CurrencyDollarSimpleIcon,
  LayoutIcon,
  LockIcon,
  IconContext,
} from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

type Feature = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};

const featureLabel = cn(
  "flex cursor-default items-center justify-center gap-x-2 rounded bg-secondary px-4 py-3 text-sm font-medium leading-none text-primary transition-colors hover:bg-primary hover:text-background",
);

export const FeaturesSection = () => {
  const features: Feature[] = [
    { icon: <LayoutIcon />, title: t`Modern Templates` },
    { icon: <BrainIcon />, title: t`AI Writing Assistant` },
    { icon: <CurrencyDollarSimpleIcon />, title: t`Affordable Plans (from KES 100)` },
    { icon: <LockIcon />, title: t`Secure & Private` },
  ];

  return (
    <section id="features" className="relative bg-secondary-accent py-24 sm:py-32">
      <div className="container">
        <div className="space-y-6 leading-loose">
          <h2 className="text-4xl font-bold">{t`Everything you need to get hired`}</h2>
          <p className="max-w-4xl text-base leading-relaxed">
            {t`Job-ready designs optimized for Kenyan employers, instant AI help for rephrasing and grammar, simple pricing with M-PESA, and privacy-first by design.`}
          </p>

          <IconContext.Provider value={{ size: 14, weight: "bold" }}>
            <div className="!mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
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
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </section>
  );
};
