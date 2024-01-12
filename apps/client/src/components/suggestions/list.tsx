import { t } from "@lingui/macro";
import { ScrollArea, Skeleton } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

export const List = ({
  isLoading,
  suggestions,
  handleSuggestionClick,
}: {
  isLoading: boolean;
  suggestions: { text: string; isSelected: boolean }[];
  handleSuggestionClick: (suggestion: string) => void;
}) => {
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
            suggestions?.map((suggestion, index) => {
              return (
                <li
                  className={cn(
                    "mb-1",
                    suggestion.isSelected ? "cursor-default" : "cursor-pointer",
                  )}
                  key={index}
                  onClick={() => !suggestion.isSelected && handleSuggestionClick(suggestion.text)}
                >
                  <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                  >
                    <span
                      className={cn(
                        "flex rounded-lg p-3",
                        suggestion.isSelected
                          ? "bg-secondary"
                          : "bg-secondary-accent hover:bg-secondary",
                      )}
                    >
                      <span className="ml-2" title={suggestion.text}>
                        {suggestion.text}
                      </span>
                    </span>
                  </motion.div>
                </li>
              );
            })
          )}
        </ul>
      </ScrollArea>
    </>
  );
};
