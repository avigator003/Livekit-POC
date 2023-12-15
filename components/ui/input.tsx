import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { icon?: LucideIcon } & { label?: string }
>(({ className, type, icon: Icon, label, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      <div className="relative mt-1">
        {Icon && <Icon className="absolute left-3 top-3 text-textGrey" />}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "pl-12",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
