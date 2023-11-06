import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "@phosphor-icons/react";
import { CustomSection, customSectionSchema, defaultCustomSection } from "@reactive-resume/schema";
import {
  Badge,
  BadgeInput,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";
import { DialogName, useDialog } from "@/client/stores/dialog";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = customSectionSchema;

type FormValues = z.infer<typeof formSchema>;

export const CustomSectionDialog = () => {
  const { payload } = useDialog<CustomSection>("custom");

  const form = useForm<FormValues>({
    defaultValues: defaultCustomSection,
    resolver: zodResolver(formSchema),
  });

  if (!payload) return null;

  return (
    <SectionDialog<FormValues>
      form={form}
      id={payload.id as DialogName}
      defaultValues={defaultCustomSection}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <URLInput {...field} />
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

        <FormField
          name="keywords"
          control={form.control}
          render={({ field }) => (
            <div className="col-span-2 space-y-3">
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <BadgeInput {...field} />
                </FormControl>
                <FormDescription>
                  You can add multiple keywords by separating them with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      layout
                      key={item}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(field.value.filter((v) => item !== v));
                        }}
                      >
                        <span className="mr-1">{item}</span>
                        <X size={12} weight="bold" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        />
      </div>
    </SectionDialog>
  );
};
