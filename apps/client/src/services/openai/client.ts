import { t } from "@lingui/macro";
import { OpenAI } from "openai";

import { useOpenAiStore } from "@/client/stores/openai";

export const openai = () => {
  const { apiKey, baseURL, isAzure, azureApiVersion, model } = useOpenAiStore.getState();

  if (!apiKey) {
    throw new Error(
      t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`,
    );
  }

  if (isAzure) {
    if (!baseURL || !model || !azureApiVersion) {
      throw new Error(
        t`Azure OpenAI Base URL, deployment name (model), and API version are required when using Azure OpenAI.`,
      );
    }

    const azureBaseURL = baseURL.replace(/\/$/, "");

    return new OpenAI({
      apiKey,
      baseURL: `${azureBaseURL}/openai/deployments/${model}`,
      defaultQuery: { "api-version": azureApiVersion },
      dangerouslyAllowBrowser: true,
    });
  }

  return new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });
};
