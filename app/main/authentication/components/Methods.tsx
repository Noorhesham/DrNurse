import Head1 from "@/app/components/Head1";
import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

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
  const methodLabels: { [key: string]: string } = {
    email: tfa === "true" ? t("SEND_TFA_CODE_EMAIL") : t("SEND_PASSWORD_RESET_EMAIL"),
    sms: tfa === "true" ? t("SEND_TFA_CODE_SMS") : t("SEND_PASSWORD_RESET_SMS"),
    whats_app_otp: tfa === "true" ? t("SEND_TFA_CODE_WHATSAPP") : t("SEND_PASSWORD_RESET_WHATSAPP"),
    auth_app: t("SEND_TFA_CODE_AUTHAPP"),
  };
  return (
    <Suspense>
      <h1 className=" text-center text-xl mt-8 font-bold text-main2">{tfa ? t("2fadesc") : t("resetmessage")}</h1>
      <MaxWidthWrapper className="  mx-auto">
        {Object.keys(methods).filter(m=>m!=='apps').map(
          (method) =>
            methods[method] && ( // If method value exists
              <div
                key={method}
                onClick={() => handleSend(method)}
                className="flex cursor-pointer hover:border-main hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
              >
                <Head1 size="sm" text={methodLabels[method]} />
                <p className="text-main2 font-medium text-base">{methods[method]}</p>
              </div>
            )
        )}
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default Methods;
