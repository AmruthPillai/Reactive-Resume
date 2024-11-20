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

import { IJob } from "@/client/services/job/job";
import { useDialog } from "@/client/stores/dialog";

const DescriptionJobDialog = () => {
  const { isOpen, close, payload } = useDialog("job");
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
            <h4>{t`Job Description`}</h4>
            <ScrollArea orientation="vertical" className="bg-secondary-accent">
              <div className="h-[180px] whitespace-pre-wrap rounded p-4 font-mono text-xs leading-relaxed">
                {(payload.item as IJob).description}
              </div>
            </ScrollArea>
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