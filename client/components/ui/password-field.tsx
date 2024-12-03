import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

enum InputType {
  PASSWORD = "password",
  TEXT = "text",
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [type, setType] = React.useState(InputType.PASSWORD);

    const Icon = type === InputType.PASSWORD ? EyeOff : Eye;

    const handleShow = () => {
      const nextType =
        type === InputType.PASSWORD ? InputType.TEXT : InputType.PASSWORD;

      setType(nextType);
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <Icon
          className="absolute right-0 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
          onClick={handleShow}
        />
      </div>
    );
  },
);
PasswordField.displayName = "PasswordField";

export { PasswordField };
