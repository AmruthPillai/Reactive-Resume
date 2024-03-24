import { cn } from "@reactive-resume/utils";

export const ListItem = ({
  suggestion,
  handleSuggestionClick,
}: {
  suggestion: { text: string; isSelected: boolean };
  handleSuggestionClick: (suggestion: string) => void;
}) => {
  return (
    <li
      className={cn("mb-1", suggestion.isSelected ? "cursor-default" : "cursor-pointer")}
      onClick={() => !suggestion.isSelected && handleSuggestionClick(suggestion.text)}
    >
      {/* <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
    > */}
      <span
        className={cn(
          "flex rounded-lg p-3",
          suggestion.isSelected ? "bg-secondary" : "bg-secondary-accent hover:bg-secondary",
        )}
      >
        <span className="ml-2" title={suggestion.text}>
          {suggestion.text}
        </span>
      </span>
      {/* </motion.div> */}
    </li>
  );
};
