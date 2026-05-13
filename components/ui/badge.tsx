import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "sticker-edge inline-flex items-center border border-primary/30 bg-primary/12 px-2.5 py-1 text-xs font-black uppercase text-primary backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
