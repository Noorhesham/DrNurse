"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useLoading } from "../context/LoadingContext";

interface FiltersType {
  [key: string]: string[];
}

const Box = ({
  text,
  options,
  filter,
  btn,
  setDelete,
  filters,
  setFilters,
}: {
  text: string;
  options?: any[];
  filter: string;
  btn?: boolean;
  setDelete: (value: boolean) => void;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) => {
  const [isPending, startTransition] = React.useTransition();
  const { setIsLoading } = useLoading();
  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);
  const WrapperFn = (fn: any) => {
    startTransition(() => {
      fn();
    });
  };
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [accordionValue, setAccordionValue] = useState<string | undefined>("");
  const [localFilters, setLocalFilters] = useState<string[]>(filters[filter] || []);

  // Sync localFilters with filters[filter] when it changes (e.g., due to reset or external updates)
  useEffect(() => {
    setLocalFilters(filters[filter] || []);
  }, [filters[filter]]);

  // Handle mobile accordion behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setAccordionValue(mobile ? undefined : "item-1");
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleFilter = (filterValue: string) => {
    if (btn) {
      // For button filters like career_type_id (single-select, immediate update)
      const currentValue = filters[filter]?.[0];
      if (currentValue === filterValue) {
        // Deselect
        setFilters((prev) => ({ ...prev, [filter]: [] }));
        if (filter === "career_type_id") {
          setDelete(true); // Trigger global reset
        }
      } else {
        // Select new value
        setFilters((prev) => ({ ...prev, [filter]: [filterValue] }));
      }
    } else {
      // For checkbox filters, update local state only
      setLocalFilters((prev) =>
        prev.includes(filterValue) ? prev.filter((id) => id !== filterValue) : [...prev, filterValue]
      );
    }
  };

  const applyFilters = () => {
    if (!btn) {
      // Apply localFilters to global filtersState when Filter button is clicked
      setFilters((prev) => ({ ...prev, [filter]: localFilters }));
    }
  };

  const resetFilter = () => {
    if (btn) {
      setFilters((prev) => ({ ...prev, [filter]: [] }));
      if (filter === "career_type_id") {
        setDelete(true);
      }
    } else {
      setLocalFilters([]);
      setFilters((prev) => ({ ...prev, [filter]: [] }));
    }
  };

  return (
    <div className="flex px-3 py-1.5 font-medium text-sm bg-white capitalize flex-col">
      <Accordion type="single" value={accordionValue} onValueChange={setAccordionValue} collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-base font-semibold text-main2">{text}</h2>
          </AccordionTrigger>
          <AccordionContent className="max-h-[10rem] overflow-auto flex flex-col gap-2">
            <ul className="pb-3 grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-b-gray-400">
              {btn
                ? options?.map((option, i) => (
                    <Button
                      size="lg"
                      className={cn(
                        "w-full lg:text-xs col-span-2 xl:col-span-1 bg-gray-100 text-main2",
                        filters[filter]?.includes(option.id.toString())
                          ? "bg-main2 hover:bg-main2 hover:text-white text-gray-50"
                          : ""
                      )}
                      variant="outline"
                      key={i}
                      onClick={() => WrapperFn(() => handleFilter(option.id.toString()))}
                    >
                      {option.name}
                    </Button>
                  ))
                : options?.map((option, i) => (
                    <li
                      onClick={() => handleFilter(option.id.toString())}
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input type="checkbox" checked={localFilters.includes(option.id.toString())} />
                      <label className="text-main2 text-xs">{option.name}</label>
                    </li>
                  ))}
            </ul>
          </AccordionContent>
          <div className="flex gap-2 items-center mb-2 mt-5 ml-auto">
            {!btn && (
              <button
                className="py-1 text-white px-4 bg-main rounded-full"
                onClick={() => WrapperFn(() => applyFilters())}
              >
                Filter
              </button>
            )}
            {(btn ? filters[filter]?.length > 0 : localFilters.length > 0) && (
              <button className="py-1 text-white px-4 bg-gray-300 rounded-full" onClick={resetFilter}>
                Reset
              </button>
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Box;
