import React, { ReactNode, useTransition } from "react";

import { Form } from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Head1 from "../Head1";
import FormSelect from "../inputsForm/FormSelect";
import CountriesInput from "../inputsForm/CountriesInput";
import FormInput from "../inputsForm/FormInput";
import MyLink from "../MyLink";
import SubmitButton from "../SubmitButton";

export interface CustomFormProps {
  inputs: InputProps[];
  src?: string;
  serverError?: string[] | string | null;
  title?: string;
  noimg?: boolean;
  text?: string;
  onSubmit?: any;
  id?: string;
  form: any;
  titles?: string[];
  isPending?: boolean;
  localSubmit?: any;
  children?: ReactNode;
  btnText?: string;
  link?: string;
  linkText?: string;
  disabled?: boolean;
  btnStyles?: string;
  cancel?: any;
}
export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  label?: string;
  optional?: boolean;
  id?: string;
  options?: any[];
  select?: boolean;
  removeOp?: any;
  selected?: any;
  defaultValue?: any;
  phone?: boolean;
  switchToggle?: boolean;
  label2?: string;
  date?: boolean;
  password?: boolean;
  cityName?: string;
  children?: ReactNode;
  noProgress?: boolean;
  area?: boolean;
  country?: boolean;
  returnFullPhone?: boolean;
  disableOldDates?: boolean;
  countryName?: string | any;
  className?: string;
  disabled?: boolean;
  stateName?: string | any;
  noSwitch?: boolean;
  closeAfter?: boolean;
}
const CustomForm = ({
  inputs,
  serverError,
  title,
  btnText,
  form,
  onSubmit,
  children,
  linkText,
  link,
  disabled,
  isPending,
  btnStyles,
  cancel,
  avatarOnly,
}: CustomFormProps) => {
  const t = useTranslations();
  return (
    <Form {...form}>
      <form className="flex w-full items-stretch gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col">
          {title && <Head1 size="sm" className=" text-lg text-center" text={title} />}
          <div className="flex lg:pt-4 flex-col gap-4">
            {inputs.map((input) =>
              input?.select ? (
                <FormSelect placeholder={input.placeholder} key={input.name} {...input} />
              ) : input.country ? (
                <CountriesInput cityName={input.cityName} countryName={input.countryName} stateName={input.stateName} />
              ) : (
                <FormInput
                  avatarOnly={avatarOnly}
                  optional={input.required ? false : true}
                  disableOldDates={input?.disableOldDates}
                  noSwitch={input.noSwitch}
                  returnFullPhone={input?.returnFullPhone}
                  disabled={disabled}
                  label2={input?.label2 || ""}
                  switchToggle={input?.switchToggle}
                  phone={input.phone || false}
                  key={input.name}
                  {...input}
                />
              )
            )}
          </div>
          {children}
          <div className={cn("flex gap-2 mt-5 items-center", { "self-center w-full lg:w-[60%]": cancel })}>
            <div className={`${btnStyles} flex-1 flex items-center flex-col`}>
              {link && linkText && <MyLink link={link} text={linkText} />}
              {
                <div className=" w-full">
                  <SubmitButton btnStyles={btnStyles} text={btnText || t("Submit")} isPending={isPending || disabled} />
                </div>
              }
            </div>
            {cancel && (
              <DialogClose className=" mx-auto flex-1 w-full flex  items-center gap-5  ">
                {
                  <Button
                    type="button"
                    className="text-xs relative flex-grow mr-auto self-end mx-0  hover:bg-main2 hover:text-white rounded-full flex  items-center gap-2 px-6  border border-main2 bg-white text-main2"
                  >
                    {t("cancel")}
                  </Button>
                }
              </DialogClose>
            )}
          </div>
          <div className=" mt-2">
            {" "}
            {Array.isArray(serverError)
              ? serverError?.map((err: any, i: number) => (
                  <p key={i} className="text-red-500 text-sm">
                    {err}
                  </p>
                ))
              : serverError && <p className="text-red-500 text-sm">{serverError}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CustomForm;
