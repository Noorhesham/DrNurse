import Head1 from "@/app/components/Head1";
import React, { Suspense, useTransition } from "react";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Spinner from "@/app/components/Spinner";

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
  tfa?: string | boolean;
  reset?: boolean;
}) => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const methodLabels: { [key: string]: string } = {
    email:
      tfa === "true" ? t("SEND_TFA_CODE_EMAIL") : reset ? t("SEND_PASSWORD_RESET_EMAIL") : t("SEND_ACTIVATION_EMAIL"),
    sms: tfa === "true" ? t("SEND_TFA_CODE_SMS") : reset ? t("SEND_PASSWORD_RESET_SMS") : t("SEND_ACTIVATION_SMS"),
    whats_app_otp:
      tfa === "true"
        ? t("SEND_TFA_CODE_WHATSAPP")
        : reset
        ? t("SEND_PASSWORD_RESET_WHATSAPP")
        : t("SEND_ACTIVATION_WHATSAPP"),
    whatsapp_otp:
      tfa === "true"
        ? t("SEND_TFA_CODE_WHATSAPP")
        : reset
        ? t("SEND_PASSWORD_RESET_WHATSAPP")
        : t("SEND_ACTIVATION_WHATSAPP"),
    auth_app: t("SEND_TFA_CODE_AUTHAPP"),
  };
  return (
    <Suspense>
      <h3 className=" text-center text-xl mt-8 font-bold text-main2">{tfa ? t("2fadesc") : t("resetmessage")}</h3>
      <div className=" my-5 relative  mx-auto">
        {isPending && <Spinner  />}
        {Object.keys(methodLabels)
          .filter((m) => m !== "apps")
          .map(
            (method) =>
              methods[method] && ( // If method value exists
                <div
                  key={method}
                  onClick={() => startTransition(() => handleSend(method))}
                  className={` ${
                    isPending && "opacity-80"
                  } flex cursor-pointer hover:border-main hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5`}
                >
                  <Head1 size="sm" text={methodLabels[method]} />
                  <p className="text-main2 font-medium text-base">{methods[method]}</p>
                </div>
              )
          )}
      </div>
    </Suspense>
  );
};

export default Methods;
