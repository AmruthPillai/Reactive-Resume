import { X } from "@phosphor-icons/react";
import { useBreakpoint } from "@reactive-resume/hooks";
import {
  Button,
  Panel,
  PanelGroup,
  PanelResizeHandle,
  Sheet,
  SheetClose,
  SheetContent,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Outlet } from "react-router-dom";

import { useBuilderStore } from "@/client/stores/builder";

import { BuilderHeader } from "./_components/header";
import { Left } from "./_components/left";
import { BuilderToolbar } from "./_components/toolbar";

const OutletSlot = () => (
  <>
    {/* <BuilderHeader /> */}

    <Outlet />

    <BuilderToolbar />
  </>
);

export const SimpleBuilderLayout = () => {
  const { isTablet, isDesktop } = useBreakpoint();

  const sheet = useBuilderStore((state) => state.sheet);
  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
  const onOpenAutoFocus = (event: Event) => event.preventDefault();

  if (isTablet || isDesktop) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <BuilderHeader />
        <PanelGroup direction="horizontal">
          <Panel
            minSizePercentage={25}
            maxSizePercentage={75}
            defaultSizePercentage={50}
            className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
          >
            <Left />
          </Panel>
          <PanelResizeHandle
            isDragging={leftHandle.isDragging}
            onDragging={leftHandle.setDragging}
          />
          <Panel>
            <OutletSlot />
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <BuilderHeader />
      <div className="">
        <Left />
      </div>

      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          showClose={false}
          onOpenAutoFocus={onOpenAutoFocus}
          className="p-0 sm:max-w-xl"
        >
          <div className="h-16">
            <SheetClose asChild className="absolute right-4 top-4">
              <Button size="icon" variant="ghost">
                <X />
              </Button>
            </SheetClose>
          </div>
          <OutletSlot />
        </SheetContent>
      </Sheet>
    </div>
  );
};
