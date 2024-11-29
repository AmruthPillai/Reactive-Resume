import { t } from "@lingui/macro";
import { useTheme } from "@reactive-resume/hooks";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useTechStacks } from "@/client/services/job/tech-stack";

type AnyObject = Record<string, string>;

type Props = {
  title?: React.ReactNode;
  time?: string;
  description?: string;
  techStackArray?: AnyObject[];
  className?: string;
  onClick?: () => void;
  onClickApply?: () => void;
};

export const BaseListItem = ({
  title,
  time,
  description,
  className,
  onClick,
  techStackArray,
  onClickApply,
}: Props) => {
  const { techStacks } = useTechStacks();
  const { isDarkMode } = useTheme();
  const findTitle = (id: number) => {
    return techStacks?.find((ts) => ts.Id === id)?.title;
  };

  return (
    <article className="relative w-full">
      <Button
        className="absolute right-6 top-6 rounded-full"
        onClick={onClickApply}
      >{t`Apply`}</Button>
      <div
        className={cn(
          "flex cursor-pointer items-center rounded-2xl border border-secondary px-6 py-4 transition-colors hover:bg-secondary/30",
          className,
        )}
        onClick={onClick}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full flex-col gap-4 space-x-4">
            <div className="flex flex-col gap-1">
              <h4 className="line-clamp-1 truncate text-2xl font-semibold">{title}</h4>
              <p className="!m-0 text-sm font-thin opacity-75">{time}</p>
            </div>

            <div
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                __html: description!,
              }}
              className="!m-0 line-clamp-5 pt-2 text-base"
            />
            <div className="!m-0 flex gap-2">
              {techStackArray?.map((ts) => (
                <div
                  className="rounded-full px-6 py-1 text-sm"
                  style={{
                    border: `1px solid ${isDarkMode ? "white" : "#0057FF"}`,
                    backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e6efff",
                  }}
                >
                  {findTitle(ts.tech_stack_id as unknown as number)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
