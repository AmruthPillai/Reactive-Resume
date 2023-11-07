import { SectionKey } from "@reactive-resume/schema";

export type TemplateProps = {
  columns: SectionKey[][];
  isFirstPage?: boolean;
};

export type BaseProps = {
  children?: React.ReactNode;
  className?: string;
};
