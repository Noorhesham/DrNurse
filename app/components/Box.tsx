"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Filters {
  [key: string]: string[];
}

const Box = ({ text, options, filter, btn }: { text: string; options?: any[]; filter: string; btn?: boolean }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [defaultAccordionValue, setDefaultAccordionValue] = useState<string | null>("item-1");

  // Parse the existing filters from the URL when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: Filters = {};
    params.forEach((value, key) => {
      newFilters[key] = value.split(",");
    });
    setFilters(newFilters);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Update the params with the current filters state
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(",")); // Set the new values for each filter
      } else {
        params.delete(key); // Remove the filter if no values are selected
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const handleFilter = (filterValue: string, filterName: string) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[filterName] || [];
      const isFilterSelected = currentFilters.includes(filterValue);

      // Toggle the filter on/off
      const updatedFilters = isFilterSelected
        ? currentFilters.filter((item) => item !== filterValue) // Remove the filter
        : [...currentFilters, filterValue]; // Add the filter

      return {
        ...prevFilters,
        [filterName]: updatedFilters,
      };
    });
  };

  const handleReset = (name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: [],
    }));

    const params = new URLSearchParams(window.location.search);
    params.delete(name);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Set default accordion state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDefaultAccordionValue(null); // Closed on mobile
      } else {
        setDefaultAccordionValue("item-1"); // Open on desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex px-3 py-1.5 font-medium text-sm bg-white uppercase flex-col">
      <Accordion defaultValue={defaultAccordionValue||""} type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-sm font-medium text-main2">{text}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pb-3 grid grid-cols-2 gap-2 border-b border-b-gray-400">
              {!btn
                ? options?.map((option, i) => (
                    <li
                      onClick={() => handleFilter(option, filter)}
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={filter}
                        id={option}
                        checked={filters[filter]?.includes(option) || false}
                        onChange={() => handleFilter(option, filter)}
                      />
                      <label className="text-main2 text-xs" htmlFor={option}>
                        {option}
                      </label>
                    </li>
                  ))
                : options?.map((option, i) => (
                    <Button size={'lg'}
                      className={cn(
                        "w-full text-xs bg-gray-100 text-main2 ",
                        filters[filter]?.includes(option) ? "bg-main2 text-gray-50" : ""
                      )}
                      variant={"outline"}
                      key={i}
                      onClick={() => handleFilter(option, filter)}
                    >
                      {option}
                    </Button>
                  ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Box;
