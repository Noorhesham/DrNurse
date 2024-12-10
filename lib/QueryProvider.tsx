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
//             refetchOnWindowFocus: true,
//             refetchOnMount: true,
//             refetchOnReconnect: true,
//             staleTime: 0,
//             onError: (error) => {
//               console.error("Query Error:", error);
//             },
//           },
//         },
//       })
//   );

//   const persister = createSyncStoragePersister({
//     storage: global?.window?.localStorage,
//     serialize: (data) => JSON.stringify(data),
//     deserialize: (data) => {
//       try {
//         return JSON.parse(data);
//       } catch (error) {
//         console.error("Failed to deserialize persisted data:", error);
//         return {};
//       }
//     },
//   });

//   return (
//     <PersistQueryClientProvider
//       client={queryClient}
//       persistOptions={{ persister }}
//       onSuccess={() => {
//         console.log("Cache successfully restored!");
//       }}
//       onError={(error) => {
//         console.error("Cache restore failed:", error);
//       }}
//     >
//       {children}
//     </PersistQueryClientProvider>
//   );
// };

// export default QueryProvider;

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
