import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "border-zinc-900 bg-zinc-900 text-white hover:border-zinc-800 hover:bg-zinc-800",
  secondary:
    "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-100",
  ghost: "border-transparent bg-transparent text-zinc-900 hover:bg-zinc-100",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2 text-sm",
};

export default function Button({
  variant = "secondary",
  size = "sm",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full border font-semibold transition disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-200 disabled:text-zinc-500 ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    />
  );
}
