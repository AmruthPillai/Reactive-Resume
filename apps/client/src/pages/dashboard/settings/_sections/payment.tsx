import { t, Trans } from "@lingui/macro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@reactive-resume/ui";

import { createPaymentLink } from "@/client/services/stripe/stripe";
import { useUser } from "@/client/services/user";

export const PaymentSettings = () => {
  const { user } = useUser();

  if (!user) return null;

  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await createPaymentLink();
      window.open(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Payment`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`Here, you can update your payment information such as your subscriptions.`}
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["password", "two-factor"]}>
        <AccordionItem value="two-factor">
          <AccordionTrigger>{t`Manage Subscription`}</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 leading-relaxed opacity-75">
              <Trans>
                <strong>Manage your Payment related information.</strong> You can cancel your
                subscription, Update your payment etc. You will be redirect to Stripe Portal.
              </Trans>
            </p>

            <Button variant="outline" onClick={redirectToCustomerPortal}>
              {t`Manage Subscription`}
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
