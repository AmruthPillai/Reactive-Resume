import { Editor } from "@tiptap/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { professionalSummary } from "../services/palm/professional-summary";

export const Suggestions = ({ editor }: { editor: Editor }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [relatedJobTitles, setRelatedJobTitles] = useState<string[]>([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const input = {
        // eslint-disable-next-line lingui/no-unlocalized-strings
        jobTitle: "Developer",
      };
      const result = await professionalSummary(JSON.stringify(input));
      setSuggestions(result.suggestions);
      setRelatedJobTitles(result.relatedJobTitles);
    };
    getSuggestions();
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    editor.commands.insertContent([
      {
        type: "paragraph",
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
    <div className="flex flex-col gap-y-5">
      <div className="m-3">
        <h3 className="text-lg">Recommended Items</h3>
        <ul className="mb-3 mt-2 w-full rounded-lg">
          {suggestions?.map((suggestion, index) => {
            return (
              <li className="mb-1" key={index} onClick={() => handleSuggestionClick(suggestion)}>
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                >
                  <span className="w-fill flex rounded-lg bg-gray-800 p-3 hover:bg-gray-600">
                    <span className="ml-2" title={suggestion}>
                      {suggestion}
                    </span>
                  </span>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
