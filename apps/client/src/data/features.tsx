import { t } from "@lingui/macro";
import {
  Brain,
  Cloud,
  CloudSun,
  CurrencyDollarSimple,
  EnvelopeSimple,
  Eye,
  File,
  Files,
  Folder,
  GitBranch,
  GithubLogo,
  GoogleChromeLogo,
  GoogleLogo,
  Layout,
  Lock,
  Note,
  Prohibit,
  Scales,
  StackSimple,
  Star,
  Swatches,
  TextAa,
  Translate,
} from "@phosphor-icons/react";

import PoweredByIcons from "../components/powered-by-icons";

export type Feature = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};

export const getFeaturesData = (languagesCount: number, templatesCount: number): Feature[] => [
  { icon: <CurrencyDollarSimple />, title: t`Free, forever` },
  { icon: <GitBranch />, title: t`Open Source` },
  { icon: <Scales />, title: t`MIT License` },
  { icon: <Prohibit />, title: t`No user tracking or advertising` },
  { icon: <Cloud />, title: t`Self-host with Docker` },
  { icon: <Translate />, title: t`Available in ${languagesCount} languages` },
  { icon: <Brain />, title: t`OpenAI Integration` },
  { icon: <GithubLogo />, title: t`Sign in with GitHub` },
  { icon: <GoogleLogo />, title: t`Sign in with Google` },
  { icon: <EnvelopeSimple />, title: t`Sign in with Email` },
  { icon: <Lock />, title: t`Secure with two-factor authentication` },
  { icon: <StackSimple />, title: t`${templatesCount} resume templates to choose from` },
  { icon: <Files />, title: t`Design single/multi page resumes` },
  { icon: <Folder />, title: t`Manage multiple resumes` },
  { icon: <Swatches />, title: t`Customisable colour palettes` },
  { icon: <Layout />, title: t`Customisable layouts` },
  { icon: <Star />, title: t`Custom resume sections` },
  { icon: <Note />, title: t`Personal notes for each resume` },
  { icon: <Lock />, title: t`Lock a resume to prevent editing` },
  { icon: <File />, title: t`Supports A4/Letter page formats` },
  { icon: <TextAa />, title: t`Pick any font from Google Fonts` },
  { icon: <GoogleChromeLogo />, title: t`Host your resume publicly` },
  { icon: <Eye />, title: t`Track views and downloads` },
  { icon: <CloudSun />, title: t`Light or dark theme` },
  { icon: <PoweredByIcons />, title: t`Powered by`, className: "flex-row-reverse" },
];
