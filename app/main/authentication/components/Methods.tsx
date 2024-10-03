import Head1 from "@/app/components/Head1";
import React, { Suspense } from "react";
import { useTranslations } from "next-intl";

const Methods = ({
  handleSend,
  message,
  methods,
  tfa,
  reset,
}: {
  handleSend: (type: string) => void;
  message: string;
  methods: { email: string; sms: string; apps: any; auth_app: any } | any;
  tfa?: string;
  reset?: boolean;
}) => {
  const t = useTranslations();

  return (
    <Suspense>
      <h1 className=" text-center text-xl mt-8 font-bold text-main2">{tfa ? t("2famessage") : t("resetmessage")}</h1>
      <div>
        {methods.email && (
          <div
            onClick={() => handleSend("email")}
            className="flex cursor-pointer hover:border-main hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 size="sm" text={tfa === "true" ? t("SEND_TFA_CODE") : t("SEND_PASSWORD_RESET_EMAIL")} />
            <p className=" text-main2 font-medium text-base">{methods.email}</p>
          </div>
        )}
        {methods.sms && (
          <div
            onClick={() => handleSend("sms")}
            className="flex cursor-pointer hover:border-main hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 size="sm" text={tfa === "true" ? t("SEND_TFA_CODE") : t("SEND_PASSWORD_RESET_SMS")} />
            <p className=" text-main2 font-medium text-base">{methods.sms}</p>
          </div>
        )}
        {methods.auth_app && (
          <div
            onClick={() => handleSend("auth_app")}
            className="flex cursor-pointer hover:border-main hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 size="sm" text={t("SEND_TFA_CODE")} />
            <p className=" text-main2 font-medium text-base">Auth app</p>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Methods;
