const NULL_BYTE_REGEX = /\u0000/g;

export function sanitizeText(value: string, maxLength: number) {
  const withoutNulls = value.replace(NULL_BYTE_REGEX, "");
  if (withoutNulls.length <= maxLength) {
    return withoutNulls;
  }
  return withoutNulls.slice(0, maxLength);
}
