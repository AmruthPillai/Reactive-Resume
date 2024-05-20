import { t } from "@lingui/macro";
import {
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
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState } from "react";

import { toast } from "../hooks/use-toast";
import { changeTone } from "../services/openai/change-tone";
import { fixGrammar } from "../services/openai/fix-grammar";
import { improveWriting } from "../services/openai/improve-writing";
import { useOpenAiStore } from "../stores/openai";

type Action = "improve" | "fix" | "tone";
type Mood = "casual" | "professional" | "confident" | "friendly";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const AiActions = ({ value, onChange, className }: Props) => {
  const [loading, setLoading] = useState<Action | false>(false);
  const aiEnabled = useOpenAiStore((state) => !!state.apiKey);

  if (!aiEnabled) return null;

  const onClick = async (action: Action, mood?: Mood) => {
    try {
      setLoading(action);

      let result = value;

      if (action === "improve") result = await improveWriting(value);
      if (action === "fix") result = await fixGrammar(value);
      if (action === "tone" && mood) result = await changeTone(value, mood);

      onChange(result);
    } catch (error) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: (error as Error).message,
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
      <div className="absolute -left-5 z-10">
        <Badge
          outline
          variant="primary"
          className="-rotate-90 bg-background px-2 text-[10px] leading-[10px]"
        >
          <MagicWand size={10} className="mr-1" />
          {t`AI`}
        </Badge>
      </div>

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
