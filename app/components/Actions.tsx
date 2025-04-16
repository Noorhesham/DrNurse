"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { Server } from "../main/Server";
import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Actions = ({
  jobId,
  viewLink,
  editLink,
  id,
  person,
}: {
  jobId: string;
  viewLink?: string;
  editLink?: string;
  id?: string;
  person?: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-fit p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {!person && (
          <DropdownMenuItem>
            <Link className=" w-full py-1.5 px-3 text-sm lg:text-base" href={editLink || "#"}>
              Edit
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link className=" w-full py-1.5 px-3 text-sm lg:text-base" href={viewLink || "#"}>
            View
          </Link>
        </DropdownMenuItem>
        {!person && (
          <DropdownMenuItem>
            <Button
              onClick={() => {
                startTransition(async () => {
                  const res = await Server({
                    resourceName: "duplicate",
                    body: {
                      job_id: jobId,
                    },
                  });
                  if (res.status) {
                    toast.success(res.message);
                    queryClient.invalidateQueries({ queryKey: [`job-${jobId}`, `company-${id}`] });
                  } else toast.error(res.message);
                });
              }}
            >
              {" "}
              Duplicate
            </Button>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
