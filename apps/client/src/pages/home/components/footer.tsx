import { t } from "@lingui/macro";
import { Link } from "react-router";
import { GithubLogo, FacebookLogo, TwitterLogo, YoutubeLogo, LinkedinLogo, EnvelopeSimple, RssSimple } from "@phosphor-icons/react";

import { Copyright } from "@/client/components/copyright";
import { LocaleSwitch } from "@/client/components/locale-switch";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Footer = () => (
  <footer id="contact" className="bg-background border-t border-border/40">
    <div className="container px-4 py-12 sm:px-6 lg:px-8">
      {/* Logo & Brand Name - Centered with icon and text horizontally */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
          <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-xl font-bold text-foreground">{t`CV Builder`}</span>
      </div>

      {/* Navigation Links - Centered horizontal row */}
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t`Features`}
        </a>
        <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t`Pricing`}
        </Link>
        <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t`FAQ`}
        </a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t`Contact`}
        </a>
      </nav>

      {/* Social Icons & Switches - Centered row */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <LocaleSwitch />
        <ThemeSwitch />
      </div>

      {/* Separator line */}
      <div className="border-t border-border/40 pt-6">
        {/* Bottom Bar - Copyright (left) & Legal Links (right) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <Copyright />
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">
              {t`Terms Of Service`}
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {t`Privacy Policy`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
