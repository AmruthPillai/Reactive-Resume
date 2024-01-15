import { useBreakpoint } from "@reactive-resume/hooks";
import { Panel, PanelGroup, PanelResizeHandle, Sheet, SheetContent } from "@reactive-resume/ui";
import { Builder, cn } from "@reactive-resume/utils";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useBuilderStore } from "@/client/stores/builder";

import { BuilderHeader } from "./_components/header";
import { LeftSidebar } from "./_components/sidebars/left";
import { RightSidebar } from "./_components/sidebars/right";
import { BuilderToolbar } from "./_components/toolbar";

const OutletSlot = () => (
  <>
    <BuilderHeader />

    <div className="absolute inset-0">
      <Outlet />
    </div>

    <BuilderToolbar />
  </>
);

export const AdvanceBuilderLayout = () => {
  const { isDesktop } = useBreakpoint();

  const sheet = useBuilderStore((state) => state.sheet);
  const builder = useBuilderStore((state) => state.builder);

  const leftSetSize = useBuilderStore((state) => state.panel.left.setSize);
  const rightSetSize = useBuilderStore((state) => state.panel.right.setSize);

  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
  const rightHandle = useBuilderStore((state) => state.panel.right.handle);

  const onOpenAutoFocus = (event: Event) => event.preventDefault();

  useEffect(() => {
    builder.setType(Builder.ADVANCE);
  }, []);

  if (isDesktop) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel
            minSizePixels={48}
            maxSizePercentage={45}
            defaultSizePercentage={30}
            onResize={({ sizePercentage }) => leftSetSize(sizePercentage)}
            className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
          >
            <LeftSidebar />
          </Panel>
          <PanelResizeHandle
            isDragging={leftHandle.isDragging}
            onDragging={leftHandle.setDragging}
          />
          <Panel>
            <OutletSlot />
          </Panel>
          <PanelResizeHandle
            isDragging={rightHandle.isDragging}
            onDragging={rightHandle.setDragging}
          />
          <Panel
            minSizePixels={48}
            maxSizePercentage={45}
            defaultSizePercentage={30}
            onResize={({ sizePercentage }) => rightSetSize(sizePercentage)}
            className={cn("z-10 bg-background", !rightHandle.isDragging && "transition-[flex]")}
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
          showClose={false}
          onOpenAutoFocus={onOpenAutoFocus}
          className="top-16 p-0 sm:max-w-xl"
        >
          <LeftSidebar />
        </SheetContent>
      </Sheet>

      <OutletSlot />

      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          showClose={false}
          onOpenAutoFocus={onOpenAutoFocus}
          className="top-16 p-0 sm:max-w-xl"
        >
          <RightSidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};
