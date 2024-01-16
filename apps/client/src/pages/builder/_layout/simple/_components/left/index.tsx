import { SectionArea } from "@/client/pages/builder/_layout/simple/_components/left/section-area";
import { SectionBar } from "@/client/pages/builder/_layout/simple/_components/left/section-bar";

export const Left = () => {
  return (
    <div className="flex bg-secondary-accent/30">
      <SectionBar />

      <SectionArea />
    </div>
  );
};
