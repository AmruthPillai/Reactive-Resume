import { openai } from "@ai-sdk/openai";
import { Injectable } from "@nestjs/common";
import { generateText } from "ai";

@Injectable()
export class OpenAIService {
  async improveWriting(original: string) {
    const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
                    Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
                    Improve the writing of the following paragraph:

                    Text: ${original}

                    Revised Text: `;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: PROMPT,
    });

    return text;
  }

  async fixGrammar(original: string) {
    const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
                    Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
                    Just fix the spelling and grammar of the following paragraph, do not change the meaning:

                    Text: ${original}

                    Revised Text: `;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: PROMPT,
    });

    return text;
  }

  async changeTone(original: string, mood: string) {
    const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
                    Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
                    Change the tone of the following paragraph to be ${mood}:

                    Text: ${original}

                    Revised Text: `;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: PROMPT,
    });

    return text;
  }
}
