import { t } from "@lingui/macro";
import { Separator } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { AccountSettings } from "./_sections/account";
import { DangerZoneSettings } from "./_sections/danger";
import { OpenAISettings } from "./_sections/openai";
import { ProfileSettings } from "./_sections/profile";
import { SecuritySettings } from "./_sections/security";

export const SettingsPage = () => (
  <>
    <Helmet>
      <title>
        {t`Settings`} - {t`Reactive Resume`}
      </title>
    </Helmet>

    <div className="max-w-2xl space-y-8 pb-12">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold tracking-tight"
      >
        {t`Settings`}
      </motion.h1>

      <AccountSettings />
      <Separator />
      <SecuritySettings />
      <Separator />
      <ProfileSettings />
      <Separator />
      <OpenAISettings />
      <Separator />
      <DangerZoneSettings />
    </div>
  </>
);
