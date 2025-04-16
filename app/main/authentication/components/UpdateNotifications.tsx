import FormContainer from "@/app/components/forms/FormContainer";

import ModalCustom from "@/app/components/defaults/ModalCustom";
import UpdateCard from "@/app/components/UpdateCard";
import React, { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { Server } from "../../Server";
import { useDevice } from "@/app/context/DeviceContext";
import { toast } from "react-toastify";
import useFcmToken from "@/app/hooks/useFcmToken";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
const notifications = [
  { name: "active", label: "ACTIVATE", label2: "DEACTIVATE", switchToggle: true, noSwitch: false },
];

const UpdateNotifications = () => {
  const { device_info } = useDevice();
  const { token } = useFcmToken();
  const [notificationStatus, setNotificationStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      const res = await Server({
        resourceName: "languageUpdate",
        body: {
          action: "get",
          key: "notification_token_status",
          device_info,
        },
      });
      console.log(res);
      setNotificationStatus(res.device.notification_token_status);
      setLoading(false);
    };
    getNotifications();
  }, []);
  const UpdateNotificationsSubmit = async (val: any) => {
    const res = await Server({
      resourceName: "languageUpdate",
      body: {
        action: "set",
        key: "notification_token_status",
        value: val.active,
        device_info,
      },
    });
    const sendVal = async () => {
      const res = await Server({
        resourceName: "languageUpdate",
        body: {
          action: "set",
          key: "notification_token",
          value: token,
          device_info,
        },
      });
      console.log(res, token);
    };
    if (val.active) sendVal();
    if (res.status) {
      toast.success(res.message);
      setNotificationStatus(val.active);
    } else toast.error(res.message);
  };

  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text="CUSTOMIZE NOTIFICATIONS"
            desc="CONFIGURE CUSTOM SETTINGS"
            icon={<MdNotifications className=" text-main h-10 w-10" />}
          />
        </div>
      }
      content={
        loading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center items-center  px-5 lg:px-20 py-5">
            <FormContainer
              defaultValues={{ active: notificationStatus }}
              cancel={true}
              submit={UpdateNotificationsSubmit}
              btnStyles={"w-full"}
              btnText="SAVE CHANGES"
              formArray={notifications}
              title="CUSTOMIZE  NOTIFICATIONS"
            />
          </div>
        )
      }
    />
  );
};

export default UpdateNotifications;
