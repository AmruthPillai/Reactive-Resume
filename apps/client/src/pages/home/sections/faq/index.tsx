import { t, Trans } from "@lingui/macro";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: t`Can I start free?`,
    a: (
      <p>
        <Trans>
          Yes. Create an account and use 3 modern templates with basic features at no cost.
          Upgrade anytime for more templates or AI.
        </Trans>
      </p>
    ),
  },
  {
    q: t`How do I pay?`,
    a: (
      <p>
        <Trans>
          We support M-PESA and card payments securely via Paystack. Choose a plan and pay in KES.
        </Trans>
      </p>
    ),
  },
  {
    q: t`What does the AI feature do?`,
    a: (
      <p>
        <Trans>
          AI helps you rephrase bullet points, fix grammar, and adjust tone so your CV reads clear
          and professional. Available in the AI Add-on and Lifetime plans.
        </Trans>
      </p>
    ),
  },
  {
    q: t`Is my data safe?`,
    a: (
      <p>
        <Trans>
          We take privacy seriously. Your data is stored securely, and you can delete your account
          and resumes anytime.
        </Trans>
      </p>
    ),
  },
  {
    q: t`Can I upgrade later?`,
    a: (
      <p>
        <Trans>
          Yes. You can start free and upgrade to Templates Pack, AI Add-on, or Lifetime whenever you
          need more features.
        </Trans>
      </p>
    ),
  },
  {
    q: t`Are templates optimized for Kenyan employers?`,
    a: (
      <p>
        <Trans>
          Our templates are clean, modern, and ATS-friendly, designed to meet expectations of
          Kenyan employers and recruiters.
        </Trans>
      </p>
    ),
  },
  {
    q: t`How do I get support?`,
    a: (
      <p>
        <Trans>
          Email our team at <a href="mailto:support@cvbuilder.ke">support@cvbuilder.ke</a> and we’ll
          be happy to help.
        </Trans>
      </p>
    ),
  },
];

export const FAQSection = () => (
  <section id="faq" className="relative py-24 sm:py-32 lg:py-40 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Section Header - Centered */}
      <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          {t`Frequently Asked Questions`}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
          {t`Got questions? We've got answers. Find everything you need to know about pricing, features, payments, and privacy.`}
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-3xl">
        <Accordion collapsible type="single" className="space-y-4">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={String(i + 1)}
              className="border-2 border-border/50 rounded-xl px-6 bg-background hover:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-bold py-5 hover:no-underline text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

