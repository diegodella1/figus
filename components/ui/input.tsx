import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-foreground placeholder:text-white/45 shadow-inner shadow-black/20 backdrop-blur-xl transition hover:border-primary/50 hover:bg-white/14",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
