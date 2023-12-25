// import "./suggestions.scss";

import { t } from "@lingui/macro";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { PopoverArrow } from "@radix-ui/react-popover";
import {
  Badge,
  Button,
  Input,
  Label,
  PopoverClose,
  ScrollArea,
  Skeleton,
} from "@reactive-resume/ui";
import { Editor } from "@tiptap/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { professionalSummary } from "../services/palm/professional-summary";
import { useResumeStore } from "../stores/resume";
export const Suggestions = ({ editor }: { editor: Editor }) => {
  const jt = useResumeStore((state) => state.resume.jobTitle) || "";
  const [input, setInput] = useState<string>(() => jt);
  const [jobTitle, setJobTitle] = useState<string>(() => jt);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [relatedJobTitles, setRelatedJobTitles] = useState<string[]>([]);

  const getSuggestions = async () => {
    setIsLoading(true);
    const input = {
      jobTitle,
    };
    const result = await professionalSummary(JSON.stringify(input));
    setIsLoading(false);
    setSuggestions(result.suggestions);
    setRelatedJobTitles(result.relatedJobTitles);
  };

  useEffect(() => {
    getSuggestions();
  }, [jobTitle]);

  const handleSuggestionClick = (suggestion: string) => {
    editor.commands.insertContent([
      {
        type: "paragraph",
        attrs: {
          "data-value": suggestion,
          id: "paragraph-01",
        },
        content: [
          {
            type: "text",
            text: suggestion,
          },
        ],
      },
    ]);
  };

  return (
    <>
      <PopoverArrow style={{ fill: "white" }} />
      <div className="flex justify-end">
        <PopoverClose className="justify-end">
          <X />
        </PopoverClose>
      </div>
      <div className="flex flex-col">
        <div>
          <div className="space-y-1.5">
            <Label htmlFor="jobTitle">{t`Job Title`}</Label>
            <div className="flex gap-x-1">
              <Input
                id="jobTitle"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setJobTitle(input);
                }}
              >
                <MagnifyingGlass />
              </Button>
            </div>
            <div>
              {relatedJobTitles?.map((relatedJobTitle) => (
                <Badge
                  outline
                  variant="primary"
                  className="m-1 cursor-pointer bg-background px-2"
                  onClick={() => {
                    setJobTitle(relatedJobTitle);
                    setInput(relatedJobTitle);
                  }}
                >
                  {relatedJobTitle}
                </Badge>
              ))}
            </div>
          </div>
          <h3 className="text-lg">{t`Recommendations`}</h3>
          <ScrollArea className="max-h-[200px] overflow-scroll">
            <ul className="mb-3 mt-2 w-full rounded-lg">
              {isLoading ? (
                <>
                  <Skeleton className="mb-1 h-[90px] w-full" />
                  <Skeleton className="mb-1 h-[90px] w-full" />
                </>
              ) : (
                suggestions?.map((suggestion, index) => {
                  return (
                    <li
                      className="mb-1 cursor-pointer"
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                      >
                        <span className="flex rounded-lg bg-gray-800 p-3 hover:bg-gray-600">
                          <span className="ml-2" title={suggestion}>
                            {suggestion}
                          </span>
                        </span>
                      </motion.div>
                    </li>
                  );
                })
              )}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};
