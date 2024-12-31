"use client";
import React from "react";
import ModalCustom from "./defaults/ModalCustom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Spinner from "./Spinner";

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
  disabled,
  download,
  noclick,
  noicon,
}: {
  btnText: string;
  disabled?: boolean;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
  onClick?: () => void;
  size?: "lg" | "icon" | "sm" | "default" | null | undefined;
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  download?: boolean;
  noclick?: boolean;
  noicon?: boolean;
}) => {
  const buttonContent = (
    <>
      {noicon ? null : icon ? icon : <PlusCircle />}
      {btnText}
    </>
  );

  if (link) {
    return (
      <Link target={download ? "_blank" : "_self"} className={className || ""} href={link}>
        <Button
          variant={variant || "default"}
          size={size || "lg"}
          className={cn("flex  relative items-center gap-2 bg-main2 text-gray-50 hover:bg-main2/80", className)}
          type={type || "button"}
        >
          {buttonContent}
        </Button>
      </Link>
    );
  }

  return onClick ? (
    <Button
      disabled={disabled || noclick}
      variant={variant || "default"}
      onClick={onClick}
      type={type || "button"}
      size={size || "lg"}
      className={cn(
        variant !== "destructive" &&
          "flex relative items-center gap-2 min-w-[150px] bg-main2 text-gray-50 hover:bg-main2/80",
        className
      )}
    >
      {disabled ? <Spinner className=" border-white border-[5px] text-center m-auto" /> : buttonContent}
    </Button>
  ) : (
    <ModalCustom
      btn={
        <Button
          size="lg"
          className={` ${className} relative flex items-center gap-2 bg-main2 text-gray-50 hover:bg-main2/80`}
        >
          {icon ? icon : <PlusCircle className=" w-5 h-5" />}
          {btnText}
        </Button>
      }
      content={content}
    />
  );
};

export default FunctionalButton;
