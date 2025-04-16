import React from "react";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import { Lock } from "lucide-react";
import UpdateCard from "@/app/components/UpdateCard";
import FormContainer from "@/app/components/forms/FormContainer";
import { useTranslations } from "next-intl";
import { DialogClose } from "@/components/ui/dialog";

const UpdatePassword = () => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const t = useTranslations();
  const updatePasswordInfo = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "update_password", body: data });
    console.log(res);
    if (!res.status) setError(res.errors.password || res.message)();
    if (res) {
      toast.success(res.message);
      setError(null);
      ref.current?.click();
    }
  };
  const updatePassword = [
    { name: "password", placeholder: t("password"), type: "password", password: true, noProgress: false },
  ];
  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text={t("updatePassword")}
            desc={t("personalDetails")}
            icon={<Lock className="w-10 h-10 text-main" />}
          />
        </div>
      }
      content={
        <div className="flex justify-center items-center px-5 lg:px-20 py-5">
          <DialogClose ref={ref} />

          <FormContainer
            closeAfter={true}
            submit={updatePasswordInfo}
            cancel={true}
            btnStyles={"w-full"}
            btnText={t("confirm")}
            formArray={updatePassword}
            title={t("updatePassword")}
          />
        </div>
      }
    />
  );
};

export default UpdatePassword;
