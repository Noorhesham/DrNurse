"use client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const useCachedQuery = (key: string | string[]) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = queryClient.getQueryData([key]);

      if (cachedData) {
        setData(cachedData);
        setLoading(false);
      } else {
        setLoading(true);

        const interval = setInterval(() => {
          const cachedData = queryClient.getQueryData([key]);
          if (cachedData) {
            setData(cachedData);
            setLoading(false);
            clearInterval(interval);
          } else {
            setData(null);
            setLoading(false);
          }
        }, 100);
      }
    };

    fetchData();
  }, [key, queryClient]);

  return { data, loading, setData };
};

export default useCachedQuery;
