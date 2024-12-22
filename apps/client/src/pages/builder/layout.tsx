import { useBreakpoint } from "@reactive-resume/hooks";
import { Panel, PanelGroup, PanelResizeHandle, Sheet, SheetContent, Tabs, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { t } from "@lingui/macro";
import { useBuilderStore } from "@/client/stores/builder";
import { BuilderHeader } from "./_components/header";
import { BuilderToolbar } from "./_components/toolbar";
import { LeftSidebar } from "./sidebars/left";
import { RightSidebar } from "./sidebars/right";


const onOpenAutoFocus = (event: Event) => {
  event.preventDefault();
};

const OutletSlot = ({ mode }: { mode: "resume" | "portfolio" }) => (
  <>
    <BuilderHeader mode={mode} />
    <div className="absolute inset-0">
      <Outlet />
    </div>
    <BuilderToolbar  />
  </>
);

export const BuilderLayout = () => {
  const { isDesktop } = useBreakpoint();
  const [mode, setMode] = useState<"resume" | "portfolio">("resume");

  const sheet = useBuilderStore((state) => state.sheet);
  const leftSetSize = useBuilderStore((state) => state.panel.left.setSize);
  const rightSetSize = useBuilderStore((state) => state.panel.right.setSize);
  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
  const rightHandle = useBuilderStore((state) => state.panel.right.handle);

  const LeftSidebarComponent = mode === "resume" ? LeftSidebar : LeftSidebar;
  const RightSidebarComponent = mode === "resume" ? RightSidebar : RightSidebar;

  if (isDesktop) {
    return (
      <div className="relative size-full overflow-hidden">
        <Tabs 
          value={mode} 
          onValueChange={(value) => setMode(value as "resume" | "portfolio")}
          className="absolute left-1/2 top-4 z-50 -translate-x-1/2"
        >
          <TabsList>
            <TabsTrigger value="resume">{t`Resume`}</TabsTrigger>
            <TabsTrigger value="portfolio">{t`Portfolio`}</TabsTrigger>
          </TabsList>
        </Tabs>

        <PanelGroup direction="horizontal">
          <Panel
            minSize={25}
            maxSize={45}
            defaultSize={30}
            className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
            onResize={leftSetSize}
          >
            <LeftSidebarComponent />
          </Panel>

          <PanelResizeHandle
            isDragging={leftHandle.isDragging}
            onDragging={leftHandle.setDragging}
          />

          <Panel>
            <OutletSlot mode={mode} />
          </Panel>

          <PanelResizeHandle
            isDragging={rightHandle.isDragging}
            onDragging={rightHandle.setDragging}
          />

          <Panel
            minSize={25}
            maxSize={45}
            defaultSize={30}
            className={cn("z-10 bg-background", !rightHandle.isDragging && "transition-[flex]")}
            onResize={rightSetSize}
          >
            <RightSidebarComponent />
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  return (
    <div className="relative">
      <Tabs 
        value={mode} 
        onValueChange={(value) => setMode(value as "resume" | "portfolio")}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
      >
        <TabsList>
          <TabsTrigger value="resume">{t`Resume`}</TabsTrigger>
          <TabsTrigger value="portfolio">{t`Portfolio`}</TabsTrigger>
        </TabsList>
      </Tabs>

      <Sheet open={sheet.left.open} onOpenChange={sheet.left.setOpen}>
        <SheetContent
          side="left"
          showClose={false}
          className="top-16 p-0 sm:max-w-xl"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <LeftSidebarComponent />
        </SheetContent>
      </Sheet>

      <OutletSlot mode={mode} />

      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          showClose={false}
          className="top-16 p-0 sm:max-w-xl"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <RightSidebarComponent />
        </SheetContent>
      </Sheet>
    </div>
  );
};
