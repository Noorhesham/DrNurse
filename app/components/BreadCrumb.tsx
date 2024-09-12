"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Head1 from "./Head1";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackButton from "./BackButton";
const BreadCrumb = () => {
  const router = useRouter();
  const pathName = usePathname();
  const links: any = pathName.split("/").filter((link) => !["ar", "en"].includes(link));
  console.log(links);
  const current = links[links.length - 1];
  const dark =
    pathName.includes("doctor") ||
    pathName.includes("company-profile") ||
    pathName.includes("profile-settings") ||
    pathName.includes("my-profile") ||
    pathName.includes("job/") ||pathName.includes("applicant") ||
    pathName.includes("applications");
  return (
    <Breadcrumb className={cn(" py-3 ", dark ? "bg-main2" : " bg-[#F2F5FF]")}>
      <MaxWidthWrapper
        className="flex md:flex-row flex-col gap-2 md:items-center items-start justify-between"
        noPadding
      >
        {dark ? <BackButton /> : <Head1 size="sm" text={current} />}
        <BreadcrumbList className=" ">
          {links.map((link: any, i: number) => {
            const isLast = i === links.length - 1;
            if (isLast && dark) return null;
            return (
              <ol className="flex items-center" key={i}>
                <BreadcrumbItem>
                  {
                    <BreadcrumbLink
                      className={`${
                        global?.window?.location.pathname === `/${link}`
                          ? " text-main  hover:text-blue-400 duration-150"
                          : dark
                          ? "text-gray-50 hover:text-gray-100"
                          : " text-[#191c1f86]"
                      } flex text-xs sm:text-sm uppercase items-center gap-2`}
                      href={`/${link.href || link}`}
                    >
                      {i === 0 && <FaHome />} {link === "" ? "Home" : link.replace("-", " ") || ""}
                    </BreadcrumbLink>
                  }
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </ol>
            );
          })}
        </BreadcrumbList>
      </MaxWidthWrapper>
    </Breadcrumb>
  );
};

export default BreadCrumb;
