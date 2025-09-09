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
    if (!baseURL) {
      throw new Error(
        t`Azure OpenAI Base URL is required when using Azure OpenAI.`,
      );
    }

    if (!model) {
      throw new Error(
        t`Azure OpenAI deployment name (model) is required when using Azure OpenAI.`,
      );

      if (!azureApiVersion) {
        throw new Error(
          t`Azure OpenAI API version is required when using Azure OpenAI.`,
        );
      }
    }

    // Construct Azure OpenAI URL: https://your-resource.openai.azure.com/openai/deployments/your-deployment
    const azureBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const constructedURL = `${azureBaseURL}/openai/deployments/${model}`;

    return new OpenAI({
      apiKey,
      baseURL: constructedURL,
      defaultQuery: { "api-version": azureApiVersion ?? undefined },
      dangerouslyAllowBrowser: true,
    });
  }

  if (baseURL) {
    return new OpenAI({
      apiKey,
      baseURL,
      dangerouslyAllowBrowser: true,
    });
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};
