import { useBreakpoint } from "@reactive-resume/hooks";
import { Panel, PanelGroup, Sheet, SheetContent } from "@reactive-resume/ui";
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

  const onOpenAutoFocus = (event: Event) => event.preventDefault();

  if (isTablet || isDesktop) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <BuilderHeader />
        <PanelGroup direction="horizontal">
          <Panel>
            <Left />
          </Panel>
          <Panel>
            <OutletSlot />
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <BuilderHeader />
      <div className="top-16 p-0 sm:max-w-xl">
        <Left />
      </div>

      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          showClose={false}
          onOpenAutoFocus={onOpenAutoFocus}
          className="p-0 sm:max-w-xl"
        >
          <OutletSlot />
        </SheetContent>
      </Sheet>
    </div>
  );
};
