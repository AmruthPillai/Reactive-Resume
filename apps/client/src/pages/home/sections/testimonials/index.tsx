/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { t, Trans } from "@lingui/macro";
import { QuotesIcon } from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

const email = "support@cvbuilder.ke";

type Testimonial = {
  quote: string;
  name: string;
};

const testimonials: Testimonial[][] = [
  [
    {
      name: "Brian, Strathmore University",
      quote: "I landed my internship after improving my CV here.",
    },
    {
      name: "Lucy, Nairobi",
      quote: "Affordable and fast. I paid with M-PESA instantly.",
    },
    {
      name: "Kelvin, Kisumu",
      quote: "Clean templates and the AI made my CV sound professional.",
    },
  ],
  [
    {
      name: "Mary, JKUAT",
      quote: "Took me under 10 minutes to create a job-ready CV.",
    },
    {
      name: "Sam, Mombasa",
      quote: "I liked the simple pricing and local payment options.",
    },
  ],
  [
    {
      name: "Faith, Eldoret",
      quote: "Great for fresh graduates. Templates are modern and ATS-friendly.",
    },
    {
      name: "Dennis, Nakuru",
      quote: "The best Kenyan CV builder I’ve tried.",
    },
  ],
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="container relative space-y-12 py-24 sm:py-32">
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">{t`Testimonials`}</h1>
      <p className="mx-auto max-w-2xl leading-relaxed">
        <Trans>
          Trusted by 5,000+ Kenyan job seekers. Have feedback? Email us at{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </Trans>
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-y-0">
      {testimonials.map((columnGroup, groupIndex) => (
        <div key={groupIndex} className="space-y-8">
          {columnGroup.map((testimonial, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.25 } }}
              className={cn(
                "relative overflow-hidden rounded-lg bg-secondary-accent p-5 text-primary shadow-lg",
                index > 0 && "hidden lg:block",
              )}
            >
              <QuotesIcon size={64} className="absolute -right-3 bottom-0 opacity-20" />
              <blockquote className="italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-medium">{testimonial.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      ))}
    </div>
  </section>
);
