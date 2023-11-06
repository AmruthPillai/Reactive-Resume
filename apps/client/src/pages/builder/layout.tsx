import { useBreakpoint } from "@reactive-resume/hooks";
import { Panel, PanelGroup, PanelResizeHandle, Sheet, SheetContent } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Outlet } from "react-router-dom";

import { useBuilderStore } from "@/client/stores/builder";

import { BuilderHeader } from "./_components/header";
import { BuilderToolbar } from "./_components/toolbar";
import { LeftSidebar } from "./sidebars/left";
import { RightSidebar } from "./sidebars/right";

const OutletSlot = () => (
  <>
    <BuilderHeader />

    <div className="absolute inset-0">
      <Outlet />
    </div>

    <BuilderToolbar />
  </>
);

export const BuilderLayout = () => {
  const { isDesktop } = useBreakpoint();

  const panel = useBuilderStore((state) => state.panel);
  const sheet = useBuilderStore((state) => state.sheet);

  const onOpenAutoFocus = (event: Event) => event.preventDefault();

  if (isDesktop) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <PanelGroup direction="horizontal" autoSaveId="builder-layout">
          <Panel
            collapsible
            minSize={20}
            maxSize={35}
            defaultSize={28}
            ref={panel.left.setRef}
            className={cn("z-10 bg-background", !panel.left.isDragging && "transition-[flex]")}
          >
            <LeftSidebar />
          </Panel>
          <PanelResizeHandle
            isDragging={panel.left.isDragging}
            onDragging={panel.left.setDragging}
          />
          <Panel>
            <OutletSlot />
          </Panel>
          <PanelResizeHandle
            isDragging={panel.right.isDragging}
            onDragging={panel.right.setDragging}
          />
          <Panel
            collapsible
            minSize={20}
            maxSize={35}
            defaultSize={28}
            ref={panel.right.setRef}
            className={cn("z-10 bg-background", !panel.right.isDragging && "transition-[flex]")}
          >
            <RightSidebar />
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  return (
    <div className="relative">
      <Sheet open={sheet.left.open} onOpenChange={sheet.left.setOpen}>
        <SheetContent
          side="left"
          className="p-0 sm:max-w-xl"
          showClose={false}
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <LeftSidebar />
        </SheetContent>
      </Sheet>

      <OutletSlot />

      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          className="p-0 sm:max-w-xl"
          showClose={false}
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <RightSidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};
