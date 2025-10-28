/* eslint-disable lingui/no-single-variables-to-translate */
import { zodResolver } from "@hookform/resolvers/zod";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import {
  defaultExperience,
  employmentTypeEnum,
  experienceSchema,
  workTypeEnum,
} from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";
import { getEmploymentTypeLabels, getWorkTypeLabels } from "@/client/locales/enums";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = experienceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ExperienceDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="experience" form={form} defaultValues={defaultExperience}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Company`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Position",
                  context: "Position held at a company, for example, Software Engineer",
                })}
              </FormLabel>
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
            <FormItem>
              <FormLabel>{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`March 2023 - Present`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Location`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="employmentType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>{t`Employment Type`}</FormLabel>
              <FormControl>
                <Select {...field} value={field.value ?? "none"} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t`Select Employment Type`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {employmentTypeEnum.options.map((type) => (
                        // eslint-disable-next-line react/jsx-no-comment-textnodes
                        <SelectItem key={type} value={type}>
                          {i18n._(getEmploymentTypeLabels()[type])}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="workType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>{t`Work Type`}</FormLabel>
              <FormControl>
                <Select {...field} value={field.value ?? "On-Site"} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t`Select Work Type`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {workTypeEnum.options.map((type) => (
                        // eslint-disable-next-line react/jsx-no-comment-textnodes
                        <SelectItem key={type} value={type}>
                          {i18n._(getWorkTypeLabels()[type])}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
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
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  footer={(editor) => (
                    <AiActions
                      value={editor.getText()}
                      onChange={(value) => {
                        editor.commands.setContent(value, true);
                        field.onChange(value);
                      }}
                    />
                  )}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
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
