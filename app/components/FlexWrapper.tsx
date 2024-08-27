import { cn } from "@/lib/utils";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const FlexWrapper = ({
  className,
  children,
  max = true,
}: {
  className?: string;
  children: React.ReactNode;
  max?: boolean;
}) => {
  return max ? (
    <MaxWidthWrapper noPadding className={cn("flex gap-5 flex-col lg:flex-row lg:gap-10 ", className)}>
      {children}
    </MaxWidthWrapper>
  ) : (
    <div className={cn("flex gap-5 flex-col lg:flex-row lg:gap-10 ", className)}>{children}</div>
  );
};

export default FlexWrapper;
