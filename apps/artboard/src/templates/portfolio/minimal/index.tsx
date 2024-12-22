// artboard/src/templates/portfolio/minimal/index.tsx
import { cn } from "@reactive-resume/utils";
import { PortfolioTemplateProps } from "../types";
import { BaseTemplate } from "../base";
import { Hero } from "./components/hero";
import { About } from "./components/about";
// import { Showcase } from "./components/showcase";
// import { Contact } from "./components/contact";

export const MinimalTemplate: React.FC<PortfolioTemplateProps> = ({ data }) => {
  const { sections } = data;

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
                tagline={data.basics.tagline}
                picture={data.basics.picture}
                banner={data.basics.banner}
              />
            );
        //   case "showcase":
        //     return <Showcase key={sectionId} data={section} />;
        //   case "contact":
        //     return <Contact key={sectionId} data={section} />;
          default:
            if (sectionId.startsWith("custom.")) {
              return (<></>
                // <CustomSection 
                //   key={sectionId} 
                //   data={sections.custom[sectionId.split(".")[1]]} 
                // />
              );
            }
            return null;
        }
      })}
    </BaseTemplate>
  );
};
