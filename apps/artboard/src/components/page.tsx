import { useTheme } from "@reactive-resume/hooks";
import { cn, MM_TO_PX, pageSizeMap } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

type Props = {
  mode?: "preview" | "builder";
  pageNumber: number;
  children: React.ReactNode;
};
;

export const Page = ({ mode = "preview", pageNumber, children }: Props) => {
  const { isDarkMode } = useTheme();

  const page = useArtboardStore((state) => state.resume.metadata.page);
  const fontFamily = useArtboardStore((state) => state.resume.metadata.typography.font.family);
  const pageWidthPx = pageSizeMap[page.format].width * MM_TO_PX;
  const pageHeightPx = pageSizeMap[page.format].height * MM_TO_PX;

  const breakLineStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='${pageHeightPx}' viewBox='0 0 8 ${pageHeightPx}' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='${pageHeightPx - 0.5}' x2='4' y2='${pageHeightPx - 0.5}' stroke='black' stroke-width='1'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundPosition: 'top left'
  };

  return (
    <div
      data-page={pageNumber}
      className={cn("relative bg-background text-foreground", mode === "builder" && "shadow-2xl")}
      style={{
        fontFamily,
        width: `${pageWidthPx}px`,
        minHeight: `${pageHeightPx}px`,
        ...(mode === "builder" && page.options.breakLine ? breakLineStyle : undefined),
      }}
    >
      {mode === "builder" && page.options.pageNumbers && (
        <div className={cn("absolute -top-7 left-0 font-bold", isDarkMode && "text-white")}>
          Page {pageNumber}
        </div>
      )}

      {children}
    </div>
  );
};
