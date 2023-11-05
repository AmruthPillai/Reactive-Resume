import { zodResolver } from "@hookform/resolvers/zod";
import { certificationSchema, defaultCertification } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = certificationSchema;

type FormValues = z.infer<typeof formSchema>;

export const CertificationsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultCertification,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="certifications" form={form} defaultValues={defaultCertification}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Web Developer Bootcamp" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="issuer"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Udemy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Aug 2019" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <URLInput {...field} placeholder="https://udemy.com/certificate/UC-..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  onChange={(value) => field.onChange(value)}
                  footer={(editor) => (
                    <AiActions value={editor.getText()} onChange={editor.commands.setContent} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
