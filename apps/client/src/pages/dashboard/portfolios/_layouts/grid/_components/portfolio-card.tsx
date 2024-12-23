// client/src/pages/dashboard/portfolios/_layouts/grid/_components/portfolio-card.tsx
import { t } from "@lingui/macro";
import {
  CopySimple,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import { PortfolioDto } from "@reactive-resume/dto";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

type Props = {
  portfolio: PortfolioDto;
};

export const PortfolioCard = ({ portfolio }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<PortfolioDto>("portfolio");
  const { open: lockOpen } = useDialog<PortfolioDto>("lock");

  const lastUpdated = dayjs().to(portfolio.updatedAt);

  const onOpen = () => {
    navigate(`/builder/${portfolio.id}?mode=portfolio`);
  };

  const onUpdate = () => {
    open("update", { id: "portfolio", item: portfolio });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "portfolio", item: portfolio });
  };

  const onLockChange = () => {
    lockOpen(portfolio.locked ? "update" : "create", { id: "lock", item: portfolio });
  };

  const onDelete = () => {
    open("delete", { id: "portfolio", item: portfolio });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <BaseCard onClick={onOpen}>
          <AnimatePresence>
            {portfolio.locked && (
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
            <h4 className="line-clamp-2 font-medium">{portfolio.title}</h4>
            <p className="line-clamp-1 text-xs opacity-75">{t`Last updated ${lastUpdated}`}</p>
          </div>
        </BaseCard>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={onOpen}>
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onUpdate}>
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}>
          <CopySimple size={14} className="mr-2" />
          {t`Duplicate`}
        </ContextMenuItem>
        {portfolio.locked ? (
          <ContextMenuItem onClick={onLockChange}>
            <LockOpen size={14} className="mr-2" />
            {t`Unlock`}
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={onLockChange}>
            <Lock size={14} className="mr-2" />
            {t`Lock`}
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem className="text-error" onClick={onDelete}>
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
