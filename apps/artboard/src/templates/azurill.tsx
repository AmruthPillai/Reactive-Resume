import { Fragment } from "react";
import { cn } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

import { Header, mapSectionToComponent } from "./shared";


export const Azurill = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div className="space-y-3 p-custom">
      {isFirstPage && <Header basics={basics} variant="centered" />}

      <div className="grid grid-cols-3 gap-x-4">
        <div className="sidebar group space-y-4">
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>

        <div
          className={cn("main group space-y-4", sidebar.length > 0 ? "col-span-2" : "col-span-3")}
        >
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
