import * as React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

