import { t, Trans } from "@lingui/macro";
import { EnvelopeSimpleOpenIcon } from "@phosphor-icons/react";
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
import { Link } from "react-router";

const IssuesCard = () => (
  <Card className="space-y-4">
    <CardContent className="space-y-2">
      <CardTitle>{t`Found a bug, or have an idea for a new feature?`}</CardTitle>
      <CardDescription className="space-y-2">
        <Trans>
          <p>I'm sure the app is not perfect, but I'd like for it to be.</p>
          <p>
            If you faced any issues while creating your resume, or have an idea that would help you
            and other users in creating your resume more easily, please reach out to us — we’d love to hear from you.
          </p>
        </Trans>
      </CardDescription>
    </CardContent>
    <CardFooter>
      <Link to="/contact" className={cn(buttonVariants({ size: "sm" }))}>
        <EnvelopeSimpleOpenIcon size={14} weight="bold" className="mr-2" />
        <span className="line-clamp-1">{t`Contact us`}</span>
      </Link>
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
        <IssuesCard />
      </main>
    </section>
  );
};
