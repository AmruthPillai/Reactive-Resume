import { t } from "@lingui/macro";
import {
  BrainIcon,
  LayoutIcon,
  LockIcon,
  DeviceMobileIcon,
  CloudArrowUpIcon,
  CurrencyCircleDollarIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: <LayoutIcon size={32} weight="duotone" />,
      title: t`Professional Templates`,
      description: t`ATS-optimized designs that get past screening systems and impress recruiters`,
    },
    {
      icon: <BrainIcon size={32} weight="duotone" />,
      title: t`AI-Powered Writing`,
      description: t`Smart suggestions to improve your content, fix grammar, and enhance tone`,
    },
    {
      icon: <DeviceMobileIcon size={32} weight="duotone" />,
      title: t`Mobile Friendly`,
      description: t`Create and edit your CV from any device, anywhere, anytime`,
    },
    {
      icon: <CurrencyCircleDollarIcon size={32} weight="duotone" />,
      title: t`M-PESA Integration`,
      description: t`Pay easily with M-PESA or card. Transparent pricing from KES 100`,
    },
    {
      icon: <CloudArrowUpIcon size={32} weight="duotone" />,
      title: t`Auto-Save & Sync`,
      description: t`Never lose your work. Changes save automatically across all devices`,
    },
    {
      icon: <LockIcon size={32} weight="duotone" />,
      title: t`Private & Secure`,
      description: t`Your data is encrypted and protected. Delete anytime, no questions asked`,
    },
  ];

  return (
    <section id="features" className="relative bg-secondary/20 py-24 sm:py-32 lg:py-40">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            {t`Everything you need to get hired`}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            {t`Professional tools designed specifically for the Kenyan job market`}
          </p>
        </div>

        {/* Features Grid - 2 columns on mobile/tablet, 4 on desktop */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }}
              className="text-center"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex text-info">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
