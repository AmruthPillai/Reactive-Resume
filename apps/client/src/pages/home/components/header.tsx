import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@reactive-resume/ui";
import { t } from "@lingui/macro";
import { List, X } from "@phosphor-icons/react";

import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { UserOptions } from "@/client/components/user-options";
import { UserAvatar } from "@/client/components/user-avatar";
import { useUser } from "@/client/services/user";
import { useLogout } from "@/client/services/auth";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.25 } }}
    >
      <div className="py-4 sm:py-5">
        <div className="container flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" aria-label="CV Builder Home" className="shrink-0 flex items-center">
            <Logo size={32} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-x-8 text-sm font-medium">
            <a
              href="#features"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label={t`Features`}
            >
              {t`Features`}
            </a>
            <a
              href="#pricing"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label={t`Pricing`}
            >
              {t`Pricing`}
            </a>
            <a
              href="#faq"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label={t`FAQ`}
            >
              {t`FAQ`}
            </a>
            <Link
              to="/contact"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label={t`Contact`}
            >
              {t`Contact`}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-x-3">
            <ThemeSwitch />
            {user ? (
              <>
                <Button asChild size="sm" variant="ghost" className="font-medium">
                  <Link to="/dashboard/resumes">{t`Dashboard`}</Link>
                </Button>
                <UserOptions>
                  <Button size="sm" variant="ghost" className="p-0 h-9 w-9 rounded-full">
                    <UserAvatar size={28} />
                  </Button>
                </UserOptions>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost" className="font-medium">
                  <Link to="/auth/login">{t`Sign In`}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="font-medium bg-info hover:bg-info-accent text-info-foreground"
                >
                  <Link to="/auth/register">{t`Start Free`}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeSwitch />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop/Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] sm:w-[380px] bg-background shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6">
                  <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <Logo size={32} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto px-6 pt-4">
                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-6">
                    <a
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-normal text-foreground hover:text-foreground transition-colors"
                    >
                      {t`Features`}
                    </a>
                    <a
                      href="#pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-normal text-foreground hover:text-foreground transition-colors"
                    >
                      {t`Pricing`}
                    </a>
                    <a
                      href="#faq"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-normal text-foreground hover:text-foreground transition-colors"
                    >
                      {t`FAQ`}
                    </a>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-normal text-foreground hover:text-foreground transition-colors"
                    >
                      {t`Contact`}
                    </Link>
                  </nav>
                </div>

                {/* Drawer Footer - Action Buttons */}
                <div className="px-6 pb-6 space-y-3">
                  {user ? (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full font-medium justify-center h-11"
                      >
                        <Link to="/dashboard/resumes" onClick={() => setMobileMenuOpen(false)}>
                          {t`Dashboard`}
                        </Link>
                      </Button>
                      <Button
                        className="w-full font-medium justify-center h-11 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        onClick={() => {
                          void logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        {t`Logout`}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full font-medium justify-center h-11"
                      >
                        <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                          {t`Sign In`}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full font-medium justify-center h-11 bg-success hover:bg-success-accent text-success-foreground"
                      >
                        <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                          {t`Start Free`}
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
