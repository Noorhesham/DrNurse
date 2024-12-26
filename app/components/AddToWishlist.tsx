"use client";
import { Bookmark } from "lucide-react";
import React, { useTransition } from "react";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import ModalCustom from "./defaults/ModalCustom";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "./Spinner";

const AddToWishlist = ({
  className,
  id,
  wishlistStatus,
  noshare,
  parentId,
}: {
  className?: string;
  id: any;
  wishlistStatus: boolean;
  noshare?: boolean;
  parentId?: string;
}) => {
  // const { data, isLoading } = useGetEntity("wishlistStatus", `wishlistStatus-${id}`, id);
  const { userSettings, loading } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const t = useTranslations("wishlistContent");
  const mutateWishlist = (action: string) => {
    try {
      startTransition(async () => {
        const res = await Server({
          resourceName: "addWishlist",
          body: {
            action,
          },
          id,
        });
        if (res.status) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
          queryClient.invalidateQueries({ queryKey: [`job-${parentId?.toString() || ""}`] });
          router.refresh();
        } else toast.error(res.message);
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
  console.log(userSettings, "addto");

  return (
    <>
      {loading ? (
        <button disabled={isPending || loading} className="flex items-center gap-1">
          {!wishlistStatus ? <Bookmark /> : <Bookmark className="fill-main" />}
        </button>
      ) : userSettings ? (
        <button
          disabled={isPending || loading}
          onClick={() => {
            wishlistStatus ? mutateWishlist("remove") : mutateWishlist("add");
          }}
          className="flex items-center gap-1"
        >
          {!wishlistStatus ? <Bookmark /> : <Bookmark className="fill-main" />}
        </button>
      ) : (
        <ModalCustom
          btn={
            <button className=" w-fit   gap-1">
              <Bookmark />
            </button>
          }
          content={
            <Link
              href={"/login"}
              className="text-2xl hover:underline duration-150 py-10 text-main uppercase font-semibold text-center"
            >
              YOU HAVE TO LOGIN TO ADD TO BOOKMARK
            </Link>
          }
        />
      )}
    </>
  );
};

export default AddToWishlist;
