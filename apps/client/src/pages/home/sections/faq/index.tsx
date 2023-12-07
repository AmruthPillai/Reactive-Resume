/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useLanguages } from "@/client/services/resume/translation";

// What is a live resume?
const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      What is a live resume?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        A live resume is an interactive online document that goes beyond static text. It allows you
        to embed multimedia content, update achievements in real-time, and engage with recruiters in
        a dynamic way.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// What is an AI resume builder?
const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      What is an AI resume builder?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        An AI resume builder uses artificial intelligence to help you create a professional and
        targeted resume. It can analyze your skills and experience, suggest relevant keywords, and
        provide personalized feedback.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// What are the benefits of using your website to build a live resume?
const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left leading-relaxed">
      What are the benefits of using your website to build a live resume?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        <strong>Stand out from the crowd: </strong> Capture recruiter attention with a dynamic and
        interactive resume.
      </p>
      <p>
        <strong>Increase interview rates: </strong> Engage with recruiters and showcase your skills
        in a memorable way.
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
        <strong>Track your progress: </strong> Gain valuable insights into your job search and make
        data-driven decisions.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// What languages are supported on Reactive Resume?
const Question4 = () => {
  const { languages } = useLanguages();

  return (
    <AccordionItem value="4">
      <AccordionTrigger className="text-left leading-relaxed">
        What languages are supported on Reactive Resume?
      </AccordionTrigger>
      <AccordionContent className="prose max-w-none dark:prose-invert">
        <p>
          Here are the languages currently supported by Reactive Resume, along with their respective
          completion percentages.
        </p>

        <div className="flex flex-wrap items-start justify-start gap-x-2 gap-y-4">
          {languages.map((language) => (
            <a
              key={language.id}
              target="_blank"
              rel="noreferrer"
              className="no-underline"
              href={`https://crowdin.com/translate/reactive-resume/all/en-${language.editorCode}`}
            >
              <div className="relative bg-secondary-accent font-medium transition-colors hover:bg-primary hover:text-background">
                <span className="px-2 py-1">{language.name}</span>

                {language.progress !== undefined && (
                  <span
                    className={cn(
                      "inset-0 bg-warning px-1.5 py-1 text-xs text-white",
                      language.progress < 40 && "bg-error",
                      language.progress > 80 && "bg-success",
                    )}
                  >
                    {language.progress}%
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <p>
          If you'd like to improve the translations for your language, please{" "}
          <a href="https://crowdin.com/project/reactive-resume" rel="noreferrer" target="_blank">
            sign up as a translator on Crowdin
          </a>{" "}
          and join the project. You can also choose to be notified of any new phrases that get added
          to the app.
        </p>

        <p>
          If a language is missing from this list, please raise an issue on GitHub requesting its
          inclusion, and I will make sure to add it as soon as possible.
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

// How does the OpenAI Integration work?
const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      How does the OpenAI Integration work?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        OpenAI has been a game-changer for all of us. I cannot tell you how much ChatGPT has helped
        me in my everyday work and with the development of Reactive Resume. It only makes sense that
        you leverage what AI has to offer and let it help you build the perfect resume.
      </p>

      <p>
        While most applications out there charge you a fee to use their AI services (rightfully so,
        because it isn't cheap), you can choose to enter your own OpenAI API key on the Settings
        page (under OpenAI Integration).{" "}
        <strong>The key is stored in your browser's local storage</strong>, which means that if you
        uninstall your browser, or even clear your data, the key is gone with it. All requests made
        to OpenAI are also sent directly to their service and does not hit the app servers at all.
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
        and probably might change over a period of time, but while it's available, I would keep the
        feature on the app.
      </p>

      <p>
        You are free to turn off all AI features (and not be aware of it's existence) simply by not
        adding a key in the Settings page and still make use of all the useful features that
        Reactive Resume has to offer. I would even suggest you to take the extra step of using
        ChatGPT to write your content, and simply copy it over to Reactive Resume.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// How does your AI resume builder work?
const Question6 = () => (
  <AccordionItem value="6">
    <AccordionTrigger className="text-left leading-relaxed">
      How does your AI resume builder work?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Our AI resume builder analyzes your information and provides personalized recommendations
        for content, keywords, and formatting. It also helps you optimize your resume for ATS and
        ensures it is professional and impactful.
      </p>
    </AccordionContent>
  </AccordionItem>
);

//  Is my live resume publicly accessible?
const Question7 = () => (
  <AccordionItem value="7">
    <AccordionTrigger className="text-left leading-relaxed">
      Is my live resume publicly accessible?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        You can choose whether to publish your live resume publicly or share it with specific
        individuals through private links.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// How does the AI help me build a better resume?
const Question8 = () => (
  <AccordionItem value="8">
    <AccordionTrigger className="text-left leading-relaxed">
      How does the AI help me build a better resume?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        The AI analyzes your skills and experience, suggests relevant keywords and phrases, provides
        feedback on writing style and formatting, and ensures your resume is optimized for ATS.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// How can I track who has viewed my live resume?
const Question9 = () => (
  <AccordionItem value="9">
    <AccordionTrigger className="text-left leading-relaxed">
      How can I track who has viewed my live resume?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Our Live Resume Analytics feature provides detailed reports on viewer engagement, including
        the number of views, time spent, and actions taken.
      </p>
    </AccordionContent>
  </AccordionItem>
);

export const FAQSection = () => (
  <section id="faq" className="container relative py-24 sm:py-32">
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">
          Need help navigating the world of Live Resumes and AI Resume Builders?
        </h2>

        <p className="text-base leading-loose">
          We've got you covered! Get answers to all your frequently asked questions and unlock the
          power of this dynamic duo to land your dream job.
        </p>

        <p className="text-sm leading-loose">
          Unfortunately, this section is available only in English, as I do not want to burden
          translators with having to translate these large paragraphs of text.
        </p>
      </div>

      <div className="col-span-2">
        <Accordion collapsible type="single">
          <Question1 />
          <Question2 />
          <Question3 />
          <Question4 />
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
