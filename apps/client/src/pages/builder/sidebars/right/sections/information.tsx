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

import { getSectionIcon } from "../shared/section-icon";

const DonateCard = () => (
  <Card className="space-y-4 bg-info text-info-foreground">
    <CardContent className="space-y-2">
      <CardTitle>Support the app by donating what you can!</CardTitle>
      <CardDescription className="space-y-2">
        <p>
          I built Reactive Resume mostly by myself during my spare time, with a lot of help from
          other great open-source contributors.
        </p>

        <p>
          If you like the app and want to support keeping it free forever, please donate whatever
          you can afford to give.
        </p>
      </CardDescription>
    </CardContent>
    <CardFooter>
      <a
        className={cn(buttonVariants({ size: "sm" }))}
        href="https://github.com/sponsors/AmruthPillai"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <HandHeart size={14} weight="bold" className="mr-2" />
        <span>Donate to Reactive Resume</span>
      </a>
    </CardFooter>
  </Card>
);

const IssuesCard = () => (
  <Card className="space-y-4">
    <CardContent className="space-y-2">
      <CardTitle>Found a bug, or have an idea for a new feature?</CardTitle>
      <CardDescription className="space-y-2">
        <p>I'm sure the app is not perfect, but I'd like for it to be.</p>

        <p>
          If you faced any issues while creating your resume, or have an idea that would help you
          and other users in creating your resume more easily, drop an issue on the repository or
          send me an email about it.
        </p>
      </CardDescription>
    </CardContent>
    <CardFooter className="space-x-4">
      <a
        className={cn(buttonVariants({ size: "sm" }))}
        href="https://github.com/AmruthPillai/Reactive-Resume/issues/new/choose"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <GithubLogo size={14} weight="bold" className="mr-2" />
        <span>Raise an issue</span>
      </a>

      <a
        className={cn(buttonVariants({ size: "sm" }))}
        href="mailto:hello@amruthpillai.com"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <EnvelopeSimpleOpen size={14} weight="bold" className="mr-2" />
        <span>Send me a message</span>
      </a>
    </CardFooter>
  </Card>
);

const DocumentationCard = () => (
  <Card className="space-y-4">
    <CardContent className="space-y-2">
      <CardTitle>Don't know where to begin? Hit the docs!</CardTitle>
      <CardDescription className="space-y-2">
        <p>
          The community has spent a lot of time writing the documentation for Reactive Resume, and
          I'm sure it will help you get started with the app.
        </p>

        <p>
          There are also a lot of examples to help you get started, and features that you might not
          know about which could help you build your perfect resume.
        </p>
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
        <span>Documentation</span>
      </a>
    </CardFooter>
  </Card>
);

export const InformationSection = () => {
  return (
    <section id="information" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("information")}
          <h2 className="line-clamp-1 text-3xl font-bold">Information</h2>
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
