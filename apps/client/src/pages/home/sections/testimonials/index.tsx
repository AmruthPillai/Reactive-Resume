/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { t, Trans } from "@lingui/macro";
import { QuotesIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const email = "support@cvbuilder.ke";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Brian M.",
    role: "Software Developer",
    quote: "I landed my first developer role within 2 weeks of using CV Builder. The AI suggestions really helped polish my experience section.",
  },
  {
    name: "Lucy W.",
    role: "Marketing Manager",
    quote: "Finally, a CV builder that works with M-PESA! The templates are clean and professional. Worth every shilling.",
  },
  {
    name: "Kelvin O.",
    role: "Recent Graduate",
    quote: "As a fresh graduate with no experience, the AI writing assistant helped me present my projects and internships professionally.",
  },
  {
    name: "Mary K.",
    role: "Accountant",
    quote: "I've tried 5 different CV builders. This is the only one that's truly optimized for Kenyan job applications and local payments.",
  },
  {
    name: "Sam N.",
    role: "Sales Executive",
    quote: "The ability to create multiple CV versions for different roles saved me so much time. Plus the templates actually look modern!",
  },
  {
    name: "Faith A.",
    role: "Data Analyst",
    quote: "Best investment for my career. The lifetime plan gave me unlimited access to all templates and AI features for just KES 1,000.",
  },
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="relative py-24 sm:py-32 lg:py-40 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Section Header - Centered */}
      <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          {t`Loved by Kenyans, trusted by a community`}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
          {t`See what our users have to say about their experience`}
        </p>
      </div>

      {/* Testimonials Grid - 3 columns with cards */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }}
          >
            <figure className="relative h-full rounded-2xl border-2 border-border/50 bg-background p-8 transition-all hover:border-info/50 hover:shadow-lg">
              {/* Quote Icon */}
              <QuotesIcon size={40} weight="fill" className="mb-4 text-info/20" />

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption>
                <div className="font-bold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </figcaption>
            </figure>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
