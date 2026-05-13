import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-foreground shadow-inner shadow-black/20 backdrop-blur-xl transition hover:border-primary/50 hover:bg-white/14",
        className,
      )}
      {...props}
    />
  ),
);
Select.displayName = "Select";
