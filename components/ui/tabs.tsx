"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/cn";

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List className={cn("inline-flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800", className)} {...props} />
);

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-white",
      className
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={cn("mt-4 rounded-3xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", className)} {...props} />
);

