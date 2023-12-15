import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import React, { ReactNode } from "react";

interface LabelInputProps {
  label?: String;
  children: ReactNode;
}

const LabelInput: React.FC<LabelInputProps> = (props) => {
  const { label, children } = props;
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-gray-900 dark:text-white">
        {label}
      </label>
      {children}
    </div>
  );
};

export default LabelInput;
