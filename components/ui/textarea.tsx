import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-28 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground shadow-inner shadow-black/10 transition hover:border-primary/50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
