import { t } from "@lingui/macro";
import { CheckCircleIcon, NumberCircleOneIcon, NumberCircleTwoIcon, NumberCircleThreeIcon } from "@phosphor-icons/react";

export const HowItWorksSection = () => (
  <section id="how-it-works" className="relative py-24 sm:py-32 bg-secondary-accent">
    <div className="container">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl font-bold">{t`How it works`}</h2>
        <p className="opacity-80">{t`Three simple steps to your job-ready CV`}</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-background p-6 shadow-sm">
          <NumberCircleOneIcon size={28} className="text-[#00A859]" />
          <h3 className="mt-3 text-lg font-semibold">{t`Sign Up Free`}</h3>
          <p className="mt-1 text-sm opacity-80">{t`Create your account in seconds`}</p>
        </div>
        <div className="rounded-lg bg-background p-6 shadow-sm">
          <NumberCircleTwoIcon size={28} className="text-[#00A859]" />
          <h3 className="mt-3 text-lg font-semibold">{t`Choose a Template`}</h3>
          <p className="mt-1 text-sm opacity-80">{t`Customize your details easily`}</p>
        </div>
        <div className="rounded-lg bg-background p-6 shadow-sm">
          <NumberCircleThreeIcon size={28} className="text-[#00A859]" />
          <h3 className="mt-3 text-lg font-semibold">{t`Download or Upgrade`}</h3>
          <p className="mt-1 text-sm opacity-80">{t`Export your CV or unlock premium templates anytime`}</p>
        </div>
      </div>
    </div>
  </section>
);

