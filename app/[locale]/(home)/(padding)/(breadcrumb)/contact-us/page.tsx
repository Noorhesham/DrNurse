import BreadCrumb from "@/app/components/BreadCrumb";
import Head1 from "@/app/components/Head1";

import { BookAIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import Address from "@/app/components/Address";
import ContactUsLocation from "@/app/components/ContactUsLocation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Server } from "@/app/main/Server";
import Section from "@/app/components/defaults/Section";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import FormContainer from "@/app/components/forms/FormContainer";
import Socials from "@/app/components/Socials";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const { forms } = await Server({ resourceName: "getForms", body: { slugs: ["contact-us"] } });
  const fields = forms[0].fields
    .map((field: any) => {
      if (field.type === "button") return;
      return {
        name: field.key,
        label: field.label,
        placeholder: field.label,
        type: field.type === "textfield" ? "text" : field.type,
        area: field.type === "textarea" ? true : false,
        phone: field.type === "phoneNumber" ? true : false,
        select: false,
        required: field.validate?.required || false,
        returnFullPhone: true,
      };
    })
    .filter((field: any) => field !== undefined);

  return (
    <main className="  ">
      <MaxWidthWrapper>
        <div className=" flex flex-col   gap-4 lg:gap-2 md:grid items-center lg:items-start  md:grid-cols-4">
          <Section
            CustomePadding="px-0  !py-0 lg:px-0"
            className="  w-full col-span-2 flex flex-col gap-4"
            heading={t("contact.title")}
          >
            <Paragraph className="capitalize" description={t("contact.description")} />
            <Address />

            <div className=" flex flex-col items-start mt-2">
              <h2 className="  text-left font-semibold text-main">{t("contact.contact")}</h2>
              <Paragraph description={t("contact.contactDescription")} />
              <Socials />
            </div>
          </Section>

          <div className="w-full flex  flex-col items-start col-span-2">
            <Head1 animation={false} size="sm" alignment="left" text={t("contact.question")} />
            <FormContainer server submit={"submitForm"} btnText={t("contact.send")} formArray={fields} />
          </div>
        </div>
      </MaxWidthWrapper>
      <ContactUsLocation />
    </main>
  );
};

export default Page;
