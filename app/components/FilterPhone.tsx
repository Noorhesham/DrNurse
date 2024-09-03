"use client";
import React, { useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import Sort from "./Sort";
import Filters from "./Filters";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
const FilterMobile = () => {
  const [filterMobile, setFilterMobile] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOuttside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef?.current?.contains(e.target as Node)) {
      setFilterMobile(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOuttside);
    return () => {
      document.removeEventListener("click", handleClickOuttside);
    };
  });
  return (
    <div className=" lg:hidden z-50 relative block">
      <div className="flex items-center gap-2  self-end  justify-end ml-auto">
        {" "}
        <button
          onClick={() => setFilterMobile(!filterMobile)}
          className=" lg:hidden z-50 relative block text-gray-400 text-xl hover:text-orange-400 duration-150 "
        >
          <FaFilter />
        </button>
        {/* <Sort options={["Price: Low to High", "Price: High to Low"]} /> */}
      </div>

      <AnimatePresence>
        {filterMobile && (
          <motion.div
            ref={containerRef}
            className="fixed z-[11111199]  top-0 -left-10  w-[300px]  lg:hidden h-full"
            initial={{ x: "-140%" }}
            exit={{ x: "-140%" }}
            animate={{ x: filterMobile ? "0%" : "-100%" }}
          >
            <Filters
              colseBtn={
                <button
                  onClick={() => setFilterMobile(false)}
                  className="rounded-xl self-center border-2 border-gray-600 p-1 my-auto"
                >
                  <XIcon className="w-4 h-4 " />
                </button>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterMobile;
