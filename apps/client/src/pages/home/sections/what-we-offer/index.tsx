import { t } from "@lingui/macro";
import {
  BrainIcon,
  FileIcon,
  LayoutIcon,
  LockIcon,
  GoogleChromeLogoIcon,
  CloudIcon,
  CurrencyDollarSimpleIcon,
  SwatchesIcon,
  FolderIcon,
  TextAaIcon,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@reactive-resume/ui";

type Offer = { icon: React.ReactNode; title: string; desc: string };

const items: Offer[] = [
  { icon: <LayoutIcon />, title: t`ATS-friendly templates`, desc: t`Clean, modern designs that pass applicant tracking systems.` },
  { icon: <BrainIcon />, title: t`AI writing help`, desc: t`Rephrase bullets, fix grammar, and improve tone instantly.` },
  { icon: <FileIcon />, title: t`PDF export`, desc: t`Download polished PDFs ready to share with recruiters.` },
  { icon: <GoogleChromeLogoIcon />, title: t`Public share link`, desc: t`Host and share your resume online in one click.` },
  { icon: <FolderIcon />, title: t`Multiple resumes`, desc: t`Create versions tailored to different roles and companies.` },
  { icon: <SwatchesIcon />, title: t`Custom styles`, desc: t`Adjust colors and layout to match your personal brand.` },
  { icon: <TextAaIcon />, title: t`Google Fonts`, desc: t`Choose from a wide range of professional typefaces.` },
  { icon: <LockIcon />, title: t`Privacy-first`, desc: t`Your data stays secure. Delete your account anytime.` },
  { icon: <CurrencyDollarSimpleIcon />, title: t`M-PESA & card`, desc: t`Simple local payments powered by Paystack.` },
  { icon: <CloudIcon />, title: t`Auto-save`, desc: t`Your work saves as you type, across devices.` },
];

export const WhatWeOfferSection = () => (
  <section id="what-we-offer" className="relative bg-secondary-accent py-24 sm:py-32">
    <div className="container">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl font-bold">{t`What we offer`}</h2>
        <p className="opacity-80">{t`All the tools you need to craft a standout Kenyan CV`}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="flex items-start gap-3 p-5">
              <div className="mt-1 text-[#00A859]">{item.icon}</div>
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm opacity-80">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

