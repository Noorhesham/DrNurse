"use client";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import UpdateCard from "@/app/components/UpdateCard";
import { GoPeople } from "react-icons/go";
import { MailIcon, PhoneIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import FormContainer from "@/app/components/forms/FormContainer";

import EmailUpdate from "./EmailUpdate";
import PhoneUpdate from "./PhoneUpdate";
import useCachedQuery from "@/app/hooks/useCachedData";

const UpdatePersonalInfo = ({ avatarOnly, setIselected }: { avatarOnly?: boolean; setIselected?: any }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const personal = avatarOnly
    ? [{ name: "avatar", placeholder: t("avatar"), photo: true }]
    : [
        { name: "name", placeholder: t("name") },
        { name: "birth_day", placeholder: t("birth_day"), date: true, optional: true },
        { name: "avatar", placeholder: t("avatar"), photo: true },
      ];

  const { setLogin, userSettings: user, loading } = useAuth();
  const uploadAvatar = async (data: any, setError: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "avatar" && data[key] instanceof FileList && data[key].length > 0) {
        formData.append(key, data[key][0]);
      }
    });
  };
  const updatePersonalInfro = async (data: any, setError: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "birth_day" && data[key] instanceof Date) {
        const formattedDate = format(data[key], "yyyy-MM-dd");
        formData.append(key, formattedDate);
      } else if (key === "avatar") {
        if (data[key] instanceof FileList && data[key].length > 0) {
          formData.append(key, data[key][0]);
        }
      } else if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const res = await Server({ resourceName: "update_profile", body: formData, formData: true });

    if (!res.status) {
      console.log(res);
      // setError(Array.isArray(res.errors) ? res.errors : res.message);
      return toast.error(res.message);
    }
    toast.success(res.message);
    if (avatarOnly) setIselected(true);
    setError(null);
    setLogin((l: any) => !l);
    setOpen(false);
  };

  return avatarOnly ? (
    <div className=" px-5 lg:px-20 py-5">
      <FormContainer
        avatarOnly
        submit={updatePersonalInfro}
        cancel={true}
        defaultValues={user}
        btnStyles={"w-full"}
        btnText={t("saveChanges")}
        formArray={personal}
        title={t("updatePersonalInfo")}
      />
    </div>
  ) : (
    <>
      <ModalCustom
        btn={
          <div>
            <UpdateCard
              text={t("updateEmail")}
              desc={user?.email}
              icon={<MailIcon className=" text-main w-10 h-10" />}
            />
          </div>
        }
        content={loading ? <Skeleton /> : <EmailUpdate user={user} />}
      />
      <ModalCustom
        isOpen={open}
        btn={
          <div className="">
            <UpdateCard
              text={t("updatePhone")}
              desc={
                loading
                  ? ""
                  : locale === "ar"
                  ? `${user?.phone}+${user?.country_key} `
                  : `+${user?.country_key} ${user?.phone}`
              }
              icon={<PhoneIcon className=" text-main w-10 h-10" />}
            />
          </div>
        }
        content={loading ? <Skeleton /> : <PhoneUpdate user={user} />}
      />
      <ModalCustom
        isOpen={open}
        btn={
          <div>
            <UpdateCard
              text={t("personalInfo")}
              desc={t("personalDetails")}
              icon={<GoPeople className=" text-main w-10 h-10" />}
            />
          </div>
        }
        content={
          loading ? (
            <Skeleton />
          ) : (
            <div className="flex justify-center items-center px-5 lg:px-20 py-5">
              <FormContainer
                submit={updatePersonalInfro}
                cancel={true}
                defaultValues={user}
                btnStyles={"w-full"}
                btnText={t("saveChanges")}
                formArray={personal}
                title={t("updatePersonalInfo")}
              />
            </div>
          )
        }
      />
    </>
  );
};

export default UpdatePersonalInfo;
