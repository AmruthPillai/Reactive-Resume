import { t } from "@lingui/macro";
import { CaretRightIcon } from "@phosphor-icons/react";
import { basicsSchema } from "@reactive-resume/schema";
import { Button, Input, Label } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useResumeStore } from "@/client/stores/resume";

import { CustomFieldsSection } from "./custom/section";
import { PictureSection } from "./picture/section";
import { sectionVariants } from "./shared/section-base";
import { getSectionIcon } from "./shared/section-icon";
import { URLInput } from "./shared/url-input";

export const BasicsSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const basics = useResumeStore((state) => state.resume.data.basics);

  const collapsed = useResumeStore((state) => state.collapsedSections.basics ?? false);
  const toggleCollapseSection = useResumeStore((state) => state.toggleCollapseSection);

  return (
    <section id="basics" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label={collapsed ? t`Expand section` : t`Collapse section`}
            onClick={() => {
              toggleCollapseSection("basics");
            }}
          >
            <CaretRightIcon
              size={18}
              className={cn("transition-transform", !collapsed && "rotate-90")}
            />
          </Button>

          {getSectionIcon("basics", { size: 18 })}

          <h2 className="ml-2 line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Basics`}</h2>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div key="basics-content" {...sectionVariants} className="overflow-hidden">
            <main className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <PictureSection />
              </div>

              <div className="space-y-4 sm:col-span-2">
                <Label htmlFor="basics.name">{t`Full Name`}</Label>
                <Input
                  id="basics.name"
                  value={basics.name}
                  hasError={
                    !basicsSchema.pick({ name: true }).safeParse({ name: basics.name }).success
                  }
                  onChange={(event) => {
                    setValue("basics.name", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="basics.headline">{t`Headline`}</Label>
                <Input
                  id="basics.headline"
                  value={basics.headline}
                  onChange={(event) => {
                    setValue("basics.headline", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="basics.email">{t`Email`}</Label>
                <Input
                  id="basics.email"
                  placeholder="john.doe@example.com"
                  value={basics.email}
                  hasError={
                    !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
                  }
                  onChange={(event) => {
                    setValue("basics.email", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="basics.url">{t`Website`}</Label>
                <URLInput
                  id="basics.url"
                  value={basics.url}
                  placeholder="https://example.com"
                  onChange={(value) => {
                    setValue("basics.url", value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="basics.phone">{t`Phone`}</Label>
                <Input
                  id="basics.phone"
                  placeholder="+1 (123) 4567 7890"
                  value={basics.phone}
                  onChange={(event) => {
                    setValue("basics.phone", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="basics.location">{t`Location`}</Label>
                <Input
                  id="basics.location"
                  value={basics.location}
                  onChange={(event) => {
                    setValue("basics.location", event.target.value);
                  }}
                />
              </div>

              <CustomFieldsSection className="sm:col-span-2" />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
