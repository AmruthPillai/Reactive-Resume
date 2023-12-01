/* eslint-disable lingui/text-restrictions */
import { t } from "@lingui/macro";
import { PalmGenerateTextRequest, PalmGenerateTextResponse } from "@reactive-resume/schema";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Improve the writing of the following paragraph:

Text: """{input}"""

Revised Text: """`;

export const improveWriting = async (text: string) => {
  const prompt = PROMPT.replace("{input}", text);
  const response = await axios.post<
    PalmGenerateTextResponse,
    AxiosResponse<PalmGenerateTextResponse>,
    PalmGenerateTextRequest
  >("/recommendations/text", {
    model: "models/text-bison-001",
    prompt: {
      text: prompt,
    },
    stopSequences: ['"""'],
  } as PalmGenerateTextRequest);

  if (!response.data[0].candidates) {
    throw new Error(t`OpenAI did not return any choices for your text.`);
  }

  const result = response.data[0].candidates[0].output;

  return result ?? text;
};
