import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-card-foreground shadow-inner shadow-black/10 transition hover:border-primary/50",
        className,
      )}
      {...props}
    />
  ),
);
Select.displayName = "Select";
