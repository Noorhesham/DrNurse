"use client";

import { useRouter } from "next/navigation";
import JobCard from "@/app/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import Empty from "@/app/components/Empty";
import { PaginationDemo } from "@/app/components/Pagination";
import { Job } from "@/app/types";
import GridContainer from "./defaults/GridContainer";
import Filters from "./Filters";
import FilterMobile from "./FilterPhone";
import { useLoading } from "../context/LoadingContext";
import Paragraph from "./defaults/Paragraph";

import SearchBox from "./SearchBox";
import { useSetLoading } from "../hooks/useSetLoadingt";
import debounce from "lodash.debounce";
import MiniTitle from "./defaults/MiniTitle";
import Sort from "./Sort";

interface JobsListProps {
  jobs: Job[];
  totalPages: number;
  filters?: any;
  query?: string;
  disabled?: boolean;
}

const JobsList = ({ jobs, totalPages, filters, query, disabled = false }: JobsListProps) => {
  const { isLoading } = useLoading();
  const { WrapperFn } = useSetLoading();
  const router = useRouter();
  const currentUrl = new URL(window.location.href);
  const handleChangeQuery = (value: string) => {
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    params.set("query", value);
    router.push(`${currentUrl.pathname}?${params.toString()}`);
  };
  const debouncedOnSearch = debounce((value: string) => {
    if (!value) return;
    WrapperFn(() => handleChangeQuery(value));
  }, 500);
  return (
    <GridContainer className=" mt-5 gap-4" cols={9}>
      <div className="flex order-1 lg:order-0 flex-col gap-3 col-span-2 lg:col-span-6">
        <div className="flex items-start lg:flex-row flex-col justify-between">
          <div className=" ml-auto mt-3">
            <Sort
              options={[
                { label: "Latest", value: "desc" },
                { label: "Earliest", value: "asc" },
              ]}
            />
          </div>
        </div>
        {query && (
          <div className="flex items-center justify-between">
            <Paragraph size="lg" description={`Search Results For ${query} is ${jobs.length}`} />{" "}
          </div>
        )}
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div className="flex flex-col space-y-3">
              <Skeleton className={`w-full h-[125px]  rounded-xl`} />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job: Job, i: number) => <JobCard disabled={disabled} i={i} key={job.id} job={job} />)
        ) : (
          <Empty text="No Jobs Found !" textLink="Reset Filters !" link={currentUrl.pathname} />
        )}

        <PaginationDemo totalPages={totalPages} />
      </div>{" "}
      <div className=" col-span-2 lg:col-span-3">
        <div className=" lg:block hidden ">
          <SearchBox
            defaultQuery={query}
            className="md:w-full"
            onClose={() => handleChangeQuery("")}
            onSearch={debouncedOnSearch}
            nonactive
            active={false}
            btn={false}
          />
          <Filters from_years={false} filters={filters} />
        </div>
        <div className=" lg:hidden flex flex-col gap-2">
          <SearchBox
            active={false}
            defaultQuery={query}
            onClose={() => handleChangeQuery("")}
            onSearch={debouncedOnSearch}
            nonactive
            btn={false}
          />
          <FilterMobile from_years={false} filters={filters} />
        </div>
      </div>
    </GridContainer>
  );
};

export default JobsList;
