import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { LockSimple, LockSimpleOpen, TrashSimple } from "@phosphor-icons/react";
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
import { cn } from "@reactive-resume/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useOpenAiStore } from "@/client/stores/openai";

const formSchema = z.object({
  apiKey: z
    .string()
    // eslint-disable-next-line lingui/t-call-in-function
    .regex(/^sk-.+$/, t`That doesn't look like a valid OpenAI API key.`)
    .default(""),
});

type FormValues = z.infer<typeof formSchema>;

export const OpenAISettings = () => {
  const { apiKey, setApiKey } = useOpenAiStore();
  const isEnabled = !!apiKey;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { apiKey: apiKey ?? "" },
  });

  const onSubmit = ({ apiKey }: FormValues) => {
    setApiKey(apiKey);
  };

  const onRemove = () => {
    setApiKey(null);
    form.reset({ apiKey: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`OpenAI Integration`}</h3>
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
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="apiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`API Key`}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="sk-..." {...field} disabled={isEnabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={cn(
              "flex items-center space-x-2 self-end sm:col-start-2",
              !!form.formState.errors.apiKey && "self-center",
            )}
          >
            <Button type="submit" disabled={isEnabled || !form.formState.isDirty}>
              {!isEnabled && <LockSimpleOpen className="mr-2" />}
              {isEnabled && <LockSimple className="mr-2" />}
              {isEnabled ? t`Stored` : t`Store Locally`}
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
