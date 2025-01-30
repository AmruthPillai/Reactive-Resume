import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { FloppyDisk, TrashSimple } from "@phosphor-icons/react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL } from "@/client/constants/llm";
import { useOpenAiStore } from "@/client/stores/openai";

const formSchema = z.object({
  apiKey: z
    .string()
    // eslint-disable-next-line lingui/no-unlocalized-strings
    .min(1, "API key cannot be empty.")
    .default(""),
  baseURL: z
    .string()
    // eslint-disable-next-line lingui/no-unlocalized-strings
    .regex(/^https?:\/\/\S+$/, "That doesn't look like a valid URL")
    .or(z.literal(""))
    .default(""),
  model: z.string().default(DEFAULT_MODEL),
  maxTokens: z.number().default(DEFAULT_MAX_TOKENS),
});

type FormValues = z.infer<typeof formSchema>;

export const OpenAISettings = () => {
  const { apiKey, setApiKey, baseURL, setBaseURL, model, setModel, maxTokens, setMaxTokens } =
    useOpenAiStore();

  const isEnabled = !!apiKey;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: apiKey ?? "",
      baseURL: baseURL ?? "",
      model: model ?? DEFAULT_MODEL,
      maxTokens: maxTokens ?? DEFAULT_MAX_TOKENS,
    },
  });

  const onSubmit = ({ apiKey, baseURL, model, maxTokens }: FormValues) => {
    setApiKey(apiKey);
    if (baseURL) {
      setBaseURL(baseURL);
    }
    if (model) {
      setModel(model);
    }
    if (maxTokens) {
      setMaxTokens(maxTokens);
    }
  };

  const onRemove = () => {
    setApiKey(null);
    setBaseURL(null);
    setModel(DEFAULT_MODEL);
    setMaxTokens(DEFAULT_MAX_TOKENS);
    form.reset({ apiKey: "", baseURL: "", model: DEFAULT_MODEL, maxTokens: DEFAULT_MAX_TOKENS });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`OpenAI/Ollama Integration`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`You can make use of the OpenAI API to help you generate content, or improve your writing while composing your resume.`}
        </p>
      </div>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          <Trans>
            You have the option to{" "}
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/"
            >
              obtain your own OpenAI API key
            </a>
            . This key empowers you to leverage the API as you see fit. Alternatively, if you wish
            to disable the AI features in Reactive Resume altogether, you can simply remove the key
            from your settings.
          </Trans>
        </p>

        <p>
          <Trans>
            You can also integrate with Ollama simply by setting the API key to
            `sk-1234567890abcdef` and the Base URL to your Ollama URL, i.e.
            `http://localhost:11434/v1`. You can also pick and choose models and set the max tokens
            as per your preference.
          </Trans>
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="apiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`OpenAI/Ollama API Key`}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="sk-..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="baseURL"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Base URL`}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="http://localhost:11434/v1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="model"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Model`}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={DEFAULT_MODEL} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="maxTokens"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Max Tokens`}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`${DEFAULT_MAX_TOKENS}`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2 self-end sm:col-start-2">
            <Button type="submit" disabled={!form.formState.isValid}>
              {isEnabled && <FloppyDisk className="mr-2" />}
              {isEnabled ? t`Saved` : t`Save Locally`}
            </Button>

            {isEnabled && (
              <Button type="reset" variant="ghost" onClick={onRemove}>
                <TrashSimple className="mr-2" />
                {t`Forget`}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          <Trans>
            Your API key is securely stored in the browser's local storage and is only utilized when
            making requests to OpenAI via their official SDK. Rest assured that your key is not
            transmitted to any external server except when interacting with OpenAI's services.
          </Trans>
        </p>
      </div>

      <Alert variant="warning">
        <div className="prose prose-neutral max-w-full text-xs leading-relaxed text-primary dark:prose-invert">
          <Trans>
            <span className="font-medium">Note: </span>
            By utilizing the OpenAI API, you acknowledge and accept the{" "}
            <a
              href="https://openai.com/policies/terms-of-use"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              terms of use
            </a>{" "}
            and{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              privacy policy
            </a>{" "}
            outlined by OpenAI. Please note that Reactive Resume bears no responsibility for any
            improper or unauthorized utilization of the service, and any resulting repercussions or
            liabilities solely rest on the user.
          </Trans>
        </div>
      </Alert>
    </div>
  );
};
