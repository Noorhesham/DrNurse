"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Box from "./Box";
import ExperienceFilter from "./PriceFilter";
import { useRouter } from "next/navigation";

interface FilterOption {
  id: string | number;
  name?: string;
  label?: string;
  title?: string;
}

interface FiltersType {
  [key: string]: string[];
}

const Filters = ({ colseBtn, filters, from_years }: { colseBtn?: ReactNode; filters: any[]; from_years?: any }) => {
  const router = useRouter();
  const [del, setDelete] = useState(false);
  const [filtersState, setFiltersState] = useState<FiltersType>({});
  const [isFirst, setIsFirst] = useState(true);
  // Initialize filters from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const newFilters: FiltersType = {};
      params.forEach((value, key) => {
        newFilters[key] = value.split(",");
      });
      setFiltersState(newFilters);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsFirst(false);
    }, 1000);
  }, []);
  // Update URL when filters change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      Object.entries(filtersState).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(","));
        }
      });
      !isFirst && params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [filtersState]);

  // Reset all filters when del is true
  useEffect(() => {
    if (del) {
      setFiltersState({});
      setDelete(false); // Reset del to prevent repeated triggers
    }
  }, [del]);

  const renderFilterBoxes = () => {
    return filters?.map((filterObj, index) => {
      const entries: [string, FilterOption[]][] = Object.entries(filterObj);
      const [label, filterOptions]: [string, FilterOption[]] = entries[0];
      const filterKey = filterObj.filter;
      const arr = filterObj.arr || false;

      if (!filterOptions || filterOptions.length === 0) return null;

      return (
        <Box
          setDelete={setDelete}
          btn={!arr}
          key={index}
          filter={filterKey}
          text={label}
          options={filterOptions?.map((filter: any) => ({
            id: filter.id || filter.value,
            name: filter.title || filter.name || filter.label,
          }))}
          filters={filtersState}
          setFilters={setFiltersState}
        />
      );
    });
  };

  return (
    <div className="max-h-screen rounded-2xl border bg-white shadow-sm border-gray-400 overflow-y-auto lg:max-h-full col-span-full">
      <div className="flex flex-col py-4 px-3">
        {colseBtn}
        {renderFilterBoxes()}
        <ExperienceFilter from_years={from_years} />
      </div>
    </div>
  );
};

export default Filters;
