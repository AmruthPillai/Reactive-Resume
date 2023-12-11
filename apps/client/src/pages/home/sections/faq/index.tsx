/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useLanguages } from "@/client/services/resume/translation";
import { Trans, t } from "@lingui/macro";

// What is a live resume?
const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`What is a live resume?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          A live resume is an interactive online document that goes beyond static text. It allows
          you to embed multimedia content, update achievements in real-time, and engage with
          recruiters in a dynamic way.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

// What is an AI resume builder?
const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`What is an AI resume builder?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          An AI resume builder uses artificial intelligence to help you create a professional and
          targeted resume. It can analyze your skills and experience, suggest relevant keywords, and
          provide personalized feedback.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

// What are the benefits of using your website to build a live resume?
const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`What are the benefits of using your website to build a live resume?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          <strong>Stand out from the crowd: </strong> Capture recruiter attention with a dynamic and
          interactive resume.
        </p>
        <p>
          <strong>Increase interview rates: </strong> Engage with recruiters and showcase your
          skills in a memorable way.
        </p>
        <p>
          <strong>Get hired faster: </strong> Optimize your resume for Applicant Tracking Systems
          (ATS) and land more interviews.
        </p>
        <p>
          <strong>Build your brand: </strong> Create a professional online presence that showcases
          your best assets.
        </p>
        <p>
          <strong>Track your progress: </strong> Gain valuable insights into your job search and
          make data-driven decisions.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

const Question4 = () => null;

// How does the OpenAI Integration work?
const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`How does the OpenAI Integration work?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          OpenAI has been a game-changer for all of us. I cannot tell you how much ChatGPT has
          helped me in my everyday work and with the development of Reactive Resume. It only makes
          sense that you leverage what AI has to offer and let it help you build the perfect resume.
        </p>

        <p>
          While most applications out there charge you a fee to use their AI services (rightfully
          so, because it isn't cheap), you can choose to enter your own OpenAI API key on the
          Settings page (under OpenAI Integration).{" "}
          <strong>The key is stored in your browser's local storage</strong>, which means that if
          you uninstall your browser, or even clear your data, the key is gone with it. All requests
          made to OpenAI are also sent directly to their service and does not hit the app servers at
          all.
        </p>

        <p>
          The policy behind "bring your own key" (BYOK) is{" "}
          <a
            href="https://community.openai.com/t/openais-bring-your-own-key-policy/14538/46"
            target="_blank"
            rel="noreferrer"
          >
            still being discussed
          </a>{" "}
          and probably might change over a period of time, but while it's available, I would keep
          the feature on the app.
        </p>

        <p>
          You are free to turn off all AI features (and not be aware of it's existence) simply by
          not adding a key in the Settings page and still make use of all the useful features that
          Reactive Resume has to offer. I would even suggest you to take the extra step of using
          ChatGPT to write your content, and simply copy it over to Reactive Resume.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

// How does your AI resume builder work?
const Question6 = () => (
  <AccordionItem value="6">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`How does your AI resume builder work?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          Our AI resume builder analyzes your information and provides personalized recommendations
          for content, keywords, and formatting. It also helps you optimize your resume for ATS and
          ensures it is professional and impactful.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

//  Is my live resume publicly accessible?
const Question7 = () => (
  <AccordionItem value="7">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`Is my live resume publicly accessible?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          You can choose whether to publish your live resume publicly or share it with specific
          individuals through private links.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

// How does the AI help me build a better resume?
const Question8 = () => (
  <AccordionItem value="8">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`How does the AI help me build a better resume?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          The AI analyzes your skills and experience, suggests relevant keywords and phrases,
          provides feedback on writing style and formatting, and ensures your resume is optimized
          for ATS.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

// How can I track who has viewed my live resume?
const Question9 = () => (
  <AccordionItem value="9">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`How can I track who has viewed my live resume?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <Trans>
        <p>
          Our Live Resume Analytics feature provides detailed reports on viewer engagement,
          including the number of views, time spent, and actions taken.
        </p>
      </Trans>
    </AccordionContent>
  </AccordionItem>
);

export const FAQSection = () => (
  <section id="faq" className="container relative py-24 sm:py-32">
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">
          {t`Need help navigating the world of Live Resumes and AI Resume Builders?`}
        </h2>
        <Trans>
          <p className="text-base leading-loose">
            We've got you covered! Get answers to all your frequently asked questions and unlock the
            power of this dynamic duo to land your dream job.
          </p>

          <p className="text-sm leading-loose">
            Unfortunately, this section is available only in English, as I do not want to burden
            translators with having to translate these large paragraphs of text.
          </p>
        </Trans>
      </div>

      <div className="col-span-2">
        <Accordion collapsible type="single">
          <Question1 />
          <Question2 />
          <Question3 />
          {/* <Question4 /> */}
          <Question5 />
          <Question6 />
          <Question7 />
          <Question8 />
          <Question9 />
        </Accordion>
      </div>
    </div>
  </section>
);
