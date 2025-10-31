import { t } from "@lingui/macro";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router";

import { AccountSettings } from "./_sections/account";
import { BillingSettings } from "./_sections/billing";
import { DangerZoneSettings } from "./_sections/danger";
import { ProfileSettings } from "./_sections/profile";
import { SecuritySettings } from "./_sections/security";
import { SessionsSettings } from "./_sections/sessions";

const TABS = {
  account: "account",
  security: "security",
  billing: "billing",
  preferences: "preferences",
  danger: "danger",
} as const;

type TabValue = (typeof TABS)[keyof typeof TABS];

export const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as TabValue | null;
  const [activeTab, setActiveTab] = useState<TabValue>(
    tabParam && Object.values(TABS).includes(tabParam) ? tabParam : TABS.account,
  );

  useEffect(() => {
    if (tabParam && Object.values(TABS).includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    const newTab = value as TabValue;
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  return (
    <>
      <Helmet>
        <title>
          {t`Settings`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="w-full max-w-4xl space-y-6">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t`Settings`}
        </motion.h1>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value={TABS.account}>{t`Account`}</TabsTrigger>
            <TabsTrigger value={TABS.security}>{t`Security`}</TabsTrigger>
            <TabsTrigger value={TABS.billing}>{t`Billing`}</TabsTrigger>
            <TabsTrigger value={TABS.preferences}>{t`Preferences`}</TabsTrigger>
            <TabsTrigger value={TABS.danger}>{t`Danger Zone`}</TabsTrigger>
          </TabsList>

          <ScrollArea hideScrollbar className="h-[calc(100vh-200px)] lg:h-[calc(100vh-160px)]">
            <TabsContent value={TABS.account} className="space-y-6">
              <AccountSettings />
            </TabsContent>

            <TabsContent value={TABS.security} className="space-y-6">
              <SecuritySettings />
              <SessionsSettings />
            </TabsContent>

            <TabsContent value={TABS.billing} className="space-y-6">
              <BillingSettings />
            </TabsContent>

            <TabsContent value={TABS.preferences} className="space-y-6">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value={TABS.danger} className="space-y-6">
              <DangerZoneSettings />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </>
  );
};
