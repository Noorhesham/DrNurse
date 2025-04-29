"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Ensure ShadCN Tooltip components are set up
import Image from "next/image";

interface TooltipButtonProps {
  tooltipText: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  iconSrc: string;
  altText: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  tooltipText,
  onClick,
  disabled = false,
  className = "",
  iconSrc,
  altText,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            disabled={disabled}
            className={`p-3 rounded-xl ${className} uppercase ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="w-6 h-6 relative">
              <Image alt={altText} fill className="object-contain" src={iconSrc} />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p className=" !uppercase">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
