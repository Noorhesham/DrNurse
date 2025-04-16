import { cn } from "@/lib/utils";
import React from "react";

const CardContainer = ({
  className,
  children,
  customPadding,
}: {
  className?: string;
  children: React.ReactNode;
  customPadding?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-white border-2 shadow-sm border-input rounded-xl",
        customPadding ? customPadding : "py-2 px-4", 
        className 
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
