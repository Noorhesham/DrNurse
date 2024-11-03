"use client";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import React, { useTransition } from "react";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import ModalCustom from "./defaults/ModalCustom";

const AddToWishlist = ({
  className,
  id,
  wishlistStatus,
  noshare,
}: {
  className?: string;
  id: any;
  wishlistStatus: boolean;
  noshare?: boolean;
}) => {
  // const { data, isLoading } = useGetEntity("wishlistStatus", `wishlistStatus-${id}`, id);
  const { userSettings } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
          router.refresh();
        } else toast.error(res.message);
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      {userSettings ? (
        <button
          disabled={isPending}
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
              {t("loginPrompt")}
            </Link>
          }
        />
      )}
    </>
  );
};

export default AddToWishlist;
