import { ResourceNameProps, Server } from "@/app/main/Server";
import { useQuery } from "@tanstack/react-query";
import cookies from "js-cookie";
const useGetGeneralSettings = (needed: string[]) => {
  const { data, isLoading } = useQuery({
    queryKey: [needed],
    queryFn: async () =>
      await Server({
        resourceName: "MGS",
        body: {
          needed,
          token: cookies.get("jwt"),
          device_id: JSON.parse(cookies.get("device_info") || "{}")?.device_unique_id,
        },
      }),
  });

  return { data, isLoading };
};
const useGetEntity = (
  resourceName: ResourceNameProps,
  key?: any,
  id?: string,
  options: { enabled?: boolean; nocompany?: boolean; cache: number } = {},
  queryParams?: any
) => {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () =>
      await Server({
        resourceName: resourceName,
        id: id,
        queryParams,
        nocompany: options.nocompany,
        cache: options.cache,
      }),
    enabled: options.enabled,
  });

  return { data, isLoading };
};
export { useGetGeneralSettings, useGetEntity };
