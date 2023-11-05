import { Placehoders, TemplateComponent } from "..";

export function getDefalutPlacehoders<T extends string[]>(
  Comp: TemplateComponent<T>
): Placehoders<T> {
  const placehoderSchemas = Comp.placehoderSchemas;
  if (!placehoderSchemas) {
    return {} as Placehoders<T>;
  }
  return Object.keys(placehoderSchemas).reduce(
    (acc, key: keyof typeof placehoderSchemas) => {
      acc[key] = placehoderSchemas[key].default;
      return acc;
    },
    {} as Placehoders<T>
  );
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
