"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "./inputsForm/FormInput";
import FunctionalButton from "./FunctionalButton";
import { MessageCircleWarningIcon, XIcon } from "lucide-react";
import FormSelect from "./inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "./defaults/MiniTitle";

import FlexWrapper from "./defaults/FlexWrapper";
import { CURRENCY_OPTIONS, FAMILYSTATUS } from "@/app/constants";
import ComboboxForm from "./inputsForm/ComboboxForm";
import { toast } from "react-toastify";
import { useDevice } from "../context/DeviceContext";
import { Server } from "../main/Server";
const fetchLibrary = async (lang = "en") => {
  const { default: library } = await import("i18n-iso-countries");
  const localeImport =
    lang === "ar" ? await import("i18n-iso-countries/langs/ar.json") : await import("i18n-iso-countries/langs/en.json");
  library.registerLocale(localeImport);
  return library;
};

const jobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  careerType: z.string().min(1, "Career Type is required"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  familyStatus: z.string().min(1, "Family Status is required"),
  minSalary: z.union([z.string().min(1, "Min Salary is required"), z.number()]),
  maxSalary: z.union([z.string().min(1, "Max Salary is required"), z.number()]),
  currentAddress: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  licenseActive: z.string().optional(),
  licenseNumber: z.string().optional(),
  aboutme: z.string().optional(),
  university: z.string().min(1, "University Name is required"), // Moved outside the array
  universityCountry: z.string().min(1, "University Country is required"),
  universityDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
  universitySpecialty: z.string().min(1, "University Specialty is required"),
  education: z
    .array(
      z.object({
        country: z.string().optional(),
        specialty: z.string().optional(),
        date: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid date",
        }),
        certificate: z.string().optional(),
        center: z.string().optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        hospital: z.string().optional(),
        country: z.string().optional(),
        specialty: z.string().optional(),
        date: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid start date",
        }),

        about: z.string().optional(),
      })
    )
    .optional(),
  currency: z.string().min(1, "Currency is required"),
});

type JobFormValues = z.infer<typeof jobSchema>;

const Profile2 = () => {
  const t = useTranslations();
  const form = useZodForm({
    schema: jobSchema,
    defaultValues: {
      education: [{ country: "", specialty: "", date: new Date(), certificate: "" }],
      experience: [{ hospital: "", country: "", specialty: "", date: new Date(), about: "" }],
      currency: "USD",
    },
    mode: "onChange",
  });

  const {
    append: appendEducation,
    remove: removeEducation,
    fields: educationFields,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    append: appendExperience,
    remove: removeExperience,
    fields: experienceFields,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const { device_info } = useDevice();
  const onSubmit = async (data: JobFormValues) => {
    console.log("Form Submitted", data);
    const res = await Server({
      resourceName: "postgeneralForm",

      body: data,
    });
    if (res.status) toast.success(res.message);
    else toast.error(res.message);
  };
  const [nationalities, setNationalities] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    fetchLibrary("en").then((library) => {
      const countries = library.getNames("en");
      const options = Object.entries(countries).map(([value, label]) => ({ value, label }));
      setNationalities(options);
    });
  }, []);
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle size="md" boldness="bold" text="profile" />
        {/* Career Details */}
        <FlexWrapper max={false}>
          <FormSelect
            label="Career Type"
            options={[{ label: "Doctor Nurse Health Specialist", value: "Doctor Nurse Health Specialist" }]}
            name="careerType"
          />
        </FlexWrapper>
        {/* Job Title */}
        <FormInput control={form.control} name="jobTitle" label="CURRENT JOB TITLE" placeholder="Enter Job Title" />
        {/* Personal Data */}
        <FlexWrapper max={false}>
          <FormSelect label="FAMILY STATUS" options={FAMILYSTATUS} name="familyStatus" />
          <FormSelect
            label="GENDER"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            name="gender"
          />
        </FlexWrapper>
        <ComboboxForm placeholder="Choose Nationality" label="Nationality" name="nationality" options={nationalities} />
        {/* Address */}
        <h4 className="mt-4 font-semibold">"Current Address"</h4>
        <ComboboxForm placeholder="Choose Country" label="Country" name={`country`} options={nationalities} />
        <FormInput control={form.control} name="currentAddress" label="Address" placeholder="Enter Address" />
        {/* Employment Availability */}
        <MiniTitle size="md" boldness="bold" text="Available for Employment" />
        {/* License */}
        <h4 className="mt-4 font-semibold">Active License</h4>
        <FlexWrapper max={false}>
          <FormSelect
            label="Do you have an active license?"
            name="licenseActive"
            options={[
              { label: "Saudia", value: "saudia" },
              { label: "UAE", value: "UAE" },
              { label: "Canada", value: "canada" },
              { label: "America", value: "america" },
              { label: "Australia", value: "america" },
            ]}
          />
          {form.watch("licenseActive") !== "no" && (
            <FormInput
              control={form.control}
              name="licenseNumber"
              label="License Number"
              type="number"
              placeholder="Enter License Number"
            />
          )}
        </FlexWrapper>
        {/* Salary */}
        <MiniTitle size="md" boldness="bold" text="Salary" />
        <FlexWrapper max={false}>
          <FormInput control={form.control} name="minSalary" label="Min Salary (USD)" type="number" />
          <FormInput control={form.control} name="maxSalary" label="Max Salary (USD)" type="number" />

          <FormSelect label="Currency" name="currency" options={CURRENCY_OPTIONS} />
        </FlexWrapper>
        <p className=" text-red-500 mb-4 text-sm font-semibold flex gap-1 items-center">
          <MessageCircleWarningIcon />A misleading salary will cause you to lose exposure in many jobs.
        </p>
        {/* Description */}
        <MiniTitle size="md" boldness="bold" text="Description & Responsibility" />
        <FormInput area control={form.control} name="aboutme" label="ABOUT ME" placeholder="Enter Description" />
        <div className=" flex flex-col gap-2 mt-4">
          <MiniTitle size="md" boldness="bold" text="Education" />
          <FlexWrapper max={false} className=" w-full items-start">
            <FormInput
              className=" w-full"
              control={form.control}
              name="university"
              label="University"
              placeholder="Enter University Name"
            />{" "}
            <ComboboxForm
              placeholder="Choose Country"
              label="Country"
              name={`universityCountry`}
              options={nationalities}
            />
            <FormSelect
              name="universitySpecialty"
              options={[{ label: "Doctor Nurse Health Specialist", value: "Doctor Nurse Health Specialist" }]}
              label="SPECIALITY"
            />
            <FormInput control={form.control} name={`universityDate`} label="Date" date />
          </FlexWrapper>
          {/* Career Details */}
          {educationFields.map((field, index) => (
            <div className="border  flex items-start gap-2  bg-gray-100 rounded  px-4 py-4 mb-2">
              <div className=" flex-col flex gap-4  w-full">
                <FlexWrapper max={false} key={field.id} className=" items-center w-full">
                  <FormInput
                    control={form.control}
                    name={`education.${index}.certificate`}
                    label="Bachelor's/Master/Board certificate Name"
                  />
                  <FormInput control={form.control} name={`education.${index}.center`} label="training center" />
                </FlexWrapper>
                <FlexWrapper className=" w-full" max={false}>
                  <ComboboxForm
                    placeholder="Choose Country"
                    label="Country"
                    name={`education.${index}.country`}
                    options={nationalities}
                  />
                  <FormSelect
                    name={`education.${index}.specialty`}
                    options={[{ label: "Doctor Nurse Health Specialist", value: "Doctor Nurse Health Specialist" }]}
                    label="SPECIALITY"
                  />{" "}
                  <FormInput control={form.control} name={`education.${index}.date`} label="Date" date />
                </FlexWrapper>
              </div>

              <button
                className=" border-2  rounded-lg p-1 border-gray-800 justify-end"
                type="button"
                onClick={() => removeEducation(index)}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText="Add Education"
            onClick={() =>
              appendEducation({
                country: "",
                specialty: "",
                date: new Date(),
                certificate: "",
              })
            }
          />
        </div>
        {/* Experience */}
        <MiniTitle size="md" boldness="bold" text="Experience" />
        {experienceFields.map((field, index) => (
          <div className=" flex flex-col gap-2">
            <div key={field.id} className="border  bg-gray-100 rounded  p-4 mb-2">
              <div className=" flex items-start w-full justify-between">
                <div className=" flex w-[95%] gap-4 flex-col items-start">
                  <FlexWrapper className=" w-full" max={false}>
                    <FormInput control={form.control} name={`experience.${index}.hospital`} label="Hospital" />
                    <ComboboxForm
                      placeholder="Choose Country"
                      label="Country"
                      name={`experience.${index}.country`}
                      options={nationalities}
                    />
                    <FormInput control={form.control} name={`experience.${index}.specialty`} label="Specialty" />
                  </FlexWrapper>
                  <FlexWrapper className=" w-full " max={false}>
                    <FormInput control={form.control} name={`experience.${index}.date`} label="Date" date />
                    <FormInput
                      control={form.control}
                      name={`experience.${index}.about`}
                      label="ABOUT CAREER (CAREER LEVEL)"
                    />
                  </FlexWrapper>
                </div>
                <button
                  className=" border-2  rounded-lg p-1 border-gray-800 justify-end"
                  type="button"
                  onClick={() => removeExperience(index)}
                >
                  <XIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText="Add Experience"
            onClick={() =>
              appendExperience({
                hospital: "",
                country: "",
                specialty: "",
                date: new Date(),

                about: "",
              })
            }
          />
        </div>
        {/* Submit Button */}
        <div className="mt-4 w-full ">
          <FunctionalButton
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            btnText="SEND"
            type="submit"
            className="w-full rounded-xl"
          />
        </div>{" "}
      </form>
    </Form>
  );
};

export default Profile2;
