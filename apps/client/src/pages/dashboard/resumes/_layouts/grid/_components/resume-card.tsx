import { t } from "@lingui/macro";
import {
  CopySimple,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import type { ResumeDto } from "@reactive-resume/dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

type Props = {
  resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const template = resume.data.metadata.template;
  const lastUpdated = dayjs().to(resume.updatedAt);

  // Global scroll handler that closes all dropdowns
  useEffect(() => {
    const handleScroll = () => {
      setDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hover with delay to prevent accidental triggers
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(true);
    }, 200); // 200ms delay before showing dropdown
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // 300ms delay before hiding dropdown for better UX
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onOpen = () => {
    void navigate(`/builder/${resume.id}`);
  };

  const onUpdate = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
    open("delete", { id: "resume", item: resume });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <BaseCard className="cursor-context-menu space-y-0">
        <AnimatePresence>
          {resume.locked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm"
            >
              <Lock size={42} />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
            "bg-gradient-to-t from-background/80 to-transparent",
          )}
        >
          <h4 className="line-clamp-2 font-medium">{resume.title}</h4>
          <p className="line-clamp-1 text-xs opacity-75">{t`Last updated ${lastUpdated}`}</p>
        </div>

        <img
          src={`/templates/jpg/${template}.jpg`}
          alt={template}
          className="rounded-sm opacity-80"
        />
      </BaseCard>

      {/* Custom Dropdown Menu that appears on hover */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm"
            onClick={onOpen}
            onMouseEnter={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              setDropdownOpen(true);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex w-full max-w-[180px] flex-col rounded-md bg-card shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={onOpen}
              >
                <FolderOpen size={16} className="mr-2" />
                {t`Open`}
              </button>
              <button 
                className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={onUpdate}
              >
                <PencilSimple size={16} className="mr-2" />
                {t`Rename`}
              </button>
              <button 
                className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={onDuplicate}
              >
                <CopySimple size={16} className="mr-2" />
                {t`Duplicate`}
              </button>
              <button 
                className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={onLockChange}
              >
                {resume.locked ? (
                  <>
                    <LockOpen size={16} className="mr-2" />
                    {t`Unlock`}
                  </>
                ) : (
                  <>
                    <Lock size={16} className="mr-2" />
                    {t`Lock`}
                  </>
                )}
              </button>
              <div className="mx-2 my-1 h-px bg-border"></div>
              <button 
                className="flex w-full items-center px-4 py-2 text-sm text-error hover:bg-accent hover:text-error"
                onClick={onDelete}
              >
                <TrashSimple size={16} className="mr-2" />
                {t`Delete`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
