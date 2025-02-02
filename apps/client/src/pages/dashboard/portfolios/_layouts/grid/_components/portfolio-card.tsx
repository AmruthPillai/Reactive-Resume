// client/src/pages/dashboard/portfolios/_layouts/grid/_components/portfolio-card.tsx
import { t } from "@lingui/macro";
import {
  CopySimple,
  DotsThreeVertical,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import { PortfolioDto } from "@reactive-resume/dto";
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
    // Change this line to use the portfolio route with mode query parameter
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
        <BaseCard className="group" onClick={onOpen}>
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

          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <DotsThreeVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onOpen(); }}>
                  <FolderOpen size={14} className="mr-2" />
                  {t`Open`}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onUpdate(); }}>
                  <PencilSimple size={14} className="mr-2" />
                  {t`Rename`}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate(); }}>
                  <CopySimple size={14} className="mr-2" />
                  {t`Duplicate`}
                </DropdownMenuItem>
                {portfolio.locked ? (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onLockChange(); }}>
                    <LockOpen size={14} className="mr-2" />
                    {t`Unlock`}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onLockChange(); }}>
                    <Lock size={14} className="mr-2" />
                    {t`Lock`}
                  </DropdownMenuItem>
                )}
                <ContextMenuSeparator />
                <DropdownMenuItem
                  className="text-error"
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                >
                  <TrashSimple size={14} className="mr-2" />
                  {t`Delete`}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
