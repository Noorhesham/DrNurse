"use client";

import { motion, AnimatePresence } from "framer-motion";
import JobCard from "@/app/components/JobCard";
import { PaginationDemo } from "@/app/components/Pagination";
import Spinner from "@/app/components/Spinner";
import { useGetEntity } from "@/lib/queries";
import React, { useState } from "react";
import Empty from "@/app/components/Empty";

const page = ({ searchParams }: { searchParams: any }) => {
  const { data, isLoading } = useGetEntity(
    "bookmarks",
    `bookmarks-${searchParams.page}`,
    "",
    {},
    `with=country,city,state,careerType,careerSpecialty,careerLevel,branch&
    page=${searchParams.page || "1"}&itemsCount=${searchParams.itemsCount || "10"}`
  );

  const [bookmarks, setBookmarks] = useState<any[]>([]);

  React.useEffect(() => {
    if (data?.data) setBookmarks(data.data);
  }, [data]);

  if (!data || isLoading) return <Spinner />;
  const totalPages = Math.ceil(data.count / 9);

  return (
    <main className="flex flex-col gap-3 col-span-2 lg:col-span-5">
      <AnimatePresence>
        <div className="flex flex-col gap-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((item: any, i: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1, delay: i * 0.1 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard bookmarked={true} i={i} job={item} />
              </motion.div>
            ))
          ) : (
            <Empty text="No bookmarked jobs found" textLink="Bookmark a Job Now !" link="/person/jobs" />
          )}
        </div>
      </AnimatePresence>
      {totalPages > 1 && <PaginationDemo totalPages={totalPages} />}
    </main>
  );
};

export default page;
