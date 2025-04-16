"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
const Sort = ({ options }: { options: any[] }) => {
  const [selected, setSelected] = useState();
  const router = useRouter();
  const t = useTranslations();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const sort = params.get("sort");
    if (sort) {
      // @ts-ignore
      setSelected((s) =>s);
    }
  }, [searchParams]);
  return (
    <div className="    flex items-center justify-between gap-4">
      <h2 className=" text-gray-500 text-sm">{t("Sort")}</h2>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className=" uppercase  bg-white border-input min-w-[150px] py-1.5 px-3 rounded-xl text-sm  flex items-center gap-1">
          {selected || t("latest")}
          <ChevronDown className=" ml-auto text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-full rounded-sm">
          {options.map((option, i) => (
            <DropdownMenuItem
              onClick={() => {
                setSelected(option.label);
                const params = new URLSearchParams(searchParams);
                params.set("sort", option.value);
                router.push(`?${params.toString()}`, { scroll: false });
              }}
              className=" uppercase  rounded-sm"
              key={i}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
