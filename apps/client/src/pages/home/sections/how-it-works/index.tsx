import { t } from "@lingui/macro";
import { UserCirclePlusIcon, PencilLineIcon, DownloadIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <UserCirclePlusIcon size={28} weight="bold" />,
    title: t`Sign up for free`,
    description: t`Create your account in under 30 seconds with email or social login`,
  },
  {
    icon: <PencilLineIcon size={28} weight="bold" />,
    title: t`Build your CV`,
    description: t`Choose a template, fill in your details, and let AI help you write better content`,
  },
  {
    icon: <DownloadIcon size={28} weight="bold" />,
    title: t`Download & apply`,
    description: t`Export as PDF, share online, or upgrade for premium templates and features`,
  },
];

export const HowItWorksSection = () => (
  <section id="how-it-works" className="relative py-24 sm:py-32 lg:py-40 bg-secondary/20">
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          {t`Get started in 3 simple steps`}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
          {t`Creating a professional CV has never been this easy`}
        </p>
      </div>

      {/* Steps Grid - Simple centered layout without cards */}
      <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.5 } }}
            className="text-center"
          >
            {/* Icon Circle */}
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-info text-info-foreground">
              {step.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

