import { t, Trans } from "@lingui/macro";
import { Check } from "@phosphor-icons/react";
import { Badge, Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { toast } from "@/client/hooks/use-toast";
import { useSubscription, useUser } from "@/client/services/user";

export const BillingPage = () => {
  const { user } = useUser();
  if (user == null) return null;

  return (
    <>
      <Helmet>
        <title>
          {t`Billing`} - {t`TechCV`}
        </title>
      </Helmet>

      <div className="max-w-2xl space-y-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t`Billing`}
        </motion.h1>

        <ScrollArea hideScrollbar className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
          <div className="space-y-6">
            <Billing />
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

const Billing = () => {
  const { user } = useUser();
  const subscription = useSubscription();

  if (user == null) return null;

  const freePlanPerks = [
    t`Access to all resume templates`,
    t`Export as PDF`,
    t`Unlimited resumes`,
    t`Basic support`,
  ];

  const proPlanPerks = [
    t`Access to all resume templates`,
    t`Export as PDF`,
    t`Unlimited resumes`,
    t`Priority support`,
  ];

  const perks = subscription.isPro ? proPlanPerks : freePlanPerks;

  function handleUpgradeSubscription() {
    if (user == null) return;
    const url = `https://pay.sumit.co.il/7avl6x/8olfvx?externalidentifier=${user.id}&customerexternalidentifier=${user.id}`;
    window.location.href = url;
  }

  function handleCancelSubscription() {
    const customerPageUrl = subscription.subscription?.customerPageUrl;
    if (customerPageUrl == null)
      return toast({
        variant: "error",
        title: t`Error`,
        description: t`Failed to cancel subscription`,
      });
    window.location.href = customerPageUrl;
  }

  const shouldShowCancelSubscription = subscription.isPro && !subscription.isCancelled;
  const shouldShowUpgradeSubscription = !subscription.isPro;
  const shouldShowResumeSubscription = subscription.isPro && subscription.isCancelled;

  return (
    <div>
      <h3 className="flex items-center text-2xl font-bold leading-relaxed tracking-tight">
        {t`Current Plan`}:
        <Badge variant="primary" className="ms-2">
          {subscription.isPro ? t`Pro` : t`Free`}
        </Badge>
      </h3>
      <section className="mt-4 flex flex-col gap-2">
        {perks.map((perk, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check size={12} className="text-green-500" />
            <p>{perk}</p>
          </div>
        ))}

        <Separator className="my-4" />

        <h3 className="text-xl font-bold">{t`Manage Subscription`}</h3>
        {shouldShowResumeSubscription && <CanceledCard nextBillingDate={"LALALA"} />}
        {shouldShowCancelSubscription && (
          <ProCard onCancelSubscription={handleCancelSubscription} />
        )}
        {shouldShowUpgradeSubscription && (
          <FreeCard onUpgradeSubscription={handleUpgradeSubscription} />
        )}
      </section>
    </div>
  );
};

const FreeCard = ({ onUpgradeSubscription }: { onUpgradeSubscription: () => void }) => {
  return (
    <div>
      <p className="mb-4 leading-relaxed opacity-75">
        <Trans>
          You are currently in the <strong>Free plan</strong> You can upgrade to the Pro plan to
          unlock more features
        </Trans>
      </p>
      <div>
        <Button onClick={onUpgradeSubscription}>{t`Upgrade to Pro`}</Button>
      </div>
    </div>
  );
};

const ProCard = ({ onCancelSubscription }: { onCancelSubscription: () => void }) => {
  return (
    <div>
      <p className="mb-4 leading-relaxed opacity-75">
        <Trans>
          You are currently in the <strong>Pro plan</strong>
        </Trans>
      </p>
      <div>
        <Button variant="outline" onClick={onCancelSubscription}>
          {t`Cancel Subscription`}
        </Button>
      </div>
    </div>
  );
};

const CanceledCard = ({ nextBillingDate }: { nextBillingDate: string }) => {
  return (
    <div>
      <p className="mb-4 leading-relaxed opacity-75">
        {t`Your subscription has been canceled, you can use premium features until the end of the billing cycle at`}{" "}
        {nextBillingDate}
      </p>
    </div>
  );
};
