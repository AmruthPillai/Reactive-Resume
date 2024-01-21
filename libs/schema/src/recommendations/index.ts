export type PromptKey = "summary" | "education" | "experience";

export type PromptType = {
  [key in PromptKey]: string;
};

export * from "./palm";
