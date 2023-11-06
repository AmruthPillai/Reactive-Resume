import { TemplateProps } from "../shared";
import { Rhyhorn } from "./rhyhorn";

type Template = {
  id: string;
  name: string;
  Component: (props: TemplateProps) => JSX.Element;
};

export const templatesList: Template[] = [
  {
    id: "rhyhorn",
    name: "Rhyhorn",
    Component: Rhyhorn,
  },
];
