"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/app/context/AuthContext";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";

const SideNav = ({
  icon,
  text,
  link,
  iconsOnly,
  active,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
  iconsOnly?: boolean;
  active?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();
  const lang = cookies.get("NEXT_LOCALE");
  const isActive = pathName.replace(`/${lang}`, "") === `${link}` || (active && pathName.includes(active));
  const { handleLogout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Link
        onClick={async () => {
          if (text !== "LOG-OUT") return;
          const res = await Server({ resourceName: "logout" });
          if (res.status) {
            toast.success(res.message);
            handleLogout();
            router.refresh();
          }
        }}
        href={link}
        className={`flex flex-1  text-base flex-grow w-full lg:py-2 lg:px-4 font-medium duration-150 cursor-pointer md:w-full rounded-lg p-1    items-center gap-2 self-start ${
          isActive && !iconsOnly
            ? " bg-hover  border-l-2 rounded-l-none  border-main2 lg:py-3   text-main2 hover:bg-gray-100 "
            : iconsOnly && isActive
            ? "bg-main2 w-fit  text-gray-50 text-center mx-auto"
            : ""
        }`}
      >
        {iconsOnly ? (
          <TooltipProvider delayDuration={10}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className=" mx-auto">{icon}</span>
              </TooltipTrigger>
              <TooltipContent  side="right ">
                <p className="!uppercase">{text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            {icon}
            <p>{text}</p>
          </>
        )}
      </Link>
    )
  );
};

export default SideNav;
