import { t } from "@lingui/macro";
import { ScrollArea } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export const BillingPage = () => (
  <>
    <Helmet>
      <title>
        {t`Settings`} - {t`Reactive Resume`}
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

export default function Billing() {
  return <div className="space-y-6"></div>;
}
