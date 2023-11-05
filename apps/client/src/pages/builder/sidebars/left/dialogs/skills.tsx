import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "@phosphor-icons/react";
import { defaultSkill, skillSchema } from "@reactive-resume/schema";
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
  Slider,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionDialog } from "../sections/shared/section-dialog";

const formSchema = skillSchema;

type FormValues = z.infer<typeof formSchema>;

export const SkillsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultSkill,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="skills" form={form} defaultValues={defaultSkill}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Content Management" />
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
                <Input {...field} placeholder="Advanced" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="level"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Level</FormLabel>
              <FormControl className="py-2">
                <div className="flex items-center gap-x-4">
                  <Slider
                    {...field}
                    min={1}
                    max={5}
                    value={[field.value]}
                    orientation="horizontal"
                    onValueChange={(value) => field.onChange(value[0])}
                  />

                  <span className="text-base font-bold">{field.value}</span>
                </div>
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
                  <BadgeInput {...field} placeholder="WordPress, Joomla, Webflow etc." />
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
