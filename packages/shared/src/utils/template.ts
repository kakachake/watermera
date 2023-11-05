import { Placehoders, TemplateComponent } from "..";

export function getDefalutBySchemas<T extends string[]>(
  Comp: TemplateComponent<T>,
  key: "placehoderSchemas" | "optionSchemas"
): Record<string, any> {
  const schemas = Comp[key];
  if (!schemas) {
    return {} as Placehoders<T>;
  }
  return Object.keys(schemas).reduce((acc, key: string) => {
    acc[key] = (schemas as any)[key].default;
    return acc;
  }, {} as Record<string, any>);
}

export function parseOptionsByKeyValue(options: { [key: string]: string }): {
  label: string;
  value: string;
}[] {
  return Object.keys(options).reduce((acc, key) => {
    const value = options[key];
    if (value) {
      acc.push({
        label: value,
        value: key,
      });
    }
    return acc;
  }, [] as { label: string; value: string }[]);
}
