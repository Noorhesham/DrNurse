import { ResourceNameProps, Server } from "@/app/main/Server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  options: { enabled?: boolean; nocompany?: boolean } = {},
  queryParams?: any
) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: Array.isArray(key) ? key : [key], // Ensure queryKey is always an array
    queryFn: async () =>
      await Server({
        resourceName: resourceName,
        id: id,
        queryParams,
        nocompany: options.nocompany,
      }),
    enabled: options.enabled,
    initialData: () => {
      return queryClient.getQueryData([key]);
    },
  });

  return { data, isLoading };
};
export { useGetGeneralSettings, useGetEntity };
