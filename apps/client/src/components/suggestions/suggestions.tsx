import { X } from "@phosphor-icons/react";
import { PopoverArrow } from "@radix-ui/react-popover";
import { PromptKey } from "@reactive-resume/schema";
import { PopoverClose } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

import { palmSuggestions } from "@/client/services/palm/suggestions";
import { useRecommendations } from "@/client/services/recommendations/recommendations";

import { useResumeStore } from "../../stores/resume";
import { List } from "./list";
import { Search } from "./search";

export const Suggestions = ({
  editor,
  content,
  sectionName,
}: {
  editor: Editor;
  content: string;
  sectionName: ResumeSections;
}) => {
  const { resume } = useResumeStore.getState();

  const [jobTitle, setJobTitle] = useState<string>(() => resume.jobTitle || "");
  const [suggestions, setSuggestions] = useState<{ text: string; isSelected: boolean }[]>([]);
  const [relatedJobTitles, setRelatedJobTitles] = useState<string[]>([]);

  const { recommendations, loading } = useRecommendations(jobTitle, sectionName as PromptKey);

  useEffect(() => {
    const list = recommendations?.recommendations?.map((suggestion) => ({
      text: suggestion.phrase,
      isSelected: content.includes(suggestion.phrase),
    }));
    setSuggestions(list || []);
    setRelatedJobTitles(recommendations?.relatedJobTitles || []);
  }, [recommendations]);

  const _getSuggestions = async () => {
    const experience = resume.data.sections.experience.items.map((exp) => ({
      date: exp.date,
      jobTitle: exp.position,
      company: exp.company,
      location: exp.location,
    }));
    const education = resume.data.sections.education.items.map((edu) => ({
      date: edu.date,
      studyArea: edu.area,
      studyType: edu.studyType,
      institution: edu.institution,
      score: edu.score,
    }));
    const certifications = resume.data.sections.certifications.items.map((cert) => ({
      date: cert.date,
      name: cert.name,
      issuer: cert.issuer,
    }));
    const skills = resume.data.sections.skills.items.map((skl) => ({
      name: skl.name,
      keywords: skl.keywords,
    }));
    const input = {
      jobTarget: jobTitle,
      // Experience details
      ...([ResumeSections.EXPERIENCE as string, ResumeSections.SUMMARY as string].includes(
        sectionName,
      )
        ? { workExperience: experience }
        : {}),
      // Education details
      ...([ResumeSections.EDUCATION as string, ResumeSections.SUMMARY as string].includes(
        sectionName,
      )
        ? { education }
        : {}),
      // Skills details
      ...([ResumeSections.EXPERIENCE as string, ResumeSections.SUMMARY as string].includes(
        sectionName,
      )
        ? { keySkills: skills }
        : {}),
      // Certifications details
      ...([ResumeSections.SUMMARY as string].includes(sectionName) ? certifications : {}),
    };
    const result = await palmSuggestions(JSON.stringify(input), sectionName);
    const list = result.suggestions?.map((suggestion: string) => ({
      text: suggestion,
      isSelected: content.includes(suggestion),
    }));
    setSuggestions(list);
    setRelatedJobTitles(result.relatedJobTitles);
  };

  // TO use the Palm API directly
  // useEffect(() => {
  //   _getSuggestions();
  // }, [jobTitle]);

  useEffect(() => {
    if (suggestions.length > 0) {
      const list = suggestions.map((suggestion) => ({
        text: suggestion.text,
        isSelected: content.includes(suggestion.text),
      }));
      setSuggestions(list);
    }
  }, [content]);

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
          <Search relatedJobTitles={relatedJobTitles} setJobTitle={setJobTitle} />

          <List
            isLoading={loading}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>
    </>
  );
};
