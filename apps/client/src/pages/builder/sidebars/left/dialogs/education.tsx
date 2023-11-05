import { zodResolver } from "@hookform/resolvers/zod";
import { defaultEducation, educationSchema } from "@reactive-resume/schema";
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

const formSchema = educationSchema;

type FormValues = z.infer<typeof formSchema>;

export const EducationDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultEducation,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="education" form={form} defaultValues={defaultEducation}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="institution"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Carnegie Mellon University" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="studyType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Type of Study</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Bachelor's Degree" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="area"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Area of Study</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Computer Science" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="score"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Score</FormLabel>
              <FormControl>
                <Input {...field} placeholder="9.2 GPA" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Aug 2006 - Oct 2012" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <URLInput {...field} placeholder="https://www.cmu.edu/" />
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
