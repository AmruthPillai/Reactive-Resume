import { t } from "@lingui/macro";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Badge, buttonVariants } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { defaultTiltProps } from "@/client/constants/parallax-tilt";

import { HeroCTA } from "./call-to-action";
import { Decoration } from "./decoration";

export const HeroSection = () => (
  <section id="hero" className="relative overflow-hidden">
    <Decoration.Grid />
    <Decoration.Gradient />

    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid gap-12 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:grid-cols-2 lg:gap-16 lg:pt-48 lg:pb-32 xl:gap-20">
        {/* Left Column - Content */}
        <motion.div
          className="flex flex-col justify-center"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Heading */}
          <div className="space-y-6 mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
              {t`Create a Professional Kenyan CV in Minutes`}
            </h1>
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed sm:text-lg mb-8 max-w-xl">
            {t`Start free. Upgrade anytime with M-PESA or Card. Build ATS-friendly CVs and cover letters fast with modern templates and AI writing.`}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <HeroCTA />
          </div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className="relative flex items-center justify-center lg:justify-end"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <div className="relative w-full max-w-2xl">
            <Tilt {...defaultTiltProps}>
              <img
                width={3600}
                height={2078}
                src="/screenshots/builder.jpg"
                alt="CV Builder - Screenshot - Builder Screen"
                className="w-full rounded-xl border border-border/50 bg-background shadow-2xl ring-1 ring-foreground/5"
              />
            </Tilt>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
