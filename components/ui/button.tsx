import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring sticker-edge inline-flex h-10 items-center justify-center gap-2 border px-4 py-2 text-sm font-black uppercase transition disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground shadow-[0_0_28px_hsl(var(--primary)/0.24)] hover:bg-primary/90",
        secondary: "border-white/20 bg-white/12 text-foreground backdrop-blur-xl hover:border-primary/40 hover:bg-white/18",
        outline: "border-white/25 bg-white/5 backdrop-blur-xl hover:border-primary/50 hover:bg-primary/10",
        ghost: "border-transparent hover:bg-primary/10",
        destructive: "border-destructive bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
