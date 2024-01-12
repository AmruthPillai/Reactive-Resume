import { t } from "@lingui/macro";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Badge, Button, Input, Label } from "@reactive-resume/ui";
import { useState } from "react";

import { useResumeStore } from "../../stores/resume";

export const Search = ({
  relatedJobTitles,
  setJobTitle,
}: {
  relatedJobTitles: string[];
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const jt = useResumeStore((state) => state.resume.jobTitle) || "";
  const [input, setInput] = useState<string>(() => jt);

  return (
    <>
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
      </div>
      <div className="my-5">
        {relatedJobTitles?.map((relatedJobTitle) => (
          <Badge
            key={relatedJobTitle}
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
    </>
  );
};
