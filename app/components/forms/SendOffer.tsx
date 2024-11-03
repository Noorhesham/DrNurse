"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import CustomForm from "./CustomForm";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import MiniTitle from "../defaults/MiniTitle";
import FormFlexContainer from "./FormFlexContainer";
import { CURRENCY_OPTIONS } from "@/app/constants";
import { useGetEntity } from "@/lib/queries";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { Server } from "@/app/main/Server";
import { useQueryClient } from "@tanstack/react-query";
import CountriesInput from "../inputsForm/CountriesInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FlexWrapper from "../defaults/FlexWrapper";
import { useParams, useRouter } from "next/navigation";

const offerSchema = z.object({
  employeeName: z.string().min(1, "Name is required"),
  country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
  city_id: z.union([z.string().min(1, "City is required"), z.number()]),
  state_id: z.union([z.string().min(1, "State is required"), z.number()]),
  details: z.object({
    job_title: z.string().min(1, "Job Title is required"),
    salary: z.union([z.string().min(1, "Salary is required"), z.number()]),
    benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
    currency: z.union([z.string().min(1, "Currency is required"), z.number()]),
    start_date: z.string().min(1, "Start Date is required"),
    address: z.string().optional(),
  }),
});

type OfferFormValues = z.infer<typeof offerSchema>;

const SendOffer = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetEntity("doctor", `doctor-${userId}`, userId);
  const { id: companyId } = useParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();
  const form = useZodForm({
    schema: offerSchema,
    defaultValues: {
      employeeName: data?.data?.name || "",
      details: {
        job_title: "",
        salary: 0,
        benefits: [""],
        currency: "",
        start_date: "",
        address: "",
      },
    },
  });
  const queryClient = useQueryClient();
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: "benefits",
  });
  const id = data?.data?.user_id;
  const onSubmit = (data: OfferFormValues) => {
    console.log("Form Submitted", data);
    startTransition(async () => {
      const res = await Server({
        resourceName: "add-offer",
        body: { ...data, user_id: id },
      });
      queryClient.invalidateQueries({ queryKey: [`offers-${userId}`] });

      console.log(res);
      if (res.status) {
        router.push(`/dashboard/${companyId}/job-offers`);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const offerArray = [
    {
      name: "details.job_title",
      placeholder: t("jobtitle"),
      label: t("jobtitle"),
    },
    {
      name: "details.start_date",
      date: true,
      placeholder: t("startDatePlaceholder"),
      label: t("startdate"),
    },
  ];
  if (isLoading || !data) return <Spinner />;

  return (
    <div className=" px-5 py-2.5">
      <MiniTitle text={t("addJobOffer")} boldness="bold" size="lg" />
      <div className=" flex flex-col mt-5 items-start gap-2">
        <Label className=" uppercase">{t("employeeName")}</Label>
        <Input disabled value={data.data.name} />
      </div>
      <CustomForm
        disabled={isPending}
        btnText={t("addJobOffer")}
        form={form}
        inputs={offerArray}
        btnStyles="w-fit mr-auto "
        onSubmit={onSubmit}
      >
        <div className="mt-4">
          <FlexWrapper max={false}>
            <FormInput
              label={`${t("salary")} ${form.getValues("details.currency")}`}
              type="number"
              placeholder={t("salaryPlaceholder")}
              name={`details.salary`}
            />
            <FormSelect label="Select Currency" name="details.currency" options={CURRENCY_OPTIONS} />
          </FlexWrapper>
          {fields.map((field, index) => (
            <div className="flex mb-5 items-center gap-4 mt-2" key={field.id}>
              <FormInput name={`details.benefits.${index}`} placeholder={t("addBenefit")} />
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-xl self-center border-2 border-gray-600 p-1 my-auto"
              >
                <XIcon className="w-4 h-4 " />
              </button>
            </div>
          ))}
          <div className="my-4">
            <FunctionalButton size="sm" btnText={t("addBenefit")} onClick={() => append("")} />
          </div>

          <div className="flex flex-col gap-3">
            <CountriesInput countryName="country_id" stateName="state_id" cityName="city_id" />
            <FormInput label="Address" control={form.control} name="details.address" placeholder="STREET" />
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default SendOffer;
