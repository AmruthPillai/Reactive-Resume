import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { accomplishmentSchema, defaultAccomplishment } from "@reactive-resume/schema";
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
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";

import { SectionDialog } from "../sections/shared/section-dialog";

const formSchema = accomplishmentSchema;

type FormValues = z.infer<typeof formSchema>;

export const AccomplishmentsDialog = () => {
    const form = useForm<FormValues>({
        defaultValues: defaultAccomplishment,
        resolver: zodResolver(formSchema),
    });

    return (
        <SectionDialog<FormValues> id="accomplishments" form={form} defaultValues={defaultAccomplishment}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                            <FormLabel>{t`Name`}</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
