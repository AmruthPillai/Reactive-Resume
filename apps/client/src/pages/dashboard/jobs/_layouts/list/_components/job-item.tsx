import { t } from "@lingui/macro";
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import dayjs from "dayjs";
import React from "react";

import { IJob } from "@/client/services/job/job";
import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./item";

export const JobItem = ({ job }: { job: IJob }) => {
  const { open } = useDialog<IJob>("job");
  const postedTime = dayjs().to(job.CreatedAt);

  const onDescription = () => {
    open("description", { id: "job", item: job });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="even:bg-secondary/20">
        <BaseListItem
          className="group"
          title={job.title}
          time={t`Posted ${postedTime}`}
          techStackArray={job._nc_m2m_job_tech_stacks}
          description={job.description}
          onClick={onDescription}
        />
      </ContextMenuTrigger>
    </ContextMenu>
  );
};
