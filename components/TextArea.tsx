import type { ReactNode, TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helperText?: ReactNode;
  minHeightClassName?: string;
};

export default function TextArea({
  id,
  label,
  helperText,
  minHeightClassName = "min-h-[320px]",
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700">
        {label}
      </label>
      <textarea
        id={id}
        className={`mt-4 w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 shadow-inner focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 ${minHeightClassName} ${className}`}
        {...props}
      />
      {helperText ? (
        <p className="mt-3 text-xs text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
}
