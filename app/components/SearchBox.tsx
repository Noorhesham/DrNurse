"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useGetEntity } from "@/lib/queries";
import debounce from "lodash.debounce";
import Link from "next/link";
import MotionItem from "./defaults/MotionItem";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SearchBox = ({
  bg,
  icon,
  onSearch,
  active,
  setIsActive,
  nonactive,
  btn = true,
  onClose,
  className,
  defaultQuery,
}: {
  bg?: string;
  icon?: any;
  onSearch?: (value: string) => void;
  active?: boolean;
  setIsActive?: (value: boolean) => void;
  nonactive?: boolean;
  btn?: boolean;
  onClose?: () => void;
  className?: string;
  defaultQuery?: string;
}) => {
  //2 states to handle the debounced search
  const [val, setVal] = useState(defaultQuery || "");
  const [query, setQuery] = useState<string>("");

  //state to track down the activity of the results (if the box is shown or not)
  const [resultActive, setResultActive] = useState(false);
  //the selected result state to adda visual effect when moving with keys
  const [selectedResult, setSelectedResult] = useState(0);

  const locale = useLocale();
  const router = useRouter();
  const searchParams = new URLSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { userSettings, loading } = useAuth();
  useEffect(() => {
    searchParams.set("search", query);
  }, [query]);
  const { data, isLoading } = useGetEntity(
    "getJobs",
    `job_title=${query}`,
    "",
    { enabled: query.length > 3 && active },
    `job_title=${query}&itemsCount=10`
  );

  const search = React.useCallback(
    debounce((newsearch) => {
      setQuery(newsearch);
    }, 500),
    [query]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    if (!nonactive && (event.target.value.includes("%") || event.target.value.length < 3))
      return setResultActive(false);
    setResultActive(true);
    onSearch && onSearch(event.target.value);
    if (!nonactive) search(event.target.value);
  };

  // Handle clicks outside the search box to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setResultActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // When active state changes, focus the input if active
  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  const jobs = data?.data?.jobs;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key, jobs);
    if (jobs?.length < 1 || nonactive) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedResult((prev) => {
        const next = (prev + 1) % jobs.length;
        itemRefs.current[next]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        return next;
      });
    }
    if (event.key === "escape") setResultActive(false);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedResult((prev) => {
        const next = (prev - 1 + jobs.length) % jobs.length;
        itemRefs.current[next]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        return next;
      });
    }

    if (event.key === "Enter" && jobs) {
      if (selectedResult)
        router.push(userSettings ? `/person/job/${jobs[selectedResult].id}` : `/job/${jobs[selectedResult].id}`);
    }
  };
  const href = !userSettings ? "/login" : jobs?.length > 1 ? `/jobs?query=${encodeURIComponent(query)}` : "/jobs";
  return (
    <div ref={containerRef} className={`${className || " md:w-[80%]"} w-full relative flex flex-col gap-4  `}>
      <AnimatePresence>
        {data && resultActive && active && (
          <MotionItem
            nohover
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${
              locale === "ar" ? "right-0" : "left-0"
            } flex w-full  bg-white items-start  xl:w-full  absolute gap-2  top-[104%] py-4 px-8 rounded-md  max-h-[14rem] overflow-y-scroll flex-col `}
          >
            {!userSettings && <p className=" text-red-500">You have to be logged in to enter jobs</p>}
            {(jobs && jobs.length > 0) || query.length > 4 ? (
              jobs?.map((item: any, index: number) =>
                userSettings ? (
                  <Link
                    ref={(el) => (itemRefs.current[index] = el)}
                    key={item.id}
                    href={`/job/${item.id}`}
                    className={`${
                      selectedResult === index ? "bg-gray-100" : ""
                    }  hover:bg-gray-100 rounded-xl py-2 text-base px-4 duration-150 w-full flex items-center gap-2`}
                  >
                    <div className=" flex flex-col">
                      <h2 className=" text-blackline-clamp-1 font-medium rounded-xl">{item.job_title}</h2>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={"/login"}
                    className=" hover:bg-gray-100 rounded-xl py-2 text-base px-4 duration-150 w-full flex items-center gap-2"
                  >
                    <div className=" flex flex-col">
                      <h2 className=" text-blackline-clamp-1 font-medium rounded-xl">{item.job_title}</h2>
                    </div>
                  </Link>
                )
              )
            ) : (
              <p className=" text-main uppercase text-xs">No results Found</p>
            )}
            <Link
              className=" text-main duration-150 hover:underline"
              href={jobs?.length > 1 ? `/jobs?search=${query}` : "/jobs"}
            >
              {`${jobs?.length > 1 ? `Browse All Jobs For ${query}` : "View All JOBS"}`}
            </Link>
          </MotionItem>
        )}
      </AnimatePresence>
      <div className="bg-white gap-4 sm:gap-0 flex-row  py-3 px-6 rounded-xl flex items-center w-full ">
        <div className=" w-full  relative   py-3 flex items-center gap-2 border-b border-input">
          <SearchIcon />
          <input
            onKeyDown={handleKeyDown}
            value={val}
            onChange={handleSearchChange}
            className=" w-full outline-none"
            type="text"
            placeholder="JOB TITLE OR KEYWORD"
          />{" "}
          <XIcon
            onClick={() => {
              onClose && onClose();
              setVal("");
              setResultActive(false);
            }}
            className=" cursor-pointer hover:text-main duration-150 mr-2"
          />
        </div>
        {btn && (
          <Link href={href}>
            <Button className="  text-center m-auto  lg:flex hidden" size={"lg"}>
              SEARCH MY JOB
            </Button>
            <SearchIcon className="  w-10 h-10 p-2 bg-main rounded-full hover:bg-main/70 duration-150 text-white block lg:hidden" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
