import { toCamelCase, toKebabCase, toSnakeCase } from "./case-converter";

export type CaseStyle = "camel" | "snake" | "kebab";

export const CASE_STYLE_LABEL: Record<CaseStyle, string> = {
  camel: "camelCase",
  snake: "snake_case",
  kebab: "kebab-case",
};

export function convertCaseStyle(value: string, style: CaseStyle) {
  switch (style) {
    case "camel":
      return toCamelCase(value);
    case "snake":
      return toSnakeCase(value);
    case "kebab":
      return toKebabCase(value);
    default:
      return value;
  }
}
