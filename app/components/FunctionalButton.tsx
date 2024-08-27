"use client";
import React from "react";
import ModalCustom from "./ModalCustom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  onClick?: any;
  size?: "lg" | "icon" | "sm" | "default" | null | undefined;
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
  variant?: any;
}) => {
  return link || onClick ? (
    <Button
      variant={variant || "default"}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      type={type || "button"}
      size={size || "lg"}
      className={cn(" flex items-cetner gap-2 bg-main2 text-gray-50 hover:bg-main2/80", className)}
    >
      {icon ? icon : <PlusCircle />}
      {link ? <Link href={link}>{btnText}</Link> : btnText}
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
