import { t } from "@lingui/macro";
import {
  SparkleIcon,
  DevicesIcon,
  ShareNetworkIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

type Offer = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
};

const items: Offer[] = [
  {
    icon: <SparkleIcon size={40} weight="duotone" />,
    title: t`Smart CV Builder`,
    desc: t`Create professional CVs with intelligent tools`,
    features: [
      t`ATS-optimized templates`,
      t`AI writing assistance`,
      t`Custom styling & fonts`,
      t`Real-time preview`,
    ],
  },
  {
    icon: <DevicesIcon size={40} weight="duotone" />,
    title: t`Work Anywhere`,
    desc: t`Access your CVs from any device, anytime`,
    features: [
      t`Cloud auto-save`,
      t`Mobile responsive`,
      t`Multiple CV versions`,
      t`Cross-device sync`,
    ],
  },
  {
    icon: <ShareNetworkIcon size={40} weight="duotone" />,
    title: t`Share & Export`,
    desc: t`Download or share your CV with ease`,
    features: [
      t`PDF downloads`,
      t`Public share links`,
      t`Print-ready format`,
      t`Instant updates`,
    ],
  },
  {
    icon: <ShieldCheckIcon size={40} weight="duotone" />,
    title: t`Safe & Secure`,
    desc: t`Your data is private and always protected`,
    features: [
      t`Encrypted storage`,
      t`M-PESA payments`,
      t`No data sharing`,
      t`Delete anytime`,
    ],
  },
];

export const WhatWeOfferSection = () => (
  <section id="what-we-offer" className="relative bg-background py-24 sm:py-32 lg:py-40">
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Section Header - Centered */}
      <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          {t`What we offer`}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
          {t`All the tools you need to craft a standout Kenyan CV`}
        </p>
      </div>

      {/* Cards Grid - 4 cards (2x2) with white cards on white background */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }}
          >
            <div className="h-full rounded-2xl border-2 border-border/50 bg-background p-8 transition-all hover:border-info/50 hover:shadow-lg">
              {/* Icon */}
              <div className="mb-6 inline-flex text-info">{item.icon}</div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-6">{item.desc}</p>

              {/* Features List */}
              <ul className="space-y-2">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-info mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

