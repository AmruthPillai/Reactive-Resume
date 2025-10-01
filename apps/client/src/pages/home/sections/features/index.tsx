import { t } from "@lingui/macro";
import {
  BrainIcon,
  CloudIcon,
  CloudSunIcon,
  CurrencyDollarSimpleIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  FileIcon,
  FilesIcon,
  FolderIcon,
  GitBranchIcon,
  GithubLogoIcon,
  GoogleChromeLogoIcon,
  GoogleLogoIcon,
  IconContext,
  LayoutIcon,
  LockIcon,
  NoteIcon,
  ProhibitIcon,
  ScalesIcon,
  StackSimpleIcon,
  StarIcon,
  SwatchesIcon,
  TextAaIcon,
  TranslateIcon,
} from "@phosphor-icons/react";
import { cn, languages, templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";

type Feature = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};

const featureLabel = cn(
  "flex cursor-default items-center justify-center gap-x-2 rounded bg-secondary px-4 py-3 text-sm font-medium leading-none text-primary transition-colors hover:bg-primary hover:text-background",
);

export const FeaturesSection = () => {
  const languagesCount = languages.length;
  const templatesCount = templatesList.length;

  const features: Feature[] = [
    { icon: <CurrencyDollarSimpleIcon />, title: t`Free, forever` },
    { icon: <GitBranchIcon />, title: t`Open Source` },
    { icon: <ScalesIcon />, title: t`MIT License` },
    { icon: <ProhibitIcon />, title: t`No user tracking or advertising` },
    { icon: <CloudIcon />, title: t`Self-host with Docker` },
    { icon: <TranslateIcon />, title: t`Available in ${languagesCount} languages` },
    { icon: <BrainIcon />, title: t`OpenAI Integration` },
    { icon: <GithubLogoIcon />, title: t`Sign in with GitHub` },
    { icon: <GoogleLogoIcon />, title: t`Sign in with Google` },
    { icon: <EnvelopeSimpleIcon />, title: t`Sign in with Email` },
    { icon: <LockIcon />, title: t`Secure with two-factor authentication` },
    { icon: <StackSimpleIcon />, title: t`${templatesCount} resume templates to choose from` },
    { icon: <FilesIcon />, title: t`Design single/multi page resumes` },
    { icon: <FolderIcon />, title: t`Manage multiple resumes` },
    { icon: <SwatchesIcon />, title: t`Customisable colour palettes` },
    { icon: <LayoutIcon />, title: t`Customisable layouts` },
    { icon: <StarIcon />, title: t`Custom resume sections` },
    { icon: <NoteIcon />, title: t`Personal notes for each resume` },
    { icon: <LockIcon />, title: t`Lock a resume to prevent editing` },
    { icon: <FileIcon />, title: t`Supports A4/Letter page formats` },
    { icon: <TextAaIcon />, title: t`Pick any font from Google Fonts` },
    { icon: <GoogleChromeLogoIcon />, title: t`Host your resume publicly` },
    { icon: <EyeIcon />, title: t`Track views and downloads` },
    { icon: <CloudSunIcon />, title: t`Light or dark theme` },
    {
      icon: (
        <div className="flex items-center space-x-1">
          <img src="https://cdn.simpleicons.org/react" alt="React" width={14} height={14} />
          <img src="https://cdn.simpleicons.org/vite" alt="Vite" width={14} height={14} />
          <img
            src="https://cdn.simpleicons.org/tailwindcss"
            alt="TailwindCSS"
            width={14}
            height={14}
          />
          <img src="https://cdn.simpleicons.org/nestjs" alt="NestJS" width={14} height={14} />
          <img
            src="https://cdn.simpleicons.org/googlechrome"
            alt="Google Chrome"
            width={14}
            height={14}
          />
          <img
            src="https://cdn.simpleicons.org/postgresql"
            alt="PostgreSQL"
            width={14}
            height={14}
          />
        </div>
      ),
      title: t`Powered by`,
      className: "flex-row-reverse",
    },
  ];

  return (
    <section id="features" className="relative bg-secondary-accent py-24 sm:py-32">
      <div className="container">
        <div className="space-y-6 leading-loose">
          <h2 className="text-4xl font-bold">{t`Rich in features, not in pricing.`}</h2>
          <p className="max-w-4xl text-base leading-relaxed">
            {t`Reactive Resume is a passion project of over 3 years of hard work, and with that comes a number of re-iterated ideas and features that have been built to (near) perfection.`}
          </p>

          <IconContext.Provider value={{ size: 14, weight: "bold" }}>
            <div className="!mt-12 flex flex-wrap items-center gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  className={cn(featureLabel, feature.className)}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                >
                  {feature.icon}
                  <h3>{feature.title}</h3>
                </motion.div>
              ))}

              <motion.p
                viewport={{ once: true }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: (features.length + 1) * 0.1 },
                }}
              >
                {t`and many more...`}
              </motion.p>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </section>
  );
};
