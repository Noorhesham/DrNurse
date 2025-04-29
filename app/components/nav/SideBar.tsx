"use client";
import React from "react";
import SideNav from "./SideNav";
import {
  BadgeCheck,
  BellIcon,
  BookmarkIcon,
  BriefcaseBusiness,
  CalendarClock,
  HandCoins,
  House,
  LogOutIcon,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import { MdAddCircle, MdNotifications, MdNotificationsNone } from "react-icons/md";
import { useParams } from "next/navigation";
import { TbNotification } from "react-icons/tb";
const iconsStyles = "w-5 h-5";

const SideBar = ({ iconsOnly = false, person }: { iconsOnly?: boolean; person?: boolean }) => {
  const params = useParams();
  const origin = person ? "/person" : `/dashboard`;
  const appendId = (path: string) => (person ? path : `/dashboard/${params.id}${path.replace("/dashboard", "")}`);

  const navItems = [
    { link: person ? "/person" : `/dashboard/${params.id}`, text: "OVERVIEW", icon: <House className={iconsStyles} /> },

    // Conditionally add "Find a Employee" when not a person
    ...(person
      ? []
      : [{ link: appendId(`${origin}/employees`), text: "FIND AN EMPLOYEE", icon: <Users className={iconsStyles} /> }]),

    // Jobs section: Different for person and non-person
    {
      link: appendId(`${origin}/jobs`),
      text: person ? "JOBS" : "MY JOBS",
      icon: <BriefcaseBusiness className={iconsStyles} />,
    },

    ...(person
      ? [{ link: `${origin}/bookmarked-jobs`, text: "BOOKMARKED JOBS", icon: <BookmarkIcon className={iconsStyles} /> }]
      : [{ link: appendId(`${origin}/post-job`), text: "POST A JOB", icon: <MdAddCircle className={iconsStyles} /> }]),

    {
      link: appendId(`${origin}/notifications`),
      text: "NOTIFICATIONS",
      icon: <BellIcon className={iconsStyles} />,
    },

    { link: appendId(`${origin}/meetings`), text: "MEETINGS", icon: <CalendarClock className={iconsStyles} /> },
    { link: appendId(`${origin}/job-offers`), text: "JOB OFFERS", icon: <HandCoins className={iconsStyles} /> },

    ...(person
      ? [
          {
            link: `${origin}/my-profile` || `${origin}/create-profile`,
            text: "MY PROFILE",
            icon: <User className={iconsStyles} />,
            active: "create-profile" || "my-profile",
          },
        ]
      : [
          {
            link: appendId(`${origin}/company-profile`),
            text: "COMPANY PROFILE",
            icon: <Users className={iconsStyles} />,
          },
        ]),

    ...(!person
      ? [
          {
            link: appendId(`${origin}/invoices`),
            text: "Invoices & Subscriptions",
            icon: <BadgeCheck className={iconsStyles} />,
          },
        ]
      : [{ link: `${origin}/points`, text: "Points", icon: <BadgeCheck className={iconsStyles} /> }]),
    // Settings and logout
    { link: appendId(`${origin}/settings`), text: "SETTINGS", icon: <SlidersHorizontal className={iconsStyles} /> },
    { link: "", text: "LOG-OUT", icon: <LogOutIcon className={iconsStyles} /> },
  ];

  return (
    <div
      className={`flex items-center ${
        iconsOnly ? "sticky top-0" : "lg:sticky lg:top-0"
      } lg bg-light  rounded-xl z-50 h-fit pb-5 flex-col   col-span-full lg:col-span-2  w-full gap-3`}
    >
      <p className="lg:px-6  py-3 mt-4 text-main2 font-semibold">
        {!iconsOnly && person
          ? "PERSONAL DASHBOARD"
          : !iconsOnly
          ? "HOSPITAL DASHBOARD"
          : iconsOnly && person
          ? "PDB"
          : "HDB"}
      </p>
      <ul
        style={iconsOnly ? { alignItems: "center", padding: "15px" } : {}}
        className={`text-xs :text-sm items-start ${
          !iconsOnly ? "grid grid-cols-2  w-full  text-base" : "flex flex-col"
        } md:flex md:flex-col flex-nowrap md:flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold`}
      >
        {navItems.map((item, index) => (
          <SideNav
            active={item.active}
            iconsOnly={iconsOnly}
            key={index}
            link={item.link}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
