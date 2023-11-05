import { zodResolver } from "@hookform/resolvers/zod";
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
    .regex(/^sk-[a-zA-Z0-9]+$/, "That doesn't look like a valid OpenAI API key.")
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

  const onSubmit = async ({ apiKey }: FormValues) => {
    setApiKey(apiKey);
  };

  const onRemove = () => {
    setApiKey(null);
    form.reset({ apiKey: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">OpenAI Integration</h3>
        <p className="leading-relaxed opacity-75">
          You can make use of the OpenAI API to help you generate content, or improve your writing
          while composing your resume.
        </p>
      </div>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          You have the option to{" "}
          <a
            href="https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            obtain your own OpenAI API key
          </a>
          . This key empowers you to leverage the API as you see fit. Alternatively, if you wish to
          disable the AI features in Reactive Resume altogether, you can simply remove the key from
          your settings.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="apiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="sk-..." {...field} />
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
              {isEnabled ? "Saved" : "Save Locally"}
            </Button>

            {isEnabled && (
              <Button type="reset" variant="ghost" onClick={onRemove}>
                <TrashSimple className="mr-2" />
                Remove
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          Your API key is securely stored in the browser's local storage and is only utilized when
          making requests to OpenAI via their official SDK. Rest assured that your key is not
          transmitted to any external server except when interacting with OpenAI's services.
        </p>
      </div>

      <Alert variant="warning">
        <div className="prose prose-neutral max-w-full text-xs leading-relaxed text-primary dark:prose-invert">
          <span className="font-medium">Note: </span>
          <span>
            By utilizing the OpenAI API, you acknowledge and accept the{" "}
            <a
              href="https://openai.com/policies/terms-of-use"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              terms of use
            </a>{" "}
            and{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              privacy policy
            </a>{" "}
            outlined by OpenAI. Please note that Reactive Resume bears no responsibility for any
            improper or unauthorized utilization of the service, and any resulting repercussions or
            liabilities solely rest on the user.
          </span>
        </div>
      </Alert>
    </div>
  );
};
