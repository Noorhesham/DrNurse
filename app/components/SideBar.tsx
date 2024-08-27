import React from "react";
import SideNav from "./SideNav";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  HandCoins,
  House,
  LogOutIcon,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { MdAddCircle, MdNotifications } from "react-icons/md";
const iconsStyles = "w-5 h-5";
const navItems = [
  { link: "/dashboard", text: "OVERVIEW", icon: <House className={iconsStyles} /> },
  { link: "/dashboard/employees", text: "Find a Employee", icon: <Users className={iconsStyles} /> },
  { link: "/dashboard/jobs", text: "MY JOBS", icon: <BriefcaseBusiness className={iconsStyles} /> },
  { link: "/dashboard/post-job", text: "POST A JOB", icon: <MdAddCircle className={iconsStyles} /> },
  { link: "/dashboard/notifications", text: "NOTIFICATIONS", icon: <MdNotifications className={iconsStyles} /> },
  { link: "/dashboard/meetings", text: "METTINGS", icon: <CalendarClock className={iconsStyles} /> },
  { link: "/dashboard/add-job-offer", text: "JOB OFFER", icon: <HandCoins className={iconsStyles} /> },
  { link: "/dashboard/company-profile/1", text: "COMPANY PROFILE", icon: <Users className={iconsStyles} /> },
  { link: "/dashboard/invoices", text: "Invoices & Subscriptions", icon: <BadgeCheck className={iconsStyles} /> },
  { link: "/dashboard/settings", text: "SETTINGS", icon: <SlidersHorizontal className={iconsStyles} /> },
  { link: "", text: "LOG-OUT", icon: <LogOutIcon className={iconsStyles} /> },
];

const SideBar = ({ iconsOnly = false }: { iconsOnly?: boolean }) => {
  return (
    <div className="flex items-center sticky top-0 lg bg-light rounded-xl h-fit pb-5 flex-col  col-span-full lg:col-span-2 gap-3">
      <h1 className="lg:px-6 py-3 mt-4 text-main2 font-semibold">{!iconsOnly ? "HOSPITAL DASHBOARD" : "HDB"}</h1>
      <ul
        style={iconsOnly ? { alignItems: "center", padding: "15px" } : {}}
        className={`text-xs :text-sm items-start ${
          !iconsOnly ? "grid grid-cols-2  w-full  text-base" : "flex flex-col"
        } md:flex md:flex-col flex-nowrap md:flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold`}
      >
        {navItems.map((item, index) => (
          <SideNav iconsOnly={iconsOnly} key={index} link={item.link} text={item.text} icon={item.icon} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
