import { t } from "@lingui/macro";
import { useTheme } from "@reactive-resume/hooks";
import { Label, Switch } from "@reactive-resume/ui";
import Prism from "prismjs";
import { Helmet } from "react-helmet-async";
import CodeEditor from "react-simple-code-editor";

import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const CssSection = () => {
  const { isDarkMode } = useTheme();

  const setValue = useResumeStore((state) => state.setValue);
  const css = useResumeStore((state) => state.resume.data.metadata.css);

  return (
    <section id="css" className="grid gap-y-6">
      <Helmet>
        {isDarkMode && <link rel="stylesheet" href="/styles/prism-dark.css" />}
        {!isDarkMode && <link rel="stylesheet" href="/styles/prism-light.css" />}
      </Helmet>

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="css" size={18} name={t`Custom CSS`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Custom CSS`}</h2>
        </div>
      </header>

      <main className="space-y-4">
        {/* OBS */}
        <div className="flex items-center gap-x-4">
          <Switch
            id="metadata.css.visible"
            checked={true}
            onCheckedChange={(checked) => {
              setValue("metadata.css.visible", checked);
            }}
          />
          <Label htmlFor="metadata.css.visible">{t`Apply Custom CSS`}</Label>
        </div>

        <div className="rounded border p-4">
          <CodeEditor
            tabSize={4}
            value={css.value}
            className="language-css font-mono"
            highlight={(code) => Prism.highlight(code, Prism.languages.css, "css")}
            onValueChange={(value) => {
              setValue("metadata.css.value", value);
            }}
          />
        </div>
      </main>
    </section>
  );
};
