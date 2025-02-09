import { cn } from "@reactive-resume/utils";
import { PortfolioTemplateProps } from "../types";
import { BaseTemplate } from "../base";
import { Hero } from "./components/hero";
import { About } from "./components/about";


export const MinimalTemplate: React.FC<PortfolioTemplateProps> = ({ data }) => {
  const { sections } = data;
  if (!data) return null;

  return (
    <BaseTemplate
      data={data}
      className="bg-background text-text"
    >
      {/* Hero Section */}
      <Hero
        name={data.basics.name}
        tagline={data.basics.tagline}
        picture={data.basics.picture}
        banner={data.basics.banner}
      />

       {/* Dynamic Sections */}
       {data.metadata.layout.sections.map((sectionId) => {
        const section = sections[sectionId];
        if (!section?.visible) return null;

        switch (sectionId) {
          case "about":
            return (
              <About
                key={sectionId}
                name={data.basics.name}
                headline={data.basics.headline}
                picture={data.basics.picture}
                banner={data.basics.banner}
              />
            );

          default:
            if (sectionId.startsWith("custom.")) {
              return (<></>

              );
            }
            return null;
        }
      })}
    </BaseTemplate>
  );
};
