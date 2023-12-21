/* eslint-disable lingui/text-restrictions */
import { t } from "@lingui/macro";
import { PalmGenerateTextRequest, PalmGenerateTextResponse } from "@reactive-resume/schema";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Generate the suggestion for Professional Summary for job title and the related Job titles.
Write the data in the following JSON format:
{"jobTitle": JOB_TITLE, "relatedJobTitles": [RELATED_JOB_TITLE_1, RELATED_JOB_TITLE_1], "suggestions": [SUGGESTION_1, SUGGESTION_2] }
Return just valid JSON, do not add new lines or extra spaces.

Candidate Details: """{input}"""
`;

type Response = {
  suggestions: string[];
  relatedJobTitles: string[];
  jobTitle: string;
};

export const professionalSummary = async (text: string) => {
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

  if (!response.data[0].candidates || !response.data[0].candidates[0].output) {
    throw new Error(t`OpenAI did not return any choices for your text.`);
  }

  const result = response.data[0].candidates[0].output;
  let data: Response;
  try {
    data = JSON.parse(result) as Response;
  } catch {
    throw new Error(t`OpenAI did not return a valid JSON.`);
  }

  return data;
};
