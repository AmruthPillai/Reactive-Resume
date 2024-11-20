import { t } from "@lingui/macro";
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { useTheme } from "@reactive-resume/hooks";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import React from "react";

import { IJob } from "@/client/services/job/job";
import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./card";

const JobCard = ({ job }: { job: IJob }) => {
  const { open } = useDialog<IJob>("job");
  const { isDarkMode } = useTheme();
  const postedTime = dayjs().to(job.CreatedAt);

  const onDescription = () => {
    open("description", { id: "job", item: job });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <BaseCard className="flex cursor-default flex-col justify-between space-y-0">
          <div
            className="flex w-full grow cursor-pointer flex-col items-start justify-start gap-4 space-y-0 p-4"
            onClick={onDescription}
          >
            <p
              className={cn(
                "rounded-full px-3 py-1 text-[11px] capitalize text-[inherit] shadow",
                isDarkMode ? "bg-highlight" : "bg-[#DDE4F4]",
              )}
            >{t`Posted ${postedTime}`}</p>
            <h4 className="line-clamp-2 text-lg font-semibold">{job.title}</h4>
            <p className="line-clamp-6 sm:line-clamp-2 lg:line-clamp-3 2xl:line-clamp-4">
              {job.description}
            </p>
          </div>
          <div className="flex w-full justify-center gap-3 border-t-2 border-[inherit] py-3">
            <Button
              className={cn("rounded-full border border-black px-5 py-1 text-xs")}
              type="reset"
              variant="ghost"
              onClick={onDescription}
            >{t`Detail`}</Button>
            <Button
              className={cn("rounded-full border border-black px-5 py-1 text-xs")}
              type="submit"
            >{t`Apply`}</Button>
          </div>
        </BaseCard>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};

export default JobCard;
