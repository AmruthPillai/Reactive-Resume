// client/src/pages/dashboard/portfolios/_layouts/list/_components/portfolio-item.tsx
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
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

type Props = {
  portfolio: PortfolioDto;
};

export const PortfolioListItem = ({ portfolio }: Props) => {
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

  const dropdownMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="aspect-square">
        <Button size="icon" variant="ghost">
          <DotsThreeVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onUpdate();
          }}
        >
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate();
          }}
        >
          <CopySimple size={14} className="mr-2" />
          {t`Duplicate`}
        </DropdownMenuItem>
        {portfolio.locked ? (
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation();
              onLockChange();
            }}
          >
            <LockOpen size={14} className="mr-2" />
            {t`Unlock`}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation();
              onLockChange();
            }}
          >
            <Lock size={14} className="mr-2" />
            {t`Lock`}
          </DropdownMenuItem>
        )}
        <ContextMenuSeparator />
        <DropdownMenuItem
          className="text-error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="even:bg-secondary/20">
        <BaseListItem
          className="group"
          title={portfolio.title}
          description={t`Last updated ${lastUpdated}`}
          end={dropdownMenu}
          onClick={onOpen}
        />
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
