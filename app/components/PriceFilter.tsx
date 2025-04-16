"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useLoading } from "../context/LoadingContext";
import { useSetLoading } from "../hooks/useSetLoadingt";
import { Button } from "@/components/ui/button";

const PriceFilter = ({ from_years }: { from_years?: any }) => {
  const fromName = from_years ? "from_years" : "experience_from";
  const toName = from_years ? "to_years" : "experience_to";

  const t = useTranslations("filters");
  const { WrapperFn } = useSetLoading();

  const PRICE_FILTERS = [
    { value: [0, 5], label: "0 - 5 years" },
    { value: [5, 10], label: "5 - 10 years" },
    { value: [10, 15], label: "10 - 15 years" },
    { value: [15, 300], label: "MORE THAN 15 years" },
  ];
  const DEFAULT_RANGE = [0, 5];
  const [priceFilter, setPriceFilter] = useState({
    range: DEFAULT_RANGE,
    isCustom: false,
  });
  const searchParams = useSearchParams();
  const experience_from = Number(searchParams.get(fromName));
  const experience_to = Number(searchParams.get(toName));
  useEffect(() => {
    if (experience_from && experience_to) {
      setPriceFilter({
        range: [Number(experience_from), Number(experience_to)],
        isCustom: false,
      });
    }
  }, [experience_from, experience_to]);
  const { replace } = useRouter();

  useEffect(() => {
    const update = () => {
      const url = new URL(window.location.href);
      [fromName, toName].forEach((key) => url.searchParams.delete(key));
      url.searchParams.append(fromName, priceFilter.range[0].toString());
      url.searchParams.append(toName, priceFilter.range[1].toString());

      replace(url.toString(), { scroll: false });
    };
    WrapperFn(update);
  }, [priceFilter, replace]);
  const handlePriceChange = ({ range, isCustom }: any) => setPriceFilter({ range, isCustom });
  const reset = () => {
    const url = new URL(window.location.href);
  
    // Clear all search parameters
    url.search = "";
  
    replace(url.toString(), { scroll: false });
  };
  
  return (
    <div className="flex flex-col items-end">
      <ul className="space-y-1 w-full filter border-b px-5 border-gray-200 pb-6 text-sm font-medium text-gray-900">
        <li className="flex items-center  flex-row flex-wrap  lg:flex-col gap-4">
          <div className="self-start flex items-center gap-2 ">
            <label htmlFor={"price-custom"} className="text-base font-semibold text-main2">
              EXPERIENCE
            </label>
          </div>
        </li>
        <div className="flex mt-2  flex-row flex-wrap gap-3   text-sm font-medium lg:flex-col">
          {PRICE_FILTERS.map((filter: any, i: number) => (
            <li key={i} className={` flex items-center gap-2`}>
              <input
                type="radio"
                id={filter.value}
                checked={
                  experience_to &&
                  priceFilter?.range?.[0] === filter.value?.[0] &&
                  priceFilter?.range?.[1] === filter.value?.[1]
                }
                onChange={() => {
                  handlePriceChange({
                    range: filter.value,
                    isCustom: filter.isCustom,
                    debounce: false,
                  });
                }}
              />
              <label
                htmlFor={filter.value}
                className="leading-none text-xs text-main2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {filter.label}
              </label>
            </li>
          ))}
        </div>
      </ul>
      <button className=" py-1 text-white ml-auto self-end mt-2  px-4 bg-main  rounded-full" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default PriceFilter;
