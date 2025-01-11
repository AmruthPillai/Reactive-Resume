import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { t } from "@lingui/macro";
import { CopySimple, DotsSixVertical, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

export type SectionListItemProps = {
  id: string;
  title: string;
  visible?: boolean;
  description?: string;

  // Callbacks
  onUpdate?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onToggleVisibility?: () => void;
};

export const SectionListItem = ({
  id,
  title,
  description,
  visible = true,
  onUpdate,
  onDuplicate,
  onDelete,
  onToggleVisibility,
}: SectionListItemProps) => {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 100 : undefined,
    transition,
  };

  return (
    <motion.section
      ref={setNodeRef}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="border-x border-t bg-secondary/10 first-of-type:rounded-t last-of-type:rounded-b last-of-type:border-b"
    >
      <div style={style} className="flex transition-opacity">
        {/* Drag Handle */}
        <div
          {...listeners}
          {...attributes}
          className={cn(
            "flex w-5 cursor-move items-center justify-center",
            !isDragging && "hover:bg-secondary",
          )}
        >
          <DotsSixVertical weight="bold" size={12} />
        </div>

        {/* List Item */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                "flex-1 cursor-context-menu p-4 hover:bg-secondary-accent",
                !visible && "opacity-50",
              )}
              onClick={onUpdate}
            >
              <h4 className="font-medium leading-relaxed">{title}</h4>
              {description && <p className="text-xs leading-relaxed opacity-50">{description}</p>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={visible} onCheckedChange={onToggleVisibility}>
              <span className="-ml-0.5">{t`Visible`}</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onUpdate}>
              <PencilSimple size={14} />
              <span className="ml-2">{t`Edit`}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <CopySimple size={14} />
              <span className="ml-2">{t`Copy`}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-error" onClick={onDelete}>
              <TrashSimple size={14} />
              <span className="ml-2">{t`Remove`}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.section>
  );
};
