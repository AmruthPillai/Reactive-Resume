import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CodeBlockIcon as CodeBlockIconImport,
  CodeIcon as CodeIconImport,
  HighlighterCircleIcon,
  ImageIcon as ImageIconImport,
  KeyReturnIcon,
  LinkSimpleIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  MinusIcon,
  ParagraphIcon as ParagraphIconImport,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextAUnderlineIcon,
  TextBIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextIndentIcon,
  TextItalicIcon,
  TextOutdentIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@reactive-resume/utils";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import type { Editor, EditorContentProps } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { forwardRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Popover, PopoverContent } from "./popover";
import { ScrollArea } from "./scroll-area";
import { Skeleton } from "./skeleton";
import { Toggle } from "./toggle";
import { Tooltip } from "./tooltip";

const InsertImageFormSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

type InsertImageFormValues = z.infer<typeof InsertImageFormSchema>;

type InsertImageProps = {
  onInsert: (value: InsertImageFormValues) => void;
};

const InsertImageForm = ({ onInsert }: InsertImageProps) => {
  const form = useForm<InsertImageFormValues>({
    resolver: zodResolver(InsertImageFormSchema),
    defaultValues: { src: "", alt: "" },
  });

  const onSubmit = (values: InsertImageFormValues) => {
    onInsert(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={async (event) => {
          event.stopPropagation();
          event.preventDefault();

          await form.handleSubmit(onSubmit)();
        }}
      >
        <p className="prose prose-sm prose-zinc dark:prose-invert">
          Insert an image from an external URL and use it on your resume.
        </p>

        <FormField
          name="src"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="alt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="!mt-5 ml-auto max-w-fit">
          <Button type="submit" variant="secondary" size="sm">
            Insert Image
          </Button>
        </div>
      </form>
    </Form>
  );
};

const Toolbar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-0.5 border p-1">
      <Tooltip content="Bold">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("bold")}
          disabled={!editor.can().chain().toggleBold().run()}
          data-state={editor.isActive("bold") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <TextBIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Italic">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("italic")}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          data-state={editor.isActive("italic") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalicIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Strikethrough">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("strike")}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          data-state={editor.isActive("strike") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <TextStrikethroughIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Underline">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("underline")}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          data-state={editor.isActive("underline") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <TextAUnderlineIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Highlight">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("highlight")}
          disabled={!editor.can().chain().focus().toggleHighlight().run()}
          data-state={editor.isActive("highlight") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        >
          <HighlighterCircleIcon />
        </Toggle>
      </Tooltip>

      <div className="my-auto h-5 w-px bg-border" />

      <Tooltip content="Hyperlink">
        <Button type="button" size="sm" variant="ghost" className="px-2" onClick={setLink}>
          <LinkSimpleIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Inline Code">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("code")}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          data-state={editor.isActive("code") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
        >
          <CodeIconImport />
        </Toggle>
      </Tooltip>

      <Tooltip content="Code Block">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("codeBlock")}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          data-state={editor.isActive("codeBlock") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeBlockIconImport />
        </Toggle>
      </Tooltip>

      <div className="my-auto h-5 w-px bg-border" />

      <Tooltip content="Heading 1">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("heading", { level: 1 })}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
          data-state={editor.isActive("heading", { level: 1 }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <TextHOneIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Heading 2">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("heading", { level: 2 })}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
          data-state={editor.isActive("heading", { level: 2 }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TextHTwoIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Heading 3">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("heading", { level: 3 })}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
          data-state={editor.isActive("heading", { level: 3 }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <TextHThreeIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Paragraph">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("paragraph")}
          data-state={editor.isActive("paragraph") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().setParagraph().run()}
        >
          <ParagraphIconImport />
        </Toggle>
      </Tooltip>

      <div className="my-auto h-5 w-px bg-border" />

      <Tooltip content="Align Left">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive({ textAlign: "left" })}
          disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          data-state={editor.isActive({ textAlign: "left" }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <TextAlignLeftIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Align Center">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive({ textAlign: "center" })}
          disabled={!editor.can().chain().focus().setTextAlign("center").run()}
          data-state={editor.isActive({ textAlign: "center" }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <TextAlignCenterIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Align Right">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive({ textAlign: "right" })}
          disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          data-state={editor.isActive({ textAlign: "right" }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <TextAlignRightIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Align Justify">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive({ textAlign: "justify" })}
          disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
          data-state={editor.isActive({ textAlign: "justify" }) ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <TextAlignJustifyIcon />
        </Toggle>
      </Tooltip>

      <div className="my-auto h-5 w-px bg-border" />

      <Tooltip content="Bullet List">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("bulletList")}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          data-state={editor.isActive("bulletList") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBulletsIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Numbered List">
        <Toggle
          size="sm"
          type="button"
          pressed={editor.isActive("orderedList")}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          data-state={editor.isActive("orderedList") ? "on" : "off"}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbersIcon />
        </Toggle>
      </Tooltip>

      <Tooltip content="Outdent">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().chain().focus().liftListItem("listItem").run()}
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        >
          <TextOutdentIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Indent">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().chain().focus().sinkListItem("listItem").run()}
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        >
          <TextIndentIcon />
        </Button>
      </Tooltip>

      <div className="my-auto h-5 w-px bg-border" />

      <Popover>
        <Tooltip content="Insert Image">
          <PopoverTrigger asChild>
            <Button type="button" size="sm" variant="ghost" className="px-2">
              <ImageIconImport />
            </Button>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent className="w-80">
          <InsertImageForm onInsert={(props) => editor.chain().focus().setImage(props).run()} />
        </PopoverContent>
      </Popover>

      <Tooltip content="Insert Break Line">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().chain().focus().setHardBreak().run()}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <KeyReturnIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Insert Horizontal Rule">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().chain().focus().setHorizontalRule().run()}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MinusIcon />
        </Button>
      </Tooltip>

      <div className="my-auto h-5 w-px bg-border" />

      <Tooltip content="Undo">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <ArrowCounterClockwiseIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Redo">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <ArrowClockwiseIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

type RichInputProps = {
  content?: string;
  onChange?: (value: string) => void;
  hideToolbar?: boolean;
  className?: string;
  editorClassName?: string;
  footer?: (editor: Editor) => React.ReactNode;
} & Omit<EditorContentProps, "ref" | "editor" | "content" | "value" | "onChange" | "className">;

export const RichInput = forwardRef<Editor, RichInputProps>(
  (
    { content, onChange, footer, hideToolbar = false, className, editorClassName, ...props },
    _ref,
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Image,
        Underline,
        Highlight,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Link.extend({ inclusive: false }).configure({ openOnClick: false }),
      ],
      editorProps: {
        attributes: {
          class: cn(
            "prose prose-sm prose-zinc max-h-[200px] max-w-none dark:prose-invert focus:outline-none [&_*]:my-2",
            editorClassName,
          ),
        },
      },
      content,
      parseOptions: { preserveWhitespace: "full" },
      onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    if (!editor) {
      return (
        <div className="space-y-2">
          <Skeleton className={cn("h-[42px] w-full", hideToolbar && "hidden")} />
          <Skeleton className="h-[90px] w-full" />
        </div>
      );
    }

    return (
      <div>
        {!hideToolbar && <Toolbar editor={editor} />}

        <ScrollArea orientation="vertical" className="rounded-sm border p-3 pt-0">
          <EditorContent
            editor={editor}
            className={cn(
              "grid min-h-[140px] w-full bg-transparent text-sm placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
              hideToolbar && "pt-2",
              className,
            )}
            {...props}
          />
        </ScrollArea>

        {footer?.(editor)}
      </div>
    );
  },
);

RichInput.displayName = "RichInput";
