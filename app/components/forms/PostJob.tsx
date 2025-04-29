"use client";

import { useZodForm } from "@/app/hooks/useZodForm";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { PlusCircle, PlusIcon, XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import { RadioGroupForm } from "../inputsForm/RadioGroup";
import FormFlexContainer from "./FormFlexContainer";
import GridContainer from "../defaults/GridContainer";
import { AnimatePresence } from "framer-motion";
import ComboboxForm from "../inputsForm/ComboboxForm";
import MotionItem from "../defaults/MotionItem";
import { CURRENCY_OPTIONS, FAMILYSTATUS, GENDER } from "@/app/constants";
import CareerInput, { useGetEntities } from "../inputsForm/CareerTypeInput";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useGetEntity } from "@/lib/queries";
import { useParams, useRouter } from "next/navigation";
import VerificationStatus from "../VerficationStatus";
import { useFormHandler } from "@/app/hooks/useFormHandler";
import { UpdateIcon } from "@radix-ui/react-icons";
// Define Zod schema
const salaryRegex = /^[1-9]\d*$/;

const jobSchema = z
  .object({
    job_title: z.string().min(1, "Job title is required"),
    career_type_id: z.union([z.string().min(1, "Career Type is required"), z.number()]),
    career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
    career_level_id: z.union([z.string().min(1, "Career Level is required"), z.number()]),
    experience_from: z.union([z.string().min(1, "Experience From is required"), z.number()]),
    experience_to: z.union([z.string().min(1, " Experience To is required"), z.number()]),
    application_available_status: z.string().min(1, "Application Status is required"),
    branch_id: z.string().min(1, "Branch is required"),
    min_salary: z.union([
      z
        .string()
        .regex(salaryRegex, "Min Salary must be a positive number and cannot start with 0")
        .min(1, "Min Salary is required"),
      z.number(),
    ]),
    max_salary: z.union([
      z
        .string()
        .regex(salaryRegex, "Min Salary must be a positive number and cannot start with 0")
        .min(1, "Max Salary is required"),
      z.number(),
    ]),
    hide_salary: z.string().min(1, "Hide Salary? is required"),
    nationality_id: z.union([z.string().optional(), z.number().optional()]),
    gender: z.string().optional(),
    family_status: z.string().optional(),
    benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
    job_description: z
      .string()
      .min(20, "Description is too short")
      .max(4000, { message: "Description is too long" })
      .optional(),
    job_requirements: z
      .string()
      .min(20, "Responsibility is too short")
      .max(4000, { message: "Responsibility  is too long" })
      .optional(),
    recipient_status: z.string().optional(),
    recipient_email: z.string().optional(),
    currency: z.string(),
  })
  .refine((data) => +data.experience_from < +data.experience_to, {
    message: "'Experience From' date must be earlier than 'Experience To' date",
    path: ["experience_to"],
  })
  .refine((data) => +data.max_salary > +data.min_salary, {
    message: "Max Salary must be greater than Min Salary",
    path: ["max_salary"],
  });

type JobFormValues = z.infer<typeof jobSchema>;

const PostJob = ({ defaultData }: { defaultData?: any }) => {
  console.log(defaultData);

  const { id } = useParams();
  const t = useTranslations();
  const { data: company, isLoading: loadingCompany } = useGetEntity("company", `company-${id}`, id);

  const { data: careerTypes, isLoading: loadingCareerTypes } = useGetEntities({
    resourceName: "getEntity",
    key: "career-types",
    entityName: "career-types",
    cache: 0,
  });

  const { data, isLoading } = useGetEntities({
    resourceName: "getBranches",
    key: `branches-${id}`,
    queryParams: `company_id=${id}`,
  });
  const { data: countries, isLoading: loadingCountries } = useGetEntity("countries", "countries");
  const form = useZodForm({
    schema: jobSchema,
    defaultValues: {
      job_title: defaultData?.job_title || "",
      career_type_id: defaultData?.career_type_id || "",
      career_specialty_id: defaultData?.career_specialty_id || "",
      career_level_id: defaultData?.career_level_id || "",
      experience_from: defaultData?.experience_from || "",
      experience_to: defaultData?.experience_to || "",
      branch_id: defaultData?.branch_id?.toString() || "",
      min_salary: defaultData?.min_salary || 0,
      max_salary: defaultData?.max_salary || 0,
      hide_salary: defaultData?.hide_salary.toString() || "",
      nationality_id: defaultData?.nationality?.id || " ",
      gender: defaultData?.gender || "",
      family_status: defaultData?.family_status || "",
      benefits: JSON.parse(defaultData?.benefits || "[]") || [" "],
      job_description: defaultData?.job_description || "",
      job_requirements: defaultData?.job_requirements || "",
      currency: defaultData?.currency || "sar",
      recipient_status: defaultData?.recipient_status || "",
      recipient_email: defaultData?.recipient_email || "",
      application_available_status: defaultData?.application_available_status || "regular",
    },
  });
  const { watch, clearErrors, setError } = form;
  const minSalary = watch("min_salary");
  const maxSalary = watch("max_salary");

  useEffect(() => {
    if (!form.getValues("min_salary") || !form.getValues("max_salary")) return;
    clearErrors("min_salary");
    clearErrors("max_salary");

    const min = Number(minSalary);
    const max = Number(maxSalary);

    if (isNaN(min) || min < 0) {
      setError("min_salary", {
        type: "manual",
        message: "Min Salary must be a valid positive number",
      });
    }
    if (isNaN(max) || max < 0) {
      setError("max_salary", {
        type: "manual",
        message: "Max Salary must be a valid positive number",
      });
    }
    if (!isNaN(min) && !isNaN(max) && min >= max) {
      setError("max_salary", {
        type: "manual",
        message: "Max Salary must be greater than Min Salary",
      });
    }
  }, [minSalary, maxSalary, setError, clearErrors]);
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast.error(
        Object.values(form.formState.errors)
          .map((error) => error.message)
          .join(", ")
      );
    }
  }, [form.formState.errors]);
  const queryClient = useQueryClient();
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: "benefits",
  });
  const router = useRouter();
  const { handleFormSubmit, isPending } = useFormHandler();
  const onSubmit = (data: JobFormValues) => {
    handleFormSubmit({
      apiCall: Server,
      options: defaultData
        ? {
            resourceName: "update-job",
            body: data,
            id: defaultData?.id || "",
          }
        : {
            resourceName: "add-job",
            body: data,
          },
      onSuccess: () => {
        defaultData?.id
          ? queryClient.invalidateQueries({ queryKey: [`job-${defaultData.id}`] })
          : router.push(`/dashboard/${id}/jobs`);
        queryClient.invalidateQueries({ queryKey: [`company-overview-${id}`, `company-jobs-${id}`] });
      },
      onError: (err: any) => {
        console.error("Failed to submit form:", err);
      },
      setError,
    });
  };
  console.log(data);
  return (
    <div>
      {!loadingCompany &&
        (company.data.verification_type === "pending" || company.data.verification_type === "re-review") && (
          <VerificationStatus
            message="Jobs Cannot be posted until company is verified"
            verification_type={company.data.verification_type}
          />
        )}
      <Form {...form}>
        <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <MiniTitle size="md" boldness="bold" text={defaultData?.id ? t("Edit Job") : t("postJob")} />
          <div className=" flex flex-col gap-3 mt-3">
            {/* Job Title and Career Details */}
            <FormInput
              control={form.control}
              name="job_title"
              label={t("Job Title")}
              placeholder={t("Enter Job Title")}
            />
            <CareerInput
              careerTypes={careerTypes}
              disabled={loadingCareerTypes}
              loadingCareerTypes={loadingCareerTypes}
              careerType="career_type_id"
              careerSpecialty="career_specialty_id"
              careerLevel="career_level_id"
            />
            {/* Experience */}
            <GridContainer cols={3}>
              <FormInput control={form.control} name="experience_from" label={t("experience from")} type="number" />
              <FormInput control={form.control} name="experience_to" label={t("experience to")} type="number" />
            </GridContainer>
            <FormSelect
              label={t("AVAILABLITY STATUS")}
              name="application_available_status"
              defaultValue={"regular"}
              options={[
                { label: "Regular", value: "regular" },
                { label: "Urgent", value: "urgent" },
              ]}
            />
            {/* Branch */}
            <FormSelect
              disabled={isLoading}
              options={data?.data.map((branch: any) => ({ value: branch.id.toString(), label: branch.name }))}
              label={t("CHOOSE THE BRANCH")}
              name="branch_id"
              className="mt-4"
            />
            {/* Salary */}
            <FormFlexContainer title={t("Salary")}>
              <FormSelect label={t("CURRENCY")} name="currency" options={CURRENCY_OPTIONS} />
              <FormInput control={form.control} name="min_salary" currency label={t("Min Salary")} type="number" />
              <FormInput control={form.control} name="max_salary" currency label={t("Max Salary")} type="number" />
              <FormSelect
                options={[
                  { value: "1", label: "yes" },
                  { value: "0", label: "no" },
                ]}
                className=""
                label={t("HIDE SALARy?")}
                name="hide_salary"
              />
            </FormFlexContainer>
            {/* Personal Data */}
            <FormFlexContainer title={t("Personal Data")}>
              <ComboboxForm
                optional
                disabled={loadingCountries}
                name={"nationality_id"}
                label={t("nationality")}
                placeholder={t("nationality")}
                options={[
                  { label: "Not Specified", value: " " },
                  ...(countries?.data || []).reverse().map((country: any) => ({
                    label: country.title,
                    value: country.id,
                  })),
                ]}
              />
              <FormSelect
                label={t("Gender")}
                name="gender"
                optional={true}
                options={[...GENDER, { label: "Not Specified", value: " " }]}
              />
              <FormSelect label={t("Family Status")} name="family_status" optional options={FAMILYSTATUS} />
            </FormFlexContainer>
            {/* Benefits */}
            <div className=" mt-5 flex flex-col">
              <MiniTitle size="md" boldness="bold" text={t("Benefits")} />
              <div className="">
                {fields.map((field, index) => (
                  <div className="flex items-center gap-4 " key={field.id}>
                    <FormInput control={form.control} name={`benefits.${index}`} placeholder={t("Add Benefit")} />
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
                  <FunctionalButton size="sm" btnText={t("Add Benefit")} onClick={() => append("")} />
                </div>
              </div>
            </div>
            {/* Description & Responsibility */}
            <MiniTitle size="md" boldness="bold" text={t("Description & Responsibility")} />
            <FormInput
              control={form.control}
              label={t("Description")}
              name="job_description"
              placeholder={t("Description")}
              area
            />
            <FormInput
              control={form.control}
              label={t("Responsibility")}
              name="job_requirements"
              placeholder={t("Responsibility")}
              area
            />
            <div className=" flex flex-col bg-gray-100 mt-4 rounded-md p-5">
              <RadioGroupForm
                name="recipient_status"
                options={[
                  {
                    title: "No Send",
                    desc: "Candidate will apply job using jobpilot & all application will show on your dashboard.",
                    value: "no-send",
                  },
                  {
                    title: "Daily",
                    desc: "Candidate apply job on your website, all application on your own website.",
                    value: "daily",
                  },
                  {
                    title: "Weekly",
                    desc: "Candidate apply job on your email address, and all application in your email.",
                    value: "weekly",
                  },
                ]}
              />
            </div>
            <div className=" h-14">
              <AnimatePresence>
                {form.getValues("recipient_status") && form.getValues("recipient_status") !== "no-send" && (
                  <MotionItem
                    nohover
                    initial={{ opacity: 0, height: 100 }}
                    animate={{ opacity: 1, height: 0 }}
                    exit={{ opacity: 0, height: 100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FormInput control={form.control} name="recipient_email" placeholder={t("email")} />
                  </MotionItem>
                )}
              </AnimatePresence>
            </div>
            <div className=" mt-5 w-fit">
              <FunctionalButton
                icon={defaultData ? <UpdateIcon /> : <PlusCircle />}
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="  capitalize w-fit"
                btnText={defaultData ? t("update Job") : t("post Job")}
                size="sm"
              />
            </div>{" "}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostJob;
