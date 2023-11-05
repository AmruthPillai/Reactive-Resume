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
    setLoading(action);
    let result = value;

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    if (action === "improve") result = await improveWriting(value);
    if (action === "fix") result = await fixGrammar(value);
    if (action === "tone" && mood) result = await changeTone(value, mood);

    onChange("Result" + result);

    setLoading(false);
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
          AI
        </Badge>
      </div>

      <Button size="sm" variant="outline" disabled={!!loading} onClick={() => onClick("improve")}>
        {loading === "improve" ? <CircleNotch className="animate-spin" /> : <PenNib />}
        <span className="ml-2 text-xs">Improve Writing</span>
      </Button>

      <Button size="sm" variant="outline" disabled={!!loading} onClick={() => onClick("fix")}>
        {loading === "fix" ? <CircleNotch className="animate-spin" /> : <Exam />}
        <span className="ml-2 text-xs">Fix Spelling & Grammar</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" disabled={!!loading}>
            {loading === "tone" ? <CircleNotch className="animate-spin" /> : <ChatTeardropText />}
            <span className="mx-2 text-xs">Change Tone</span>
            <CaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onClick("tone", "casual")}>
            <span role="img" aria-label="Casual">
              🙂
            </span>
            <span className="ml-2">Casual</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick("tone", "professional")}>
            <span role="img" aria-label="Professional">
              💼
            </span>
            <span className="ml-2">Professional</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick("tone", "confident")}>
            <span role="img" aria-label="Confident">
              😎
            </span>
            <span className="ml-2">Confident</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick("tone", "friendly")}>
            <span role="img" aria-label="Friendly">
              😊
            </span>
            <span className="ml-2">Friendly</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
