import { t } from "@lingui/macro";
import { Folder, FolderOpen, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import type { FolderDto } from "@reactive-resume/dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

type Props = {
  folder: FolderDto;
};

export const FolderCard = ({ folder }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<FolderDto>("folder");

  const lastUpdated = dayjs().to(folder.updatedAt);

  const onOpen = () => {
    void navigate(`/dashboard/folders/${folder.id}`);
  };

  const onUpdate = () => {
    open("update", { id: "folder", item: folder });
  };

  const onDelete = () => {
    open("delete", { id: "folder", item: folder });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-left">
          <BaseCard className="cursor-context-menu space-y-0">
            <Folder size={42} weight="fill" />

            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
                "bg-gradient-to-t from-background/80 to-transparent",
              )}
            >
              <h4 className="font-medium">{folder.name}</h4>
              <p className="text-xs opacity-75">{t`Last updated ${lastUpdated}`}</p>
            </div>
          </BaseCard>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={onOpen}>
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onUpdate}>
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-error" onClick={onDelete}>
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
