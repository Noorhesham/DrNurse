import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "react-toastify";
import { Server } from "../main/Server";

const CancelInvitation = ({ meet, jobId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await Server({
            resourceName: "cancelInvite",
            body: {
              meeting_id: meet.id,
              cancelled: true,
            },
          });
          if (res.status) {
            toast.success(res.message);
            router.refresh();
            queryClient.invalidateQueries({
              queryKey: ["person-slots", `person-meetings`, `meetings-${jobId}`],
            });
          } else toast.error(res.message);
        });
      }}
      variant={"destructive"}
      size={"lg"}
      className=" rounded-full"
    >
      Cancel Invitation
    </Button>
  );
};

export default CancelInvitation;
