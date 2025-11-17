import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-dark",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
        subtle: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700",
        link: "underline-offset-4 hover:underline text-brand-dark"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
        pill: "h-9 px-6 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

