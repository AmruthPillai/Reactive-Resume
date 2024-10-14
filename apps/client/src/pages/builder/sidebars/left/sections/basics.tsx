import { t } from "@lingui/macro";
import { basicsSchema } from "@reactive-resume/schema";
import { Input, Label } from "@reactive-resume/ui";
import Toast from './toast'

import { useResumeStore } from "@/client/stores/resume";

import { CustomFieldsSection } from "./custom/section";
import { PictureSection } from "./picture/section";
import { getSectionIcon } from "./shared/section-icon";
import { URLInput } from "./shared/url-input";
import { useState, useRef } from "react";

export const BasicsSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const basics = useResumeStore((state) => state.resume.data.basics);

  const [toast, setToast]: [{ visible: boolean, message: string }, React.Dispatch<React.SetStateAction<{ visible: boolean, message: string }>>] = useState<{ visible: boolean, message: string }>({ visible: false, message: "" })

  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  function findNonASCIICharacters(str: string) {
    // Regular expression to match any character outside ASCII range
    const nonASCII = /[^\x00-\x7F]/g;
    // Find all non-ASCII characters in the string
    const matches = str.match(nonASCII);
    // Return the matches, or an empty array if none found
    return matches || [];
  }


  return (
    <section id="basics" className="grid gap-y-6">
      <Toast toastState={toast} onClose={() => setToast({ visible: false, message: "" })} />
      <div id="toast" className="fixed bottom-4 right-4 max-w-xs bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-transform transform translate-y-20 opacity-0">
        <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className="text-sm font-medium">Error: Something went wrong!</span>
      </div>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("basics")}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Basics`}</h2>
        </div>
      </header>

      <main className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <PictureSection />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.name">{t`Full Name`}</Label>
          <Input
            id="basics.name"
            value={basics.name}
            hasError={!basicsSchema.pick({ name: true }).safeParse({ name: basics.name }).success}
            onChange={(event) => {
              const match = findNonASCIICharacters(event.target.value)
              console.log(match)
              if (match.length > 0) {
                const message = "The characters " + match.join(", ") + " might not be compatible with PDF export."
                setToast({ visible: true, message: message })
              }
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
              const match = findNonASCIICharacters(event.target.value)
              console.log(match)
              if (match.length > 0) {
                const message = "The characters " + match.join(", ") + " might not be compatible with PDF export."
                setToast({ visible: true, message: message })
              }
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
              const match = findNonASCIICharacters(event.target.value)
              console.log(match)
              if (match.length > 0) {
                const message = "The characters " + match.join(", ") + " might not be compatible with PDF export."
                setToast({ visible: true, message: message })
              }
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
              const match = findNonASCIICharacters(event.target.value)
              console.log(match)
              if (match.length > 0) {
                const message = "The characters " + match.join(", ") + " might not be compatible with PDF export."
                setToast({ visible: true, message: message })
              }
              setValue("basics.location", event.target.value);
            }}
          />
        </div>

        <CustomFieldsSection className="sm:col-span-2" />
      </main>
    </section>
  );
};
