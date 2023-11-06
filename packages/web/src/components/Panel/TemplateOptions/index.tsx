import FormRender, { useForm } from "form-render";
import { BaseSchema } from "@shared";
import { useEffect, useMemo } from "react";

export interface TemplateOptionsProps {
  optionsSchema: BaseSchema;
  options?: Record<any, any>;
  onChange?: (value: any) => void;
}

function parseSchema(_schema: Record<any, BaseSchema>) {
  const schema = {
    type: "object",
    column: 1,
    displayType: "column",
    properties: Object.keys(_schema).reduce((acc, key) => {
      const schemaItem = _schema[key];
      acc[key] = {
        title: schemaItem.title || key,
        ...schemaItem,
      };
      return acc;
    }, {} as Record<any, any>),
  };
  return schema;
}

export default function TemplateOptions(props: TemplateOptionsProps) {
  const { optionsSchema, options } = props;

  const form = useForm();
  console.log("render", options);

  useEffect(() => {
    form.setValues(options);
  }, [options, form]);

  const schema = useMemo(() => parseSchema(optionsSchema), [optionsSchema]);

  const watch = {
    "#": (value: any) => {
      props.onChange?.(value);
    },
  };

  if (!optionsSchema) {
    return null;
  }
  return (
    <>
      <FormRender form={form} schema={schema} watch={watch} />
    </>
  );
}
