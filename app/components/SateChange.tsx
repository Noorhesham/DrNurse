import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetEntity } from "@/lib/queries";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SateChange = ({ size, jobId, defaultValue }: { size?: string; jobId?: number | string; defaultValue?: any }) => {
  const { data, isLoading } = useGetEntity("classification", "classification");
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const handleChange = (id: number | string) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "classify",
        body: {
          job_application_id: jobId,
          classification_id: id,
        },
      });
      console.log(res);
      if (res.status) {
        router.refresh();
        toast.success(res.message);
      } else toast.error(res.message);
    });
  };
  console.log(data);
  if (!jobId) return null;
  return (
    <Select
      defaultValue={defaultValue?.id}
      onValueChange={(id) => handleChange(id)}
      disabled={isLoading || !data || isPending}
    >
      <SelectTrigger
        className={`w-[180px] ${
          size === "sm" && "py-1 px-2"
        } text-sm rounded-2xl text-center uppercase placeholder:text-center placeholder:text-sm  bg-main2 text-gray-50`}
      >
        <SelectValue
          className=" mx-auto text-center uppercase placeholder:text-center text-xs md:text-sm "
          placeholder="CHANGE STATE"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.data?.map((item: { id: number | string; name: string }) => (
            <SelectItem   className=" uppercase" key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SateChange;
