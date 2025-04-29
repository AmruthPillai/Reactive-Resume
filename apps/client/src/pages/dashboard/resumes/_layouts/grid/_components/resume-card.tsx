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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

type Props = {
  resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");

  const template = resume.data.metadata.template;
  const lastUpdated = dayjs().to(resume.updatedAt);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line lingui/no-unlocalized-strings
        window.matchMedia(`(pointer: coarse)`).matches
      );
    };

    setIsTouchDevice(checkTouch());

    const handleScroll = () => {
      if (isTouchDevice && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTouchDevice, isOpen]);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setIsOpen(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isTouchDevice) return;

    e.stopPropagation();

    setIsOpen((prev) => !prev);
  };

  const handleOpenChange = (open: boolean) => {
    if (isTouchDevice) {
      if (!open) {
        setIsOpen(false);
      }
    } else {
      setIsOpen(open);
    }
  };

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
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={isOpen} modal={false} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger
          className="w-full text-left"
          data-state={isOpen ? "open" : "closed"}
          aria-expanded={isOpen}
          onClick={handleCardClick}
        >
          <BaseCard className="w-full cursor-context-menu space-y-0">
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
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            sideOffset={5}
            align="start"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              isTouchDevice && e.stopPropagation();
            }}
          >
            <DropdownMenuItem onClick={onOpen}>
              <FolderOpen size={14} className="mr-2" />
              {t`Open`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onUpdate}>
              <PencilSimple size={14} className="mr-2" />
              {t`Rename`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <CopySimple size={14} className="mr-2" />
              {t`Duplicate`}
            </DropdownMenuItem>
            {resume.locked ? (
              <DropdownMenuItem onClick={onLockChange}>
                <LockOpen size={14} className="mr-2" />
                {t`Unlock`}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onLockChange}>
                <Lock size={14} className="mr-2" />
                {t`Lock`}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error" onClick={onDelete}>
              <TrashSimple size={14} className="mr-2" />
              {t`Delete`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};
