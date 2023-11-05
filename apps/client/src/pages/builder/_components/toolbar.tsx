import {
  ArrowClockwise,
  ArrowCounterClockwise,
  CircleNotch,
  ClockClockwise,
  CubeFocus,
  DownloadSimple,
  Hash,
  LineSegment,
  LinkSimple,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { Button, Separator, Toggle, Tooltip } from "@reactive-resume/ui";
import { motion } from "framer-motion";

import { usePrintResume } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore, useTemporalResumeStore } from "@/client/stores/resume";

export const BuilderToolbar = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const undo = useTemporalResumeStore((state) => state.undo);
  const redo = useTemporalResumeStore((state) => state.redo);
  const transformRef = useBuilderStore((state) => state.transform.ref);

  const id = useResumeStore((state) => state.resume.id);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");
  const pageOptions = useResumeStore((state) => state.resume.data.metadata.page.options);

  const { printResume, loading } = usePrintResume();

  const onPrint = async () => {
    const { url } = await printResume({ id });

    const openInNewTab = (url: string) => {
      const win = window.open(url, "_blank");
      if (win) win.focus();
    };

    openInNewTab(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, bottom: -64 }}
      whileHover={{ opacity: 1, bottom: 0 }}
      animate={{ opacity: 0.3, bottom: -28 }}
      className="fixed inset-x-0 mx-auto pb-4 pt-6 text-center"
    >
      <div className="inline-flex items-center justify-center rounded-full bg-background px-4 shadow-xl">
        {/* Undo */}
        <Tooltip content="Undo">
          <Button size="icon" variant="ghost" className="rounded-none" onClick={() => undo()}>
            <ArrowCounterClockwise />
          </Button>
        </Tooltip>

        {/* Redo */}
        <Tooltip content="Redo">
          <Button size="icon" variant="ghost" className="rounded-none" onClick={() => redo()}>
            <ArrowClockwise />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        {/* Zoom In */}
        <Tooltip content="Zoom In">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => transformRef?.zoomIn(0.2)}
          >
            <MagnifyingGlassPlus />
          </Button>
        </Tooltip>

        {/* Zoom Out */}
        <Tooltip content="Zoom Out">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => transformRef?.zoomOut(0.2)}
          >
            <MagnifyingGlassMinus />
          </Button>
        </Tooltip>

        <Tooltip content="Reset Zoom">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => transformRef?.resetTransform()}
          >
            <ClockClockwise />
          </Button>
        </Tooltip>

        {/* Center Artboard */}
        <Tooltip content="Center Artboard">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => transformRef?.centerView()}
          >
            <CubeFocus />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        {/* Toggle Page Break Line */}
        <Tooltip content="Toggle Page Break Line">
          <Toggle
            className="rounded-none"
            pressed={pageOptions.breakLine}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.breakLine", pressed);
            }}
          >
            <LineSegment />
          </Toggle>
        </Tooltip>

        {/* Toggle Page Numbers */}
        <Tooltip content="Toggle Page Numbers">
          <Toggle
            className="rounded-none"
            pressed={pageOptions.pageNumbers}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.pageNumbers", pressed);
            }}
          >
            <Hash />
          </Toggle>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        {/* Copy Link to Resume */}
        <Tooltip content="Copy Link to Resume">
          <Button size="icon" variant="ghost" className="rounded-none" disabled={!isPublic}>
            <LinkSimple />
          </Button>
        </Tooltip>

        {/* Download PDF */}
        <Tooltip content="Download PDF">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={onPrint}
            disabled={loading}
          >
            {loading ? <CircleNotch className="animate-spin" /> : <DownloadSimple />}
          </Button>
        </Tooltip>
      </div>
    </motion.div>
  );
};
