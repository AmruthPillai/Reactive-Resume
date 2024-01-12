import { SectionArea } from "./section-area";
import { SectionBar } from "./section-bar";

export const Left = () => {
  return (
    <div className="flex bg-secondary-accent/30">
      <SectionBar />

      <SectionArea />
    </div>
  );
};
