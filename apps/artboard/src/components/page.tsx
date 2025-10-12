import React, { useMemo, useState } from "react";
import { useTheme } from "@reactive-resume/hooks";
import { cn, pageSizeMap } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

type Props = {
  mode?: "preview" | "builder";
  pageNumber: number;
  children: React.ReactNode;
  /** Scale multiplier (applies transform). Useful for zoom. Default 1.0 */
  scale?: number;
  /** Show grid overlay in builder mode */
  initialShowGrid?: boolean;
  /** Show safe margin overlay in builder mode */
  initialShowMargins?: boolean;
  /** Show crop marks (for print) */
  initialShowCropMarks?: boolean;
};

export const MM_TO_PX = 3.78;

/**
 * Enhanced Page component with:
 * - scaling (zoom)
 * - grid overlay
 * - safe margin overlay
 * - crop marks
 * - small builder toolbar to toggle overlays (only in builder mode)
 */
export const Page: React.FC<Props> = ({
  mode = "preview",
  pageNumber,
  children,
  scale = 1,
  initialShowGrid = false,
  initialShowMargins = true,
  initialShowCropMarks = false,
}) => {
  const { isDarkMode } = useTheme();

  const pageMeta = useArtboardStore((state) => state.resume.metadata.page);
  const fontFamily = useArtboardStore((state) => state.resume.metadata.typography.font.family);

  // builder UI state
  const [showGrid, setShowGrid] = useState(initialShowGrid);
  const [showMargins, setShowMargins] = useState(initialShowMargins);
  const [showCropMarks, setShowCropMarks] = useState(initialShowCropMarks);

  // page dimensions in mm and px
  const { format, options } = pageMeta;
  const pageWidthMm = pageSizeMap[format].width;
  const pageHeightMm = pageSizeMap[format].height;

  const pageWidthPx = useMemo(() => pageWidthMm * MM_TO_PX, [pageWidthMm]);
  const pageHeightPx = useMemo(() => pageHeightMm * MM_TO_PX, [pageHeightMm]);

  // visual scale clamped for safety
  const clampedScale = Math.max(0.25, Math.min(3, scale));

  // CSS transform origin center top for nicer scaling UX
  const pageStyle: React.CSSProperties = {
    fontFamily,
    width: `${pageWidthPx}px`,
    minHeight: `${pageHeightPx}px`,
    transform: `scale(${clampedScale})`,
    transformOrigin: "top left",
    transition: "transform 180ms ease-in-out",
  };

  // content wrapper allows scroll when zoomed out of viewport
  const containerStyle: React.CSSProperties = {
    padding: mode === "builder" ? 16 : 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "auto",
    background: mode === "preview" ? "transparent" : isDarkMode ? "#0b0b0b" : "#f3f4f6",
    minHeight: "150px",
  };

  // safe margin (in mm) - you may get this from page options if present, but we'll use a typical 12mm
  const marginMm = options?.margins?.mm ?? 12;
  const marginPx = marginMm * MM_TO_PX;

  // crop-mark dimensions
  const cropLength = Math.min(20, Math.round(Math.min(pageWidthPx, pageHeightPx) * 0.04));

  return (
    <div className={cn("relative w-full")} style={containerStyle} role="region" aria-label={`Page ${pageNumber}`}>
      {/* Builder toolbar */}
      {mode === "builder" && (
        <div
          className={cn(
            "absolute top-3 left-3 z-30 flex items-center gap-2 rounded-md px-2 py-1",
            isDarkMode ? "bg-black/60 text-white" : "bg-white/80 text-slate-800",
            "backdrop-blur-sm"
          )}
        >
          <button
            className="px-2 py-1 text-sm rounded hover:bg-slate-100/50"
            onClick={() => setShowGrid((s) => !s)}
            aria-pressed={showGrid}
            title="Toggle grid"
          >
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>

          <button
            className="px-2 py-1 text-sm rounded hover:bg-slate-100/50"
            onClick={() => setShowMargins((s) => !s)}
            aria-pressed={showMargins}
            title="Toggle safe margins"
          >
            {showMargins ? "Hide Margins" : "Show Margins"}
          </button>

          <button
            className="px-2 py-1 text-sm rounded hover:bg-slate-100/50"
            onClick={() => setShowCropMarks((s) => !s)}
            aria-pressed={showCropMarks}
            title="Toggle crop marks"
          >
            {showCropMarks ? "Hide Marks" : "Crop Marks"}
          </button>
        </div>
      )}

      {/* Page wrapper (paper) */}
      <div
        data-page={pageNumber}
        className={cn(
          "relative bg-white text-foreground",
          mode === "builder"
            ? "shadow-[0_12px_30px_rgba(2,6,23,0.2)] border border-slate-200"
            : "border border-transparent",
          isDarkMode && "dark:bg-slate-900 dark:border-slate-700"
        )}
        style={pageStyle}
        aria-labelledby={`page-${pageNumber}`}
      >
        {/* optional dashed break line indicator (as in original) */}
        {mode === "builder" && page.options.breakLine && (
          <div
            className="absolute inset-x-0 border-b border-dashed pointer-events-none"
            style={{
              top: `${pageHeightPx}px`,
            }}
            aria-hidden
          />
        )}

        {/* grid overlay */}
        {showGrid && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={pageWidthPx}
            height={pageHeightPx}
            viewBox={`0 0 ${pageWidthPx} ${pageHeightPx}`}
            aria-hidden
          >
            <defs>
              <pattern id={`grid-${pageNumber}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke={isDarkMode ? "#ffffff10" : "#00000010"} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${pageNumber})`} />
          </svg>
        )}

        {/* safe margin overlay */}
        {showMargins && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxSizing: "border-box",
              padding: `${marginPx}px`,
              border: `${Math.max(1, Math.round(marginPx / 8))}px dotted ${isDarkMode ? "#fff2" : "#0003"}`,
            }}
            aria-hidden
          />
        )}

        {/* crop marks */}
        {showCropMarks && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={pageWidthPx}
            height={pageHeightPx}
            viewBox={`0 0 ${pageWidthPx} ${pageHeightPx}`}
            aria-hidden
          >
            <g stroke={isDarkMode ? "#fff" : "#000"} strokeWidth="1">
              {/* top-left */}
              <line x1={0} y1={0} x2={cropLength} y2={0} />
              <line x1={0} y1={0} x2={0} y2={cropLength} />
              {/* top-right */}
              <line x1={pageWidthPx} y1={0} x2={pageWidthPx - cropLength} y2={0} />
              <line x1={pageWidthPx} y1={0} x2={pageWidthPx} y2={cropLength} />
              {/* bottom-left */}
              <line x1={0} y1={pageHeightPx} x2={cropLength} y2={pageHeightPx} />
              <line x1={0} y1={pageHeightPx} x2={0} y2={pageHeightPx - cropLength} />
              {/* bottom-right */}
              <line x1={pageWidthPx} y1={pageHeightPx} x2={pageWidthPx - cropLength} y2={pageHeightPx} />
              <line x1={pageWidthPx} y1={pageHeightPx} x2={pageWidthPx} y2={pageHeightPx - cropLength} />
            </g>
          </svg>
        )}

        {/* page content area (children) */}
        <div
          className="relative w-full h-full bg-transparent"
          style={{
            minHeight: pageHeightPx,
            boxSizing: "border-box",
            padding: `${marginPx}px`,
          }}
        >
          {children}
        </div>

        {/* footer / page number inside page (if enabled) */}
        {mode === "builder" && options?.pageNumbers && (
          <div
            className={cn(
              "absolute bottom-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded",
              isDarkMode ? "text-white/90 bg-black/40" : "text-slate-700 bg-white/70"
            )}
            aria-hidden
          >
            Page {pageNumber}
          </div>
        )}
      </div>
    </div>
  );
};
