import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-primary/20 bg-background/82 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-inner shadow-black/20 transition hover:border-primary/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
