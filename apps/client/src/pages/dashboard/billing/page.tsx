import { t, Trans } from "@lingui/macro";
import { Check } from "@phosphor-icons/react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
  Separator,
} from "@reactive-resume/ui";
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
    t`Create stylish and impressive resumes for any job`,
    t`Access to a wide variety of professional designs`,
    t`Manual and simple resume editing`,
    t`Option to download a high-quality PDF file`,
    t`User-friendly interface with smart editing tools`,
  ];

  const monthlyPlanPerks = [
    t`Create stylish and impressive resumes for any job`,
    t`Access to a wide variety of professional designs`,
    t`Manual and simple resume editing`,
    t`Option to download a high-quality PDF file`,
    t`User-friendly interface with smart editing tools`,
    t`Create personalized resumes using AI`,
    t`Precise tailoring for specific jobs based on job description analysis`,
    t`Access to all advanced designs and features`,
    t`Continuous updates and system upgrades`,
    t`Fast technical support at every stage`,
  ];

  const perks = subscription.isPro ? monthlyPlanPerks : freePlanPerks;

  function handleUpgradeSubscription(isLTD: boolean) {
    if (user == null) return;
    if (isLTD) {
      const url = `https://pay.sumit.co.il/7avl6x/97q2xl/97q2xm/payment?externalidentifier=${user.id}&customerexternalidentifier=${user.id}`;
      window.location.href = url;
    } else {
      const url = `https://pay.sumit.co.il/7avl6x/97q2xp/97q2xq/payment?externalidentifier=${user.id}&customerexternalidentifier=${user.id}`;
      window.location.href = url;
    }
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

  const shouldShowCancelSubscription = subscription.isPro;

  return (
    <div>
      <h3 className="flex items-center text-lg font-semibold leading-relaxed tracking-tight">
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

        {!shouldShowCancelSubscription && (
          <>
            <Separator className="my-4" />
            <Component handleUpgradeSubscription={handleUpgradeSubscription} perks={monthlyPlanPerks} />
          </>
        )}

        {shouldShowCancelSubscription && (
          <>
            <Separator className="my-4" />
            <h3 className="text-xl font-bold">{t`Manage Subscription`}</h3>
            <ProCard onCancelSubscription={handleCancelSubscription} />
          </>
        )}
      </section>
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

function Component({
  handleUpgradeSubscription,
  perks,
}: {
  handleUpgradeSubscription: (isLTD: boolean) => void;
  perks: string[];
}) {
  return (
    <div className="">
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">{t`Lifetime Deal`}</CardTitle>
            <CardDescription>{t`Pay once, use forever`}</CardDescription>
          </CardHeader>
          <CardContent className="grow">
            <p className="mb-4 text-4xl font-bold">₪399.9</p>
            {perks.map((perk, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={12} className="text-green-500" />
                <p>{perk}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                handleUpgradeSubscription(true);
              }}
            >
              {t`Upgrade`}
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">{t`Monthly Subscription`}</CardTitle>
            <CardDescription>{t`Flexible month-to-month plan`}</CardDescription>
          </CardHeader>
          <CardContent className="grow">
            <p className="mb-4 text-4xl font-bold">
              ₪99.9<span className="text-xl font-normal">/{t`month`}</span>
            </p>
            {perks.map((perk, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={12} className="text-green-500" />
                <p>{perk}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                handleUpgradeSubscription(false);
              }}
            >
              {t`Upgrade`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
