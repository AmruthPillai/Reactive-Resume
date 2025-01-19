import { t, Trans } from "@lingui/macro";
import { Book, EnvelopeSimpleOpen, GithubLogo, HandHeart } from "@phosphor-icons/react";
import {
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { SectionIcon } from "../shared/section-icon";

const DonateCard = () => (
  <Card className="space-y-4 bg-info text-info-foreground">
    <CardContent className="space-y-2">
      <CardTitle>{t`Support the app by donating what you can!`}</CardTitle>
      <CardDescription className="space-y-2">
        <Trans>
          <p>
            I built Reactive Resume mostly by myself during my spare time, with a lot of help from
            other great open-source contributors.
          </p>
          <p>
            If you like the app and want to support keeping it free forever, please donate whatever
            you can afford to give.
          </p>
        </Trans>
      </CardDescription>
    </CardContent>
    <CardFooter>
      <a
        href="https://opencollective.com/reactive-resume"
        className={cn(buttonVariants({ size: "sm" }))}
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        <HandHeart size={14} weight="bold" className="mr-2" />
        <span className="line-clamp-1">{t`Donate to Reactive Resume`}</span>
      </a>
    </CardFooter>
  </Card>
);

const IssuesCard = () => (
  <Card className="space-y-4">
    <CardContent className="space-y-2">
      <CardTitle>{t`Found a bug, or have an idea for a new feature?`}</CardTitle>
      <CardDescription className="space-y-2">
        <Trans>
          <p>I'm sure the app is not perfect, but I'd like for it to be.</p>
          <p>
            If you faced any issues while creating your resume, or have an idea that would help you
            and other users in creating your resume more easily, drop an issue on the repository or
            send me an email about it.
          </p>
        </Trans>
      </CardDescription>
    </CardContent>
    <CardFooter className="space-x-4">
      <a
        href="https://github.com/AmruthPillai/Reactive-Resume/issues/new/choose"
        className={cn(buttonVariants({ size: "sm" }))}
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        <GithubLogo size={14} weight="bold" className="mr-2" />
        <span className="line-clamp-1">{t`Raise an issue`}</span>
      </a>

      <a className={cn(buttonVariants({ size: "sm" }))} href="mailto:hello@amruthpillai.com">
        <EnvelopeSimpleOpen size={14} weight="bold" className="mr-2" />
        <span className="line-clamp-1">{t`Send me a message`}</span>
      </a>
    </CardFooter>
  </Card>
);

const DocumentationCard = () => (
  <Card className="space-y-4">
    <CardContent className="space-y-2">
      <CardTitle>{t`Don't know where to begin? Hit the docs!`}</CardTitle>
      <CardDescription className="space-y-2">
        <Trans>
          <p>
            The community has spent a lot of time writing the documentation for Reactive Resume, and
            I'm sure it will help you get started with the app.
          </p>
          <p>
            There are also a lot of examples to help you get started, and features that you might
            not know about which could help you build your perfect resume.
          </p>
        </Trans>
      </CardDescription>
    </CardContent>
    <CardFooter className="space-x-4">
      <a
        className={cn(buttonVariants({ size: "sm" }))}
        href="https://docs.rxresu.me/"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Book size={14} weight="bold" className="mr-2" />
        <span className="line-clamp-1">{t`Documentation`}</span>
      </a>
    </CardFooter>
  </Card>
);

export const InformationSection = () => {
  return (
    <section id="information" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="information" size={18} name={t`Information`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Information`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <DonateCard />
        <DocumentationCard />
        <IssuesCard />
      </main>
    </section>
  );
};
