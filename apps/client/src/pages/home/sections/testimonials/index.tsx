/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { t, Trans } from "@lingui/macro";
import { Quotes } from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

const email = "hello@amruthpillai.com";

type Testimonial = {
  quote: string;
  name: string;
};

const testimonials: Testimonial[][] = [
  [
    {
      name: "N. Elnour",
      quote:
        "This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!",
    },
    {
      name: "S. Bhaije",
      quote:
        "Hi Amruth! First off, many thanks for making RxResume! This is one of the best resume-building tools I have ever found. Have also recommended it to many of my university friends...",
    },
    {
      name: "K. Lietzau",
      quote:
        "Hi, I just found your resume builder, and I just want to say, I really appreciate it! The moment I saw it was open source, I closed all the other CV sites I was considering. Thank you for your service.",
    },
  ],
  [
    {
      name: "R. Sinnot",
      quote:
        "Hey, Just wanted to let you know you not only helped me get a job, you helped my partner and my childhood friend, who then used your site to help one of her friends get a job. I sponsored you on Github to give back a bit but I wanted to let you know you really made a difference with your resume builder.",
    },
    {
      name: "P. Jignesh",
      quote:
        "Hey, I am a Mechanical engineer, not understand coding, messy AI, and computer systems, But wait, what drags me here is your creativity, Your website RxResume is all good! using it and the efforts you made to keep this free is remarkable. keeping doing great work.",
    },
  ],
  [
    {
      name: "A. Rehman",
      quote:
        "Hey Amruth, I have loved your Reactive Resume Website. Thank you so much for making this kind of thing.",
    },
    {
      name: "S. Innocent",
      quote:
        "First of all, I appreciate your effort for making reactive resume a free tool for the community. Very much better than many premium resume builder...",
    },
    {
      name: "M. Fritza",
      quote:
        "Hello sir, I just wanted to write a thank you message for developing RxResume. It's easy to use, intuitive and it's much more practical than many others that made you pay up after spending an hour to create your CV. I'll be sure to buy you a coffee after I get my first job. I wish you everything best in life!",
    },
  ],
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="container relative space-y-12 py-24 sm:py-32">
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">{t`Testimonials`}</h1>
      <p className="mx-auto max-w-2xl leading-relaxed">
        <Trans>
          I always love to hear from the users of Reactive Resume with feedback or support. Here are
          some of the messages I've received. If you have any feedback, feel free to drop me an
          email at{" "}
          <a href={email} className="underline">
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
              <Quotes size={64} className="absolute -right-3 bottom-0 opacity-20" />
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
