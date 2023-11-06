import {
  ArrowCounterClockwise,
  Broom,
  Columns,
  Eye,
  EyeSlash,
  List,
  PencilSimple,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import { defaultSections, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
} from "@reactive-resume/ui";
import get from "lodash.get";
import { useMemo } from "react";

import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

type Props = { id: SectionKey };

export const SectionOptions = ({ id }: Props) => {
  const { open } = useDialog(id);
  const setValue = useResumeStore((state) => state.setValue);
  const removeSection = useResumeStore((state) => state.removeSection);

  const originalName = get(defaultSections, `${id}.name`, "") as SectionWithItem;
  const section = useResumeStore((state) => get(state.resume.data.sections, id)) as SectionWithItem;

  const hasItems = useMemo(() => "items" in section, [section]);
  const isCustomSection = useMemo(() => id.startsWith("custom"), [id]);

  const onCreate = () => open("create", { id });
  const toggleVisibility = () => setValue(`sections.${id}.visible`, !section.visible);
  const onResetName = () => setValue(`sections.${id}.name`, originalName);
  const onChangeColumns = (value: string) => setValue(`sections.${id}.columns`, Number(value));
  const onResetItems = () => setValue(`sections.${id}.items`, []);
  const onRemove = () => removeSection(id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <List weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {hasItems && (
          <>
            <DropdownMenuItem onClick={onCreate}>
              <Plus />
              <span className="ml-2">Add a new item</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggleVisibility}>
            {section.visible ? <Eye /> : <EyeSlash />}
            <span className="ml-2">{section.visible ? "Hide" : "Show"}</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PencilSimple />
              <span className="ml-2">Rename</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <div className="relative col-span-2">
                <Input
                  id={`sections.${id}.name`}
                  value={section.name}
                  onChange={(event) => {
                    setValue(`sections.${id}.name`, event.target.value);
                  }}
                />
                <Button
                  size="icon"
                  variant="link"
                  onClick={onResetName}
                  className="absolute inset-y-0 right-0"
                >
                  <ArrowCounterClockwise />
                </Button>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Columns />
              <span className="ml-2">Columns</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={`${section.columns}`} onValueChange={onChangeColumns}>
                <DropdownMenuRadioItem value="1">1 Column</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2 Columns</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">3 Columns</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="4">4 Columns</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="5">5 Columns</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={!hasItems} onClick={onResetItems}>
          <Broom />
          <span className="ml-2">Reset</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-error" disabled={!isCustomSection} onClick={onRemove}>
          <TrashSimple />
          <span className="ml-2">Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
