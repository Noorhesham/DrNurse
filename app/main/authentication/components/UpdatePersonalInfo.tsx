"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import UpdateCard from "@/app/components/UpdateCard";
import { GoPeople } from "react-icons/go";
import { MailIcon, PhoneIcon } from "lucide-react";
import { InputOTPPattern } from "./OTP";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import FormContainer from "@/app/components/forms/FormContainer";
import { useQueryClient } from "@tanstack/react-query";
import Paragraph from "@/app/components/defaults/Paragraph";
import { Button } from "@/components/ui/button";
import EmailUpdate from "./EmailUpdate";
import PhoneUpdate from "./PhoneUpdate";

const UpdatePersonalInfo = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [verify, setVerify] = useState(false);
  const personal = [
    { name: "name", placeholder: t("name") },
    { name: "birth_day", placeholder: t("birth_day"), date: true, optional: true },
    { name: "avatar", placeholder: t("avatar"), photo: true },
  ];
  const email = [{ name: "email", placeholder: t("email") }];
  const phone = [{ name: "phone", placeholder: t("phone"), phone: true, returnFullPhone: false }];
  const searchParams = useSearchParams();
  const { setLogin, userSettings: user, loading } = useAuth();
  const [OtpError, setOtpError] = useState<string | null>(null);

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
      setError(Array.isArray(res.errors) ? res.errors : res.message);
      return;
    }
    toast.success(res.message);
    setError(null);
    setLogin((l: any) => !l);
    setOpen(false);
  };
  const queryClient = useQueryClient();
  const updateEmailInfo = async (data: any, setError: any) => {
    const phone = data?.phone?.phone;
    const updatedData = {
      ...data,
      country_key: data.phone && user.country_key,
      phone: phone || null,
    };

    const res = await Server({ resourceName: "update_profile", body: updatedData });
    console.log(res);
    if (!res.status) {
      setError(res.errors?.length > 0 ? res.errors.join(", ") : res.errors?.email || res.message);
      return;
    }

    if (res.status) {
      toast.success(res.message);
      setLogin((l: any) => !l);
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      setError(null);
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("vefiy");
      data.phone ? updatedParams.set("type", "phone") : updatedParams.set("type", "email");
      data.phone ? updatedParams.set("phone", phone) : updatedParams.set("email", data.email);
      data.phone ? updatedParams.set("uuid", res.phone_code_uuid) : updatedParams.set("uuid", res.email_code_uuid);

      router.push(`?${updatedParams.toString()}`, { scroll: false });
      setLogin((l: any) => !l);
      setOpen(false);
    }
  };

  const verifyAccount = async (send_by: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("vefiy", "true");
    updatedParams.set("type", send_by === "sms" ? "phone" : "email");
    startTransition(async () => {
      setVerify(true);
      const res = await Server({ resourceName: "create-verification", body: { send_by } });
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        updatedParams.set("uuid", res.uuid);
        router.push(`?${updatedParams.toString()}`, { scroll: false });
      }
      // if (!res.status) toast.error(res.message);
    });
  };
  return (
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
          <div>
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
        content={
          loading ? (
            <Skeleton />
          ) : (
            <PhoneUpdate user={user} />
          )
        }
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
            <div className=" px-5 lg:px-20 py-5">
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
