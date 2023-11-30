/* eslint-disable lingui/text-restrictions */

import { t } from "@lingui/macro";

import { openai } from "./client";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Change the tone of the following paragraph to be {mood}:

Text: """{input}"""

Revised Text: """`;

type Mood = "casual" | "professional" | "confident" | "friendly";

export const changeTone = async (text: string, mood: Mood) => {
  const prompt = PROMPT.replace("{mood}", mood).replace("{input}", text);

  const result = await openai().chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 1024,
    temperature: 0.5,
    stop: ['"""'],
    n: 1,
  });

  if (result.choices.length === 0) {
    throw new Error(t`OpenAI did not return any choices for your text.`);
  }

  return result.choices[0].message.content ?? text;
};
