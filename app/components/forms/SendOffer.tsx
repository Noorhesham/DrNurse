"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import CustomForm from "./CustomForm";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import MiniTitle from "../defaults/MiniTitle";
import { CURRENCY_OPTIONS } from "@/app/constants";
import { useGetEntity } from "@/lib/queries";
import Spinner from "../Spinner";
import CountriesInput from "../inputsForm/CountriesInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FlexWrapper from "../defaults/FlexWrapper";
import { useParams, useRouter } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import { useFormHandler } from "@/app/hooks/useFormHandler";
import { Server } from "@/app/main/Server";
const salaryRegex = /^[1-9]\d*$/;

const offerSchema = z.object({
  employeeName: z.string().min(1, "Name is required"),
  country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
  city_id: z.union([z.string().min(1, "City is required"), z.number()]),
  state_id: z.union([z.string().min(1, "State is required"), z.number()]),
  details: z.object({
    job_title: z.string().min(1, "Job Title is required"),
    salary: z.union([
      z
        .string()
        .regex(salaryRegex, "Min Salary must be a positive number and cannot start with 0")
        .min(1, "Salary is required"),
      z.number(),
    ]),
    benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
    currency: z.union([z.string().min(1, "Currency is required"), z.number()]),
    start_date: z.string().min(1, "Start Date is required"),
    address: z.string().optional(),
  }),
});

type OfferFormValues = z.infer<typeof offerSchema>;

const SendOffer = ({
  userId,
  defaultvals,
  negotiation,
}: {
  userId: string & { name: string; id: string };
  defaultvals?: any;
  negotiation?: { description: string };
}) => {
  const { data, isLoading } = useGetEntity("doctor", `doctor-${userId}`, userId, {
    enabled: defaultvals ? false : true,
  });
  const { id: companyId } = useParams();
  const router = useRouter();
  const t = useTranslations();
  const form = useZodForm({
    schema: offerSchema,
    defaultValues: {
      employeeName: data?.data?.name || userId.name || "",
      country_id: defaultvals?.country_id || "",
      city_id: defaultvals?.city_id || "",
      state_id: defaultvals?.state_id || "",
      details: {
        job_title: defaultvals?.job_title || "",
        salary: defaultvals?.salary || 0,
        benefits: defaultvals?.benefits || [],
        currency: defaultvals?.currency || "usd",
        start_date: defaultvals?.start_date || "",
        address: defaultvals?.address || "",
      },
    },
  });
  const { handleFormSubmit, isPending } = useFormHandler();

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: "details.benefits",
  });
  const id = data?.data?.user_id;
  const { setError } = form;
  console.log(form.formState.errors);
  const onSubmit = (data: OfferFormValues) => {
    handleFormSubmit({
      apiCall: Server,
      options: defaultvals
        ? {
            resourceName: "update-offer",
            id: defaultvals.id,
            body: { ...data, user_id: userId.id, _method: "PUT" },
          }
        : {
            resourceName: "add-offer",
            body: { ...data, user_id: id },
          },
      onSuccess: () => {
        router.push(`/dashboard/${companyId}/job-offers`);
      },
      onError: (err: any) => {
        console.error("Failed to submit form:", err);
      },
      setError,
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
      disableOldDates: true,
    },
  ];
  if (isLoading) return <Spinner />;

  return (
    <div className="  ">
      {negotiation && (
        <div className=" py-2 px-4 flex items-center gap-2 rounded-xl bg-yellow-500/90 mb-2 font-semibold text-yellow-100 border-gray-50">
          <FaExclamationCircle /> {negotiation?.description}
        </div>
      )}
      <MiniTitle text={t("addJobOffer")} boldness="bold" size="lg" />
      <div className=" flex flex-col mt-5 items-start gap-2">
        <Label className=" uppercase">{t("employeeName")}</Label>
        <Input disabled value={data?.data?.name || userId?.name || ""} />
      </div>
      <CustomForm
        disabled={isPending}
        btnText={defaultvals?.id ? t("UPDATE JOB OFFER") : t("addJobOffer")}
        form={form}
        inputs={offerArray}
        btnStyles="w-fit mr-auto "
        onSubmit={onSubmit}
      >
        <div className="mt-4">
          <FlexWrapper max={false}>
            <FormInput
              label={`${t("Yearly Salary")} ${form.getValues("details.currency")}`}
              type="number"
              placeholder={t("salaryPlaceholder")}
              name={`details.salary`}
            />
            <FormSelect label="Select Currency" name="details.currency" options={CURRENCY_OPTIONS} />
          </FlexWrapper>
          <div className=" my-4">
            <MiniTitle text={t("Benefits")} className=" !my-4" boldness="bold" size="lg" />

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
// const onSubmit = (data: OfferFormValues) => {
//   console.log("Form Submitted", data);
//   startTransition(async () => {
//     const res = defaultvals
//       ? await Server({
//           resourceName: "update-offer",
//           id: defaultvals.id,
//           body: { ...data, user_id: userId.id, _method: "PUT" },
//         })
//       : await Server({
//           resourceName: "add-offer",
//           body: { ...data, user_id: id },
//         });
//     queryClient.invalidateQueries({ queryKey: [`offers-${userId}`] });

//     console.log(res);
//     if (res.status) {
//       router.push(`/dashboard/${companyId}/job-offers`);

//     } else {
//       toast.error(res.message);
//       if (res.errors) {
//         Object.entries(res.errors).forEach(([field, messages]) => {
//           form.setError(field, {
//             type: "server",
//             message: Array.isArray(messages) ? messages[0] : messages, // Handle array or single string
//           });
//         });
//       }
//     }
//   });
// };
