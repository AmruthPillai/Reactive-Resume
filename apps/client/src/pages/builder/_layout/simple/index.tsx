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
import {
  Builder,
  BuilderArtBoardEventType,
  cn,
  getValidOptionValue,
  getValidSectionValue,
} from "@reactive-resume/utils";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Copyright } from "@/client/components/copyright";
import { BuilderHeader } from "@/client/pages/builder/_layout/simple/_components/header";
import { BuilderToolbar } from "@/client/pages/builder/_layout/simple/_components/toolbar";
import { useBuilderStore } from "@/client/stores/builder";

import { SectionArea } from "./_components/left/section-area";
import { SectionBar } from "./_components/left/section-bar";

const OutletSlot = () => (
  <>
    <Outlet />

    <BuilderToolbar />
  </>
);

export const SimpleBuilderLayout = () => {
  const { isTablet, isDesktop } = useBreakpoint();
  const params = useParams<{ id: string; section: string }>();
  const activeSection = useBuilderStore((state) => state.activeSection);
  const builder = useBuilderStore((state) => state.builder);

  const sheet = useBuilderStore((state) => state.sheet);
  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
  const onOpenAutoFocus = (event: Event) => event.preventDefault();

  const frameRef = useBuilderStore((state) => state.frame.ref);

  const onScrollView = (section: string) =>
    frameRef?.contentWindow?.postMessage(
      { type: BuilderArtBoardEventType.HIGHLIGHT, section },
      "*",
    );

  // update current section for Simple Builder
  useEffect(() => {
    const section = getValidSectionValue(params.section) || getValidOptionValue(params.section);
    section && activeSection.left.setSection(section);
    getValidSectionValue(params.section) &&
      onScrollView(`#resume-section-${getValidSectionValue(params.section)}`);
  }, [params.section]);

  useEffect(() => {
    builder.setType(Builder.SIMPLE);
  }, []);

  if (isTablet || isDesktop) {
    return (
      <div className="flex h-screen flex-col">
        <header className="flex h-16">
          <BuilderHeader />
        </header>

        <div className="flex flex-1 overflow-auto">
          <PanelGroup direction="horizontal">
            <Panel
              minSize={25}
              maxSize={75}
              defaultSize={50}
              className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
            >
              <div className="flex h-full">
                <SectionBar />
                <SectionArea />
              </div>
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

        <footer className="flex h-10 items-center justify-between">
          <div />
          <div className="mx-auto flex items-center justify-center gap-x-1">
            <Copyright />
          </div>
          <div />
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16">
        <BuilderHeader />
      </header>

      <div className="flex flex-1 overflow-auto">
        <SectionBar />
        <SectionArea />
        <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
          <SheetContent
            side="right"
            showClose={false}
            onOpenAutoFocus={onOpenAutoFocus}
            className="p-0 sm:max-w-xl"
          >
            <div className="">
              <SheetClose asChild className="absolute right-4 top-4 bg-background">
                <Button size="icon" variant="ghost">
                  <X />
                </Button>
              </SheetClose>
            </div>
            <OutletSlot />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
