import FormRender, { useForm } from "form-render";
import { PlacehoderSchema, TemplateComponent } from "@shared";

export interface TemplateOptionsProps {
  template: TemplateComponent<any>;
  onChange?: (value: any) => void;
}

function parseSchema(placehoderSchemas: Record<any, PlacehoderSchema>) {
  const schema = {
    type: "object",
    column: 1,
    displayType: "column",
    properties: Object.keys(placehoderSchemas).reduce((acc, key) => {
      const placehoderSchema = placehoderSchemas[key];
      acc[key] = {
        title: placehoderSchema.title || key,
        ...placehoderSchema,
      };
      return acc;
    }, {} as Record<any, any>),
  };
  return schema;
}

export default function TemplateOptions(props: TemplateOptionsProps) {
  const { template } = props;
  const { placehoderSchemas } = template;
  const form = useForm();
  if (!placehoderSchemas) {
    return null;
  }
  const schema = parseSchema(placehoderSchemas);

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
