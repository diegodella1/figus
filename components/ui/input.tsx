import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground shadow-inner shadow-black/10 transition hover:border-primary/50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
