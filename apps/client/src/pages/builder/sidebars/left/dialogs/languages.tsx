import { zodResolver } from "@hookform/resolvers/zod";
import { defaultLanguage, languageSchema } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Slider,
} from "@reactive-resume/ui";
import { getCEFRLevel } from "@reactive-resume/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionDialog } from "../sections/shared/section-dialog";

const formSchema = languageSchema;

type FormValues = z.infer<typeof formSchema>;

export const LanguagesDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultLanguage,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="languages" form={form} defaultValues={defaultLanguage}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="German" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fluency"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Fluency</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Native Speaker" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fluencyLevel"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Fluency (CEFR)</FormLabel>
              <FormControl className="py-2">
                <div className="flex items-center gap-x-4">
                  <Slider
                    {...field}
                    min={1}
                    max={6}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />

                  <span className="text-base font-bold">{getCEFRLevel(field.value)}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
