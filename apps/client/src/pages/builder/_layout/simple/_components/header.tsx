import { t } from "@lingui/macro";
import { Gear, HouseSimple, Lock, SidebarSimple } from "@phosphor-icons/react";
import { Button, Tooltip } from "@reactive-resume/ui";
import { cn, ResumeOptions, ResumeSections } from "@reactive-resume/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ThemeSwitch } from "@/client/components/theme-switch";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderHeader = () => {
  const title = useResumeStore((state) => state.resume.title);
  const locked = useResumeStore((state) => state.resume.locked);
  const activeSection = useBuilderStore((state) => state.activeSection.left);
  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();
  const handleOptionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };

  const openOptions = () => {
    handleOptionClick(activeSection.openOption ? ResumeSections.BASICS : ResumeOptions.TEMPLATE);
  };
  const toggle = useBuilderStore((state) => state.toggle);
  const isDragging = useBuilderStore(
    (state) => state.panel.left.handle.isDragging || state.panel.right.handle.isDragging,
  );

  const onToggle = (side: "left" | "right") => toggle(side);

  return (
    <div
      className={cn(
        "relative inset-x-0 top-0 z-[50] h-16 bg-secondary-accent/50 backdrop-blur-lg lg:z-20",
        !isDragging && "transition-[left,right]",
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center justify-center gap-x-1 lg:mx-auto">
          <Button asChild size="icon" variant="ghost">
            <Link to="/dashboard/resumes">
              <HouseSimple />
            </Link>
          </Button>

          <span className="mr-2 text-xs opacity-40">{"/"}</span>

          <h1 className="font-medium">{title}</h1>

          {locked && (
            <Tooltip content={t`This resume is locked, please unlock to make further changes.`}>
              <Lock size={14} className="ml-2 opacity-75" />
            </Tooltip>
          )}
        </div>

        <div className="flex">
          <ThemeSwitch size={14} />
          <Button size="icon" variant="ghost" className="flex" onClick={openOptions}>
            <Gear />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="flex sm:hidden"
            onClick={() => onToggle("right")}
          >
            <SidebarSimple className="-scale-x-100" />
          </Button>
        </div>
      </div>
    </div>
  );
};
