"use client";

import { useZodForm } from "@/app/hooks/useZodForm";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import { RadioGroupForm } from "../inputsForm/RadioGroup";
import FormFlexContainer from "./FormFlexContainer";
import GridContainer from "../defaults/GridContainer";
import { AnimatePresence } from "framer-motion";
import MotionContainer from "../defaults/MotionContainer";
import ComboboxForm from "../inputsForm/ComboboxForm";
import MotionItem from "../defaults/MotionItem";
import { CURRENCY_OPTIONS, FAMILYSTATUS, GENDER } from "@/app/constants";
import CareerInput, { useGetEntities } from "../inputsForm/CareerTypeInput";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useGetEntity } from "@/lib/queries";
import { useParams, useRouter } from "next/navigation";
// Define Zod schema
const jobSchema = z
  .object({
    job_title: z.string().min(1, "Job title is required"),
    career_type_id: z.union([z.string().min(1, "Career Type is required"), z.number()]),
    career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
    career_level_id: z.union([z.string().min(1, "Career Level is required"), z.number()]),
    experience_from: z.union([z.string().min(1, "Experience From is required"), z.number()]),
    experience_to: z.union([z.string().min(1, " Experience To is required"), z.number()]),
    branch_id: z.string().min(1, "Branch is required"),
    min_salary: z.union([z.string().min(1, "Min Salary is required"), z.number()]),
    max_salary: z.union([z.string().min(1, "Max Salary is required"), z.number()]),
    hide_salary: z.string().min(1, "Hide Salary? is required"),
    nationality_id: z.union([z.string().min(1, "Nationality is required"), z.number()]),
    gender: z.string().min(1, "Gender is required"),
    family_status: z.string().min(1, "Family Status is required"),
    benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
    job_description: z.string().min(20, "Description is too short").optional(),
    job_requirements: z.string().min(20, "Responsibility is too short").optional(),
    recipient_status: z.string().optional(),
    recipient_email: z.string().optional(),
    currency: z.string(),
  })
  .refine((data) => +data.experience_from < +data.experience_to, {
    message: "'Experience From' date must be earlier than 'Experience To' date",
    path: ["experience_to"],
  })
  .refine((data) => Number(data.min_salary) < Number(data.max_salary), {
    message: "'Min Salary' must be less than 'Max Salary'",
    path: ["max_salary"],
  });

type JobFormValues = z.infer<typeof jobSchema>;

const PostJob = ({ defaultData }: { defaultData?: any }) => {
  console.log(defaultData);

  const { id } = useParams();
  const t = useTranslations();
  const locale = useLocale();
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
      nationality_id: defaultData?.nationality.id || "",
      gender: defaultData?.gender || "",
      family_status: defaultData?.family_status || "",
      benefits: JSON.parse(defaultData?.benefits || "[]") || [" "],
      job_description: defaultData?.job_description || "",
      job_requirements: defaultData?.job_requirements || "",
      currency: defaultData?.currency || "sar",
      recipient_status: defaultData?.recipient_status || "",
      recipient_email: defaultData?.recipient_email || "",
    },
  });

  const queryClient = useQueryClient();
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: "benefits",
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = (data: JobFormValues) => {
    console.log("Form Submitted", data);
    startTransition(async () => {
      const res = defaultData?.id
        ? await Server({
            resourceName: "update-job",
            body: data,
            id: defaultData?.id || "",
          })
        : await Server({
            resourceName: "add-job",
            body: data,
          });

      console.log(res);
      if (res.status) {
        defaultData?.id
          ? queryClient.invalidateQueries({ queryKey: [`job-${defaultData.id}`] })
          : router.push(`/dashboard/${id}/jobs`);
        queryClient.invalidateQueries({ queryKey: [`company-overview-${id}`] });
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  console.log(data);
  return (
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
            <FormInput control={form.control} name="experience_from" label={t("experience_from")} type="number" />
            <FormInput control={form.control} name="experience_to" label={t("experience_to")} type="number" />
          </GridContainer>
          {/* Branch */}
          <FormSelect
            disabled={isLoading}
            options={data?.data.map((branch: any) => ({ value: branch.id.toString(), label: branch.name }))}
            label={t("Choose the Branch")}
            name="branch_id"
            className="mt-4"
          />
          {/* Salary */}
          <FormFlexContainer title={t("Salary")}>
            <FormInput control={form.control} name="min_salary" currency label={t("Min Salary (USD)")} type="number" />
            <FormInput control={form.control} name="max_salary" currency label={t("Max Salary (USD)")} type="number" />
            <FormSelect label={t("Currency")} name="currency" options={CURRENCY_OPTIONS} />
            <FormSelect
              options={[
                { value: "1", label: "yes" },
                { value: "0", label: "no" },
              ]}
              label={t("Hide Salary?")}
              name="hide_salary"
            />
          </FormFlexContainer>
          {/* Personal Data */}
          <FormFlexContainer title={t("Personal Data")}>
            <ComboboxForm
              disabled={loadingCountries}
              name={"nationality_id"}
              label={t("nationality")}
              placeholder={t("nationality")}
              options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
            />
            <FormSelect label={t("Gender")} name="gender" options={GENDER} />
            <FormSelect label={t("Family Status")} name="family_status" options={FAMILYSTATUS} />
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
          <div className=" w-fit">
            <FunctionalButton
              disabled={isPending}
              onClick={form.handleSubmit(onSubmit)}
              className=" w-fit"
              btnText={t("postJob")}
              size="sm"
            />
          </div>{" "}
        </div>
      </form>
    </Form>
  );
};

export default PostJob;
