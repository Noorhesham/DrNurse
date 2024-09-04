"use client";
import React from "react";
import ModalCustom from "./defaults/ModalCustom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FunctionalButton = ({
  btnText,
  content,
  icon,
  link,
  onClick,
  size,
  className,
  type,
  variant,
}: {
  btnText: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
  onClick?: () => void;
  size?: "lg" | "icon" | "sm" | "default" | null | undefined;
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
}) => {
  const buttonContent = (
    <>
      {icon ? icon : <PlusCircle />}
      {btnText}
    </>
  );

  if (link) {
    return (
      <Link className={className || ""} href={link} passHref>
        <Button
          variant={variant || "default"}
          size={size || "lg"}
          className={cn("flex  items-center gap-2 bg-main2 text-gray-50 hover:bg-main2/80", className)}
          type={type || "button"}
        >
          {buttonContent}
        </Button>
      </Link>
    );
  }

  return onClick ? (
    <Button
      variant={variant || "default"}
      onClick={onClick}
      type={type || "button"}
      size={size || "lg"}
      className={cn(
        variant !== "destructive" && "flex items-center gap-2 bg-main2 text-gray-50 hover:bg-main2/80",
        className
      )}
    >
      {buttonContent}
    </Button>
  ) : (
    <ModalCustom
      btn={
        <Button size="lg" className=" flex items-cetner gap-2 bg-main2 text-gray-50 hover:bg-main2/80">
          {icon ? icon : <PlusCircle />}
          {btnText}
        </Button>
      }
      content={content}
    />
  );
};

export default FunctionalButton;
