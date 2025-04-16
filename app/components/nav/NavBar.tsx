"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import NavLink from "./NavLink";

import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import { JOB_LINKS } from "../../constants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Server } from "../../main/Server";

import { useAuth } from "../../context/AuthContext";

import PhoneNav from "./PhoneNav";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import MotionItem from "../defaults/MotionItem";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ModalCustom from "../defaults/ModalCustom";
import MyHospitals from "../MyHospitals";
import { useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import useCachedQuery from "@/app/hooks/useCachedData";
import cookies from "js-cookie";
const NavBar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const router = useRouter();
  const [isPhone, setIsPhone] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();
  const queryClient = useQueryClient();
  const { loading, data: userSettings, setData } = useCachedQuery("user_settings");

  const { handleLogout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsTopPage(true);
      } else setIsTopPage(false);
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTopPage]);
  useEffect(() => {
    console.log(isPhone);
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isHome = pathName === "/ar" || pathName === "/en" || pathName.includes("/hospital-home");
  const isPerson = pathName.includes("/person");
  const isDashboard = pathName.includes("/dashboard");
  const hospitalHome = pathName.includes("hospital-home");
  const hospitalId = cookies.get("hospitalId");
  let links;

  if (isHome) {
    if (pathName.includes("/hospital-home")) {
      // Links for hospital home
      links = [
        {
          text: "ABOUT US",
          href: "/about-us",
        },
        {
          text: "BLOG",
          href: "/blogs",
        },
        {
          text: "FOR MEDICAL STUFF",
          href: "/",
        },
      ];
    } else {
      links = [
        {
          text: "ABOUT US",
          href: "/about-us",
        },
        {
          text: "BLOG",
          href: "/blogs",
        },
        {
          text: "FOR EMPLOYEES",
          href: "/hospital-home",
        },
      ];
    }
  } else if (isPerson) {
    // Links for a person (profile)
    links = [
      {
        text: "MY PROFILE",
        href: "/person/my-profile",
      },

      {
        text: "BACK TO WEBSITE",
        href: "/",
      },
    ];
  } else if (isDashboard) {
    // Links for dashboard
    links = [
      {
        text: "MY HOSPITAL",
        href: `/dashboard/${hospitalId}/company-profile`,
      },
      {
        text: "BACK TO WEBSITE",
        href: "/",
      },
    ];
  } else {
    // Default or fallback links (for safety)
    links = [
      {
        text: "ABOUT US",
        href: "/about-us",
      },
      {
        text: "BLOG",
        href: "/blogs",
      },
      {
        text: "FOR EMPLOYEES",
        href: "/hospital-home",
      },
    ];
  }
  const locale = useLocale();
  console.log(userSettings);
  return (
    <header className=" w-full">
      <nav
        className={`${
          isHome
            ? "text-white font-semibold placeholder:text-white "
            : `  text-main2 font-semibold placeholder:text-white  ${isScrollingDown && "bg-white/80"}`
        } fixed inset-0  max-h-[5rem] lg:max-h-[7rem]  z-[99]   flex flex-col gap-2  py-4 transition-all duration-300 ${
          isScrollingDown
            ? "translate-y-[-110%]"
            : !isTopPage && !isScrollingDown
            ? `  -translate-y-2 lg:-translate-y-5 ${!isHome && "bg-white/80"}`
            : "translate-y-0"
        }`}
      >
        {" "}
        {isHome && !isTopPage && (
          <div className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
        )}
        <MaxWidthWrapper noPadding>
          <div
            className={cn(
              "flex relative z-20 items-center   ",
              !isTopPage && !isScrollingDown ? "justify-center lg:justify-between" : "justify-between"
            )}
          >
            <div className="flex  items-center  gap-20 ">
              <div className="  md:hidden flex">
                <AnimatePresence>
                  {isTopPage && isPhone && (
                    <MotionItem
                      nohover
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className={` flex duration-150  items-center`}
                    >
                      <Logo isdark={isHome ? false : true} />
                    </MotionItem>
                  )}
                </AnimatePresence>
              </div>

              <div className={`  md:flex hidden duration-150  items-center`}>
                <Logo isdark={isHome ? false : true} />
              </div>

              <ul className=" hidden lg:flex z-30 relative items-center  gap-4 xl:gap-8 ">
                {links.map((link) => (
                  //@ts-ignore
                  <NavLink isHome={isHome} key={link.text} href={link.href} text={link.text} subLinks={link.subLinks} />
                ))}
              </ul>
            </div>
            <div className="  flex items-center gap-2 ">
              {loading ? (
                <div className="flex items-center gap-2">
                  {" "}
                  <Skeleton className=" h-12 rounded-full w-[150px]" />
                  <Skeleton className=" h-12 rounded-full w-[150px]" />
                </div>
              ) : !userSettings ? (
                <>
                  <Link href="/login">
                    <Button
                      className="  px-4 lg:px-8  rounded-t-full rounded-bl-sm rounded-br-sm rounded-l-full rounded-r-full"
                      variant={"ghost"}
                    >
                      LOGIN
                    </Button>
                  </Link>
                  <Link
                    href={
                      pathName.replace(`/${locale}`, "/") === "/"
                        ? "/signup?role=doctor"
                        : !hospitalHome
                        ? "/signup?role=doctor"
                        : "/signup?role=hospital"
                    }
                  >
                    <Button className="  px-4 lg:px-8 rounded-full">GET STARTED</Button>
                  </Link>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={async () => {
                      const res = await Server({ resourceName: "logout" });
                      if (res.status) {
                        toast.success(res.message);
                        handleLogout();
                        router.refresh();
                        setData(null);
                      }
                    }}
                    className={`text-xs  ${
                      isHome ? "border-white  text-white  " : "border-main2 text-main2"
                    }  bg-transparent  border hover:bg-main2
                      hover:text-white font-semibold md:text-sm  px-2 lg:px-8 rounded-full`}
                  >
                    LOG OUT
                  </Button>{" "}
                  {isHome ? (
                    <Link href={userSettings ? "/loader" : "/signup"}>
                      <Button className="  px-2 lg:px-8 rounded-full">GET STARTED</Button>
                    </Link>
                  ) : (
                    !isPerson && (
                      <ModalCustom
                        content={<MyHospitals />}
                        btn={
                          <Button className=" text-xs  md:text-sm px-4 lg:px-8 rounded-full">CHANGE HOSPITAL</Button>
                        }
                      />
                    )
                  )}
                </div>
              )}

              <div className={`z-[999] duration-150 h-full  relative lg:hidden block`}>
                <PhoneNav isHome={isHome} navigation={links} />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
