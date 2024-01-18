import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import { DotsSixVertical, Plus, X } from "@phosphor-icons/react";
import { CustomField as ICustomField } from "@reactive-resume/schema";
import { Button, Input } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";

import { useResumeStore } from "@/client/stores/resume";

type CustomFieldProps = {
  field: ICustomField;
  onChange: (field: ICustomField) => void;
  onRemove: (id: string) => void;
};

export const CustomField = ({ field, onChange, onRemove }: CustomFieldProps) => {
  const controls = useDragControls();

  const handleChange = (key: "icon" | "name" | "value", value: string) =>
    onChange({ ...field, [key]: value });

  return (
    <Reorder.Item
      value={field}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="flex items-end justify-between space-x-2">
        <Button
          size="icon"
          variant="link"
          className="shrink-0"
          onPointerDown={(event) => controls.start(event)}
        >
          <DotsSixVertical />
        </Button>

        <Input
          placeholder={t`Name`}
          value={field.name}
          className="!ml-0"
          onChange={(event) => handleChange("name", event.target.value)}
        />

        <Input
          placeholder={t`Value`}
          value={field.value}
          onChange={(event) => handleChange("value", event.target.value)}
        />

        <Button
          size="icon"
          variant="link"
          className="!ml-0 shrink-0"
          onClick={() => onRemove(field.id)}
        >
          <X />
        </Button>
      </div>
    </Reorder.Item>
  );
};

type Props = {
  className?: string;
};

export const CustomFieldsSection = ({ className }: Props) => {
  const setValue = useResumeStore((state) => state.setValue);
  const customFields = useResumeStore((state) => state.resume.data.basics.customFields);

  const onAddCustomField = () => {
    setValue("basics.customFields", [
      ...customFields,
      { id: createId(), icon: "", name: "", value: "" },
    ]);
  };

  const onChangeCustomField = (field: ICustomField) => {
    const index = customFields.findIndex((item) => item.id === field.id);
    const newCustomFields = JSON.parse(JSON.stringify(customFields)) as ICustomField[];
    newCustomFields[index] = field;

    setValue("basics.customFields", newCustomFields);
  };

  const onReorderCustomFields = (values: ICustomField[]) => {
    setValue("basics.customFields", values);
  };

  const onRemoveCustomField = (id: string) => {
    setValue(
      "basics.customFields",
      customFields.filter((field) => field.id !== id),
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence>
        <Reorder.Group
          axis="y"
          className="space-y-4"
          values={customFields}
          onReorder={onReorderCustomFields}
        >
          {customFields.map((field) => (
            <CustomField
              field={field}
              key={field.id}
              onChange={onChangeCustomField}
              onRemove={onRemoveCustomField}
            />
          ))}
        </Reorder.Group>
      </AnimatePresence>

      <Button variant="link" onClick={onAddCustomField}>
        <Plus className="mr-2" />
        <span>{t`Add a custom field`}</span>
      </Button>
    </div>
  );
};
