import { templatesList } from "@reactive-resume/templates";
import { useMemo } from "react";

export const useTemplate = (templateId?: string) => {
  const template = useMemo(() => {
    return templatesList.find((template) => template.id === templateId);
  }, [templateId]);

  if (!template || !template.Component) return null;

  return template;
};
