import { t } from "@lingui/macro";
import {
  Brain,
  CaretDown,
  ChatTeardropText,
  CircleNotch,
  Exam,
  MagicWand,
  PenNib,
} from "@phosphor-icons/react";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@reactive-resume/ui";
import { cn, ResumeSections } from "@reactive-resume/utils";
import { Editor } from "@tiptap/react";
import { useState } from "react";

import { toast } from "../hooks/use-toast";
import { changeTone as openaiChangeTone } from "../services/openai/change-tone";
import { fixGrammar as openaiFixGrammar } from "../services/openai/fix-grammar";
import { improveWriting as openaiImproveWriting } from "../services/openai/improve-writing";
import { changeTone as palmChangeTone } from "../services/palm/change-tone";
import { fixGrammar as palmFixGrammar } from "../services/palm/fix-grammar";
import { improveWriting as palmImproveWriting } from "../services/palm/improve-writing";
import { useOpenAiStore } from "../stores/openai";
import { Suggestions } from "./suggestions/suggestions";

type Action = "improve" | "fix" | "tone";
type Mood = "casual" | "professional" | "confident" | "friendly";

type Props = {
  editor: Editor;
  className?: string;
  sectionName: ResumeSections;
};

export const AiActions = ({ editor, className, sectionName }: Props) => {
  const [loading, setLoading] = useState<Action | false>(false);
  const openaiEnabled = useOpenAiStore((state) => !!state.apiKey);

  const improveWriting = openaiEnabled ? openaiImproveWriting : palmImproveWriting;
  const fixGrammar = openaiEnabled ? openaiFixGrammar : palmFixGrammar;
  const changeTone = openaiEnabled ? openaiChangeTone : palmChangeTone;

  const onClick = async (action: Action, mood?: Mood) => {
    try {
      setLoading(action);
      const textToImprove = editor.getText();
      let result = textToImprove;

      if (action === "improve") result = await improveWriting(textToImprove);
      if (action === "fix") result = await fixGrammar(textToImprove);
      if (action === "tone" && mood) result = await changeTone(textToImprove, mood);

      editor.commands.setContent(result);
    } catch (error) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: (error as Error)?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative mt-4 rounded bg-secondary-accent/50 p-3 outline outline-secondary-accent",
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      <div className="absolute -left-2 z-10">
        <Badge
          outline
          variant="primary"
          className="-rotate-90 bg-background px-2 text-[10px] leading-[10px]"
        >
          <MagicWand size={10} className="mr-1" />
          {/* {openaiEnabled ? t`OPENAPI` : t`DEFAULT`} {t`AI`} */}
          {t`AI`}
        </Badge>
      </div>

      {[
        ResumeSections.EDUCATION as string,
        ResumeSections.EXPERIENCE as string,
        ResumeSections.SUMMARY as string,
      ].includes(sectionName) && (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" disabled={!!loading}>
              {loading === "fix" ? <CircleNotch className="animate-spin" /> : <Brain />}
              <span className="ml-2 text-xs">{t`Suggestions`}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[360px]">
            <Suggestions editor={editor} content={editor.getText()} sectionName={sectionName} />
          </PopoverContent>
        </Popover>
      )}

      <Button size="sm" variant="outline" disabled={!!loading} onClick={() => onClick("improve")}>
        {loading === "improve" ? <CircleNotch className="animate-spin" /> : <PenNib />}
        <span className="ml-2 text-xs">{t`Improve Writing`}</span>
      </Button>

      <Button size="sm" variant="outline" disabled={!!loading} onClick={() => onClick("fix")}>
        {loading === "fix" ? <CircleNotch className="animate-spin" /> : <Exam />}
        <span className="ml-2 text-xs">{t`Fix Spelling & Grammar`}</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" disabled={!!loading}>
            {loading === "tone" ? <CircleNotch className="animate-spin" /> : <ChatTeardropText />}
            <span className="mx-2 text-xs">{t`Change Tone`}</span>
            <CaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onClick("tone", "casual")}>
            <span role="img" aria-label={t`Casual`}>
              🙂
            </span>
            <span className="ml-2">{t`Casual`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick("tone", "professional")}>
            <span role="img" aria-label={t`Professional`}>
              💼
            </span>
            <span className="ml-2">{t`Professional`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick("tone", "confident")}>
            <span role="img" aria-label={t`Confident`}>
              😎
            </span>
            <span className="ml-2">{t`Confident`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick("tone", "friendly")}>
            <span role="img" aria-label={t`Friendly`}>
              😊
            </span>
            <span className="ml-2">{t`Friendly`}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
