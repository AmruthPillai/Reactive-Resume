import { t } from "@lingui/macro";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  ScrollArea,
} from "@reactive-resume/ui";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useDarkMode } from "usehooks-ts";

import { IJob } from "@/client/services/job/job";
import { useTechStacks } from "@/client/services/job/tech-stack";
import { useDialog } from "@/client/stores/dialog";

const DescriptionJobDialog = () => {
  const { isOpen, close, payload } = useDialog("job");
  const { techStacks } = useTechStacks();
  const { isDarkMode } = useDarkMode();

  const findTitle = (id: number) => {
    return techStacks?.find((ts) => ts.Id === id)?.title;
  };

  return (
    <Dialog
      // open={true}
      open={isOpen}
      onOpenChange={close}
    >
      {isOpen && (
        <DialogContent
          style={{
            maxWidth: "56rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            // height: pdfState === "none" ? "unset" : "88vh",
          }}
        >
          <DialogHeader>
            <p className="text-xl font-semibold">{(payload.item as IJob).title}</p>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">{t`Job Description`}</h4>
            <ScrollArea orientation="vertical">
              <div
                dangerouslySetInnerHTML={{
                  __html: (payload.item as IJob).description,
                }}
                className="h-[180px] whitespace-pre-wrap rounded p-4 pl-0 font-mono text-xs leading-relaxed"
              />
              {/* {(payload.item as IJob).description}
              </div> */}
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold">{t`Tech Stack`}</h4>
            <div className="flex gap-2">
              {(payload.item as IJob)._nc_m2m_job_tech_stacks.map((ts) => (
                <div
                  className="rounded-full px-6 py-1"
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

          <DialogFooter className="!justify-center">
            <AnimatePresence presenceAffectsLayout>
              <Button>{t`Apply Now`}</Button>
            </AnimatePresence>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DescriptionJobDialog;