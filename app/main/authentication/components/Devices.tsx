"use client";
import Spinner from "@/app/components/Spinner";
import UpdateCard from "@/app/components/UpdateCard";
import { useGetEntity } from "@/lib/queries";
import { format } from "date-fns";
import React, { useTransition } from "react";
import { MdOutlineDevices } from "react-icons/md";
import { HiComputerDesktop, HiPhone } from "react-icons/hi2";
import { Button, buttonVariants } from "@/components/ui/button";
import { Server } from "../../Server";
import { useTranslations } from "next-intl";
import { useDevice } from "@/app/context/DeviceContext";
import { Laptop } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ModalCustom from "@/app/components/defaults/ModalCustom";

const Devices = () => {
  const t = useTranslations();
  const { data, isLoading } = useGetEntity("getDevices", "devices");
  const queryClient = useQueryClient();
  const { device_info } = useDevice();
  const [isPending, startTransition] = useTransition();
  const filteredResult = Object.keys(data || {})
    .filter((key) => typeof data[key] === "object")
    .map((key) => data[key]);

  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            desc={t("devicesDesc")}
            text={t("devices")}
            icon={<MdOutlineDevices className=" text-main w-10 h-10" />}
          />
        </div>
      }
      content={
        isLoading ? (
          <Spinner />
        ) : (
          <div className=" flex  lg:flex-row flex-col items-center gap-5  lg:gap-20 lg:items-start px-5 lg:px-20 py-5">
            <div className=" lg:w-[10rem]">
              <p className=" text-sm text-nowrap font-semibold lg:text-base">{t("activedevices")}</p>
            </div>
            <div className=" flex flex-col gap-4  items-start">
              {filteredResult
                ?.flat()
                ?.reverse()
                .map((val, i) => (
                  <div key={i} className=" flex  w-full justify-between">
                    <div className="flex flex-col ">
                      <div className="flex flex-col items-start gap-1" key={i}>
                        <div className=" flex items-start gap-2">
                          {val.device_type?.toLowerCase() === "desktop" && (
                            <HiComputerDesktop className=" mb-auto text-main w-5 h-5 " />
                          )}
                          {val.device_type === "phone" && <HiPhone className=" text-main w-5 h-5" />}
                          {val.device_type === "mobile" && <Laptop className=" text-main w-8 h-8" />}
                          <h3 className=" font-semibold text-sm text-gray-900">{val?.device_type}</h3>
                          {val.unique_id === device_info.device_unique_id && (
                            <p className=" rounded-2xl text-[10px]  py-2 px-4 uppercase border border-gray-100 font-semibold">
                              {t("thisdevice")}
                            </p>
                          )}
                        </div>
                        <div className=" flex sm:flex-row flex-col items-start gap-2">
                          {val && (
                            <span className="  text-xs text-muted-foreground">
                              {t("logged")} {val.created_at && format(new Date(val.created_at), "dd MMM yyyy")}
                            </span>
                          )}

                          <div className=" text-xs text-muted-foreground max-w-sm flex  items-center gap-2">
                            <p>{val.os}</p> <p>{val.version}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {val.unique_id !== device_info.device_unique_id && (
                      <button
                        disabled={isPending}
                        onClick={async () => {
                          startTransition(async () => {
                            const res = await Server({ resourceName: "deviceLogout", body: { device_id: val.id } });
                            console.log(res);
                            if (res.status) {
                              toast.success(res.message);
                              queryClient.invalidateQueries({ queryKey: ["devices"] });
                            }
                          });
                        }}
                        className={` self-end px-4 text-xs mt-2 ${buttonVariants({ variant: "outline" })}`}
                      >
                        {t("logoutDevice")}
                      </button>
                    )}
                  </div>
                ))}
              <button
                disabled={isPending}
                onClick={async () => {
                  startTransition(async () => {
                    const res = await Server({ resourceName: "deviceLogout" });
                    console.log(res);
                    if (res.status) {
                      toast.success(res.message);
                      queryClient.invalidateQueries({ queryKey: ["devices"] });
                    }
                  });
                }}
                className={` self-end px-4 text-xs mt-2 ${buttonVariants({ variant: "destructive" })}`}
              >
                Log out from all devices
              </button>
            </div>
          </div>
        )
      }
    />
  );
};

export default Devices;
