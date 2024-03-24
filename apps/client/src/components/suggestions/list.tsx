import { t } from "@lingui/macro";
import { ScrollArea, Skeleton } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { ListItem } from "./list-item";

export const List = ({
  isLoading,
  suggestions,
  handleSuggestionClick,
}: {
  isLoading: boolean;
  suggestions: { text: string; isSelected: boolean }[];
  handleSuggestionClick: (suggestion: string) => void;
}) => {
  const suggestionsList = useMemo(() => {
    return suggestions?.length === 0 ? (
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      >
        {t`No suggestions found; try exploring alternative job titles in your search`}
      </motion.div>
    ) : (
      suggestions?.map((suggestion, index) => (
        <ListItem
          handleSuggestionClick={handleSuggestionClick}
          suggestion={suggestion}
          key={suggestion.text || index}
        />
      ))
    );
  }, [suggestions, handleSuggestionClick]);

  return (
    <>
      <h3 className="text-lg">{t`Recommendations`}</h3>
      <ScrollArea className="max-h-[250px] overflow-scroll">
        <ul className="mb-3 mt-2 w-full rounded-lg">
          {isLoading ? (
            <>
              <Skeleton className="mb-1 h-[90px] w-full" />
              <Skeleton className="mb-1 h-[90px] w-full" />
            </>
          ) : (
            suggestionsList
          )}
        </ul>
      </ScrollArea>
    </>
  );
};
