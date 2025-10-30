import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@reactive-resume/ui";
import { t } from "@lingui/macro";

import { Logo } from "@/client/components/logo";

import { DonationBanner } from "./donation-banner";

export const Header = () => (
  <motion.header
    className="fixed inset-x-0 top-0 z-20 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-sm"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.25 } }}
  >
    <DonationBanner />

    <div className="py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" aria-label="CV Builder Home">
          <Logo size={48} />
        </Link>

        <nav className="hidden md:flex items-center gap-x-6 text-sm">
          <a href="#features" className="opacity-80 hover:opacity-100 transition" aria-label={t`Features`}>
            {t`Features`}
          </a>
          <a href="#pricing" className="opacity-80 hover:opacity-100 transition" aria-label={t`Pricing`}>
            {t`Pricing`}
          </a>
          <a href="#faq" className="opacity-80 hover:opacity-100 transition" aria-label={t`FAQ`}>
            {t`FAQ`}
          </a>
          <a href="#contact" className="opacity-80 hover:opacity-100 transition" aria-label={t`Contact`}>
            {t`Contact`}
          </a>
        </nav>

        <div className="flex items-center gap-x-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/auth/login">{t`Sign In`}</Link>
          </Button>
          <Button asChild size="sm" variant="primary" className="hidden sm:inline-flex">
            <Link to="/auth/register">{t`Start Free`}</Link>
          </Button>
        </div>
      </div>
    </div>
  </motion.header>
);
