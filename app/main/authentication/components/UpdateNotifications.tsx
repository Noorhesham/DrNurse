import FormContainer from "@/app/components/forms/FormContainer";

import ModalCustom from "@/app/components/defaults/ModalCustom";
import UpdateCard from "@/app/components/UpdateCard";
import React from "react";
import { MdNotifications } from "react-icons/md";
import { Server } from "../../Server";
import { useDevice } from "@/app/context/DeviceContext";
import { toast } from "react-toastify";
const notifications = [{ name: "active", label: "DEACTIVATE", label2: "ACTIVATE", switchToggle: true }];

const UpdateNotifications = () => {
  const { device_info } = useDevice();
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
    if (res.status) toast.success(res.message);
    else toast.error(res.message);
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
        <div className=" px-5 lg:px-20 py-5">
          <FormContainer
            cancel={true}
            submit={UpdateNotificationsSubmit}
            btnStyles={"w-full"}
            btnText="SAVE CHANGES"
            schema="notifictations"
            formArray={notifications}
            title="CUSTOMIZE  NOTIFICATIONS"
          />
        </div>
      }
    />
  );
};

export default UpdateNotifications;
