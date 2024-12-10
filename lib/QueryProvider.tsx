"use client";
import { ReactNode, useState, useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider, persistQueryClient } from "@tanstack/react-query-persist-client";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [persister, setPersister] = useState(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            gcTime: 300000, // 5 minutes
            staleTime: 60000, // 1 minute
          },
        },
      })
  );

  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });
    setPersister(localStoragePersister);

    // Optional: Clear cache on version mismatch
    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
      buster: "v2", // Update this version if the schema changes
    });
  }, [queryClient]);

  if (!persister) return null; // Prevent rendering until persister is ready

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryProvider;
