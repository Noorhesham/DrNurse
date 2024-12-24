"use client";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient, setQuery] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Does not refetch on window focus
            refetchOnReconnect: false,
            gcTime: Infinity,
          },
        },
      })
  );
  const [persister, setPersister] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
        serialize: JSON.stringify,
        deserialize: (data) => {
          try {
            return JSON.parse(data);
          } catch (error) {
            console.error("Failed to deserialize persisted data:", error);
            return {};
          }
        },
      });
      setPersister(localStoragePersister);
    }
  }, []);
  if (!persister || !queryClient) return null; // Ensure both are ready

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        console.log("Cache successfully restored!");
        const keyWords = ["last_update_date_general", "last_update_date_user", "last_update_date_user2"];
        const queryData = ["general_settings", "user_settings", "user2_settings"];
        if (!queryClient) return;
        keyWords.forEach((key, index) => {
          console.log(key, queryClient.getQueryData([queryData[index]]));
          if (!queryClient.getQueryData([queryData[index]])) {
            const dates = JSON.parse(localStorage.getItem("dates") || "{}");
            dates[key] = "";
            localStorage.setItem("dates", JSON.stringify(dates));
          }
        });
        console.log("Initial query data for general_settings:", queryClient.getQueryData(["general_settings"]));
      }}
      onError={(error) => {
        console.error("Cache restore failed:", error);
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryProvider;

// "use client";
// import { ReactNode, useState } from "react";
// import { QueryClient } from "@tanstack/react-query";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

// const QueryProvider = ({ children }: { children: ReactNode }) => {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             refetchOnWindowFocus: false, // Does not refetch on window focus
//             refetchOnReconnect: false,
//             gcTime: Infinity,
//           },
//         },
//       })
//   );
//   const persister = createSyncStoragePersister({
//     storage: global?.window?.localStorage,
//   });
//   return (
//     <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
//       {children}
//     </PersistQueryClientProvider>
//   );
// };

// export default QueryProvider;
// "use client";
// import { ReactNode, useState, useEffect } from "react";
// import { QueryClient } from "@tanstack/react-query";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// import { PersistQueryClientProvider, persistQueryClient } from "@tanstack/react-query-persist-client";

// const QueryProvider = ({ children }: { children: ReactNode }) => {
//   const [persister, setPersister] = useState(null);
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             refetchOnWindowFocus: false,
//             refetchOnReconnect: false,
//             gcTime: 300000, // 5 minutes
//             staleTime: 60000, // 1 minute
//           },
//         },
//       })
//   );

//   useEffect(() => {
//     const localStoragePersister = createSyncStoragePersister({
//       storage: window.localStorage,
//     });
//     setPersister(localStoragePersister);

//     // Optional: Clear cache on version mismatch
//     persistQueryClient({
//       queryClient,
//       persister: localStoragePersister,
//       buster: "v2", // Update this version if the schema changes
//     });
//   }, [queryClient]);

//   if (!persister) return null; // Prevent rendering until persister is ready

//   return (
//     <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
//       {children}
//     </PersistQueryClientProvider>
//   );
// };

// export default QueryProvider;
