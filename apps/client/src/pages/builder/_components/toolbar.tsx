import { t } from "@lingui/macro";
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
  const frameRef = useBuilderStore((state) => state.frame.ref);

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

  const onZoomIn = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_IN" }, "*");
  const onZoomOut = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_OUT" }, "*");
  const onResetView = () => frameRef?.contentWindow?.postMessage({ type: "RESET_VIEW" }, "*");
  const onCenterView = () => frameRef?.contentWindow?.postMessage({ type: "CENTER_VIEW" }, "*");

  return (
    <motion.div
      initial={{ opacity: 0, bottom: -64 }}
      whileHover={{ opacity: 1, bottom: 0 }}
      animate={{ opacity: 0.3, bottom: -28 }}
      className="fixed inset-x-0 mx-auto pb-4 pt-6 text-center"
    >
      <div className="inline-flex items-center justify-center rounded-full bg-background px-4 shadow-xl">
        {/* Undo */}
        <Tooltip content={t`Undo`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={() => undo()}>
            <ArrowCounterClockwise />
          </Button>
        </Tooltip>

        {/* Redo */}
        <Tooltip content={t`Redo`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={() => redo()}>
            <ArrowClockwise />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        <Tooltip content={t`Zoom In`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomIn}>
            <MagnifyingGlassPlus />
          </Button>
        </Tooltip>

        <Tooltip content={t`Zoom Out`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomOut}>
            <MagnifyingGlassMinus />
          </Button>
        </Tooltip>

        <Tooltip content={t`Reset Zoom`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onResetView}>
            <ClockClockwise />
          </Button>
        </Tooltip>

        <Tooltip content={t`Center Artboard`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onCenterView}>
            <CubeFocus />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        {/* Toggle Page Break Line */}
        <Tooltip content={t`Toggle Page Break Line`}>
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
        <Tooltip content={t`Toggle Page Numbers`}>
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
        <Tooltip content={t`Copy Link to Resume`}>
          <Button size="icon" variant="ghost" className="rounded-none" disabled={!isPublic}>
            <LinkSimple />
          </Button>
        </Tooltip>

        {/* Download PDF */}
        <Tooltip content={t`Download PDF`}>
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
