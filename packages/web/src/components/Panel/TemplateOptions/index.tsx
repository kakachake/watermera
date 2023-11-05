import FormRender, { useForm } from "form-render";
import { BaseSchema } from "@shared";

export interface TemplateOptionsProps {
  optionsSchema: BaseSchema;
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
  const { optionsSchema } = props;

  const form = useForm();
  if (!optionsSchema) {
    return null;
  }
  const schema = parseSchema(optionsSchema);

  const watch = {
    "#": (value: any) => {
      props.onChange?.(value);
    },
  };

  return (
    <>
      <FormRender form={form} schema={schema} watch={watch} />
    </>
  );
}
