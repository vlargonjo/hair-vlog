import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-slate-100 text-slate-700",
      outline: "border border-slate-200 text-slate-700",
      brand: "bg-brand/10 text-brand-dark"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

