"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useGetEntity } from "@/lib/queries";
import debounce from "lodash.debounce";
import Link from "next/link";
import MotionItem from "./defaults/MotionItem";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";

const SearchBox = ({
  bg,
  icon,
  onSearch,
  active,
  setIsActive,
  nonactive,
}: {
  bg?: string;
  icon?: any;
  onSearch?: (value: string) => void;
  active: boolean;
  setIsActive?: (value: boolean) => void;
  nonactive?: boolean;
}) => {
  const [val, setVal] = useState("");
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    searchParams.set("search", query);
  }, [query]);
  const searchParams = new URLSearchParams();
  const { data, isLoading } = useGetEntity(
    "getJobs",
    `job_title=${query}`,
    "",
    { enabled: query.length > 3 },
    `job_title=${query}&itemsCount=10`
  );
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLg, setIsLg] = useState(false);
  const t = useTranslations();
  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
  const locale = useLocale();
  const router = useRouter();
  const [resultActive, setResultActive] = useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && data) {
      data.products.length > 0 ? router.push(`/shop?search=${query}`) : router.push(`/shop`);
    }
  };

  return (
    <div ref={containerRef} className=" w-full relative md:w-[80%] flex flex-col gap-4  ">
      {" "}
      <AnimatePresence>
        {data && resultActive && (
          <MotionItem
            nohover
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${
              locale === "ar" ? "right-0" : "left-0"
            } flex w-full items-start  xl:w-full bg-white absolute gap-2  top-[104%] py-4 px-8 rounded-md  max-h-[14rem] overflow-y-scroll flex-col `}
          >
            {(data && data.data?.length > 0) || query.length > 4 ? (
              data?.data?.jobs.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/person/job/${item.id}`}
                  className=" hover:bg-gray-100 rounded-xl py-2 text-base px-4 duration-150 w-full flex items-center gap-2"
                >
                  <div className=" flex flex-col">
                    <h2 className=" text-blackline-clamp-1 font-medium rounded-xl">{item.job_title}</h2>
                  </div>
                </Link>
              ))
            ) : (
              <p className=" text-main uppercase text-xs">No results Found</p>
            )}
            <Link
              className=" text-main duration-150 hover:underline"
              href={data.products?.length > 1 ? `/jobs?search=${query}` : "/jobs"}
            >
              {`${data.products?.length > 1 ? `Browse All Products For ${query}` : "View All JOBS"}`}
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
              setVal("");
              setResultActive(false);
            }}
            className=" cursor-pointer hover:text-main duration-150 mr-2"
          />
        </div>
        <Link href={data?.products?.length > 1 ? `/jobs?search=${query}` : "/jobs"}>
          <Button className="  text-center m-auto  lg:flex hidden" size={"lg"}>
            SEARCH MY JOB
          </Button>
          <SearchIcon className="  w-10 h-10 p-2 bg-main rounded-full hover:bg-main/70 duration-150 text-white block lg:hidden" />
        </Link>
      </div>
    </div>
  );
};

export default SearchBox;
