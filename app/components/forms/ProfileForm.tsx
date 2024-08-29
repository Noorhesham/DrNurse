"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "./FormInput";
import FunctionalButton from "../FunctionalButton";
import { MessageCircleWarningIcon, XIcon } from "lucide-react";
import FormSelect from "./FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../MiniTitle";
import { RadioGroupForm } from "./RadioGroup";
import FileUpload from "./FileUpload";

const jobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  careerType: z.string().min(1, "Career Type is required"),
  specialty: z.string().min(1, "Specialty is required"),
  careerLevel: z.string().min(1, "Career Level is required"),
  experienceFrom: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid start date",
  }),
  experienceTo: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid end date",
  }),
  branch: z.string().min(1, "Branch is required"),
  minSalary: z.union([z.string().min(1, "Min Salary is required"), z.number()]),
  maxSalary: z.union([z.string().min(1, "Max Salary is required"), z.number()]),
  expectedSalary: z.union([z.string().min(1, "Expected Salary is required"), z.number()]),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  familyStatus: z.string().min(1, "Family Status is required"),
  currentAddress: z.string().min(1, "Current Address is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  employmentAvailability: z.string().min(1, "Employment Availability is required"),
  employmentStart: z.date().optional(),
  licenseActive: z.string().min(1, "Active License status is required"),
  licenseNumber: z.string().optional(),
  benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
  description: z.string().min(20, "Description is too short"),
  responsibility: z.string().min(20, "Responsibility is too short"),
  education: z
    .array(
      z.object({
        university: z.string().min(1, "University Name is required"),
        degree: z.string().min(1, "Degree is required"),
        country: z.string().min(1, "Country is required"),
        specialty: z.string().min(1, "Specialty is required"),
        date: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid date",
        }),
        certificate: z.string().optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        hospital: z.string().min(1, "Hospital Name is required"),
        country: z.string().min(1, "Country is required"),
        specialty: z.string().min(1, "Specialty is required"),
        dateFrom: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid start date",
        }),
        dateTo: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid end date",
        }),
        about: z.string().optional(),
      })
    )
    .optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const ProfileForm = () => {
  const t = useTranslations();
  const form = useZodForm({
    schema: jobSchema,
    defaultValues: {
      jobTitle: "",
      careerType: "",
      specialty: "",
      careerLevel: "",
      experienceFrom: new Date(),
      experienceTo: new Date(),
      branch: "",
      minSalary: 0,
      maxSalary: 0,
      expectedSalary: 0,
      nationality: "",
      gender: "",
      familyStatus: "",
      currentAddress: "",
      country: "",
      city: "",
      area: "",
      employmentAvailability: "",
      employmentStart: new Date(),
      licenseActive: "",
      licenseNumber: "",
      description: "",
      responsibility: "",
      education: [{ university: "", degree: "", country: "", specialty: "", date: new Date(), certificate: "" }],
      experience: [{ hospital: "", country: "", specialty: "", dateFrom: new Date(), dateTo: new Date(), about: "" }],
    },
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

  const onSubmit = (data: JobFormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle text={t("ProfileForm")} />
        {/* Career Details */}
        <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
          <FormSelect label={t("Career Type")} name="careerType" />
          <FormSelect label={t("Specialty")} name="specialty" />
          <FormSelect label={t("Career Level")} name="careerLevel" />
        </div>
        {/* Job Title */}
        <FormInput control={form.control} name="jobTitle" label={t("Job Title")} placeholder={t("Enter Job Title")} />
        {/* Personal Data */}
        <div className="flex md:flex-col  lg:flex-row w-full items-center gap-2">
          <FormSelect label={t("Family Status")} name="familyStatus" />
          <FormSelect label={t("Gender")} name="gender" />
          <FormSelect label={t("nationality")} name="nationality" />
        </div>
        {/* Address */}
        <h4 className="mt-4 font-semibold">{t("Current Address")}</h4>
        <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
          <FormSelect label={t("Country")} name="country" />
          <FormSelect label={t("City")} name="city" />
          <FormSelect label={t("Area")} name="area" />
        </div>
        <FormInput control={form.control} name="currentAddress" label={t("Address")} placeholder={t("Enter Address")} />
        {/* Employment Availability */}
        <h4 className="mt-4 font-semibold">{t("Available for Employment")}</h4>
        <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
          <FormSelect
            label={t("Are you available for employment now?")}
            name="employmentAvailability"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
          <FormInput control={form.control} name="employmentStart" label={t("Start From")} date />
          <FormInput control={form.control} name="employmentEnd" label={t("End Date")} date />
        </div>
        {/* License */}
        <h4 className="mt-4 font-semibold">{t("Active License")}</h4>
        <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
          <FormSelect
            label={t("Do you have an active license?")}
            name="licenseActive"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
          <FormInput
            control={form.control}
            name="licenseNumber"
            label={t("License Number")}
            placeholder={t("Enter License Number")}
          />
        </div>
        {/* Salary */}
        <h4 className="mt-4 font-semibold">{t("Salary")}</h4>
        <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
          <FormInput control={form.control} name="minSalary" currency label={t("Min Salary (USD)")} type="number" />
          <FormInput control={form.control} name="maxSalary" currency label={t("Max Salary (USD)")} type="number" />
          <FormInput
            control={form.control}
            name="expectedSalary"
            currency
            label={t("Expected Salary (USD)")}
            type="number"
          />
        </div>
        <p className=" text-red-500 text-sm font-semibold flex gap-1 items-center">
          <MessageCircleWarningIcon />A misleading salary will cause you to lose exposure in many jobs.
        </p>
        {/* Description */}
        <FormInput
          area
          control={form.control}
          name="description"
          label={t("Description")}
          placeholder={t("Enter Description")}
        />
        {/* Education */}
        <h4 className="mt-4 font-semibold">{t("Education")}</h4>
        {educationFields.map((field, index) => (
          <div>
            <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
              <FormInput control={form.control} name={`education.${index}.university`} label={t("University")} />
              <FormInput control={form.control} name={`education.${index}.degree`} label={t("Degree")} />
            </div>
            <div key={field.id} className="border flex items-center gap-2  bg-gray-100 rounded p-2 mb-2">
              <FormInput control={form.control} name={`education.${index}.country`} select label={t("Country")} />
              <FormInput control={form.control} name={`education.${index}.specialty`} select label={t("Specialty")} />
              <FormInput control={form.control} name={`education.${index}.date`} label={t("Date")} date />
              <FormInput control={form.control} name={`education.${index}.certificate`} label={t("Certificate")} />
              <button type="button" onClick={() => removeEducation(index)}>
                {t("Remove")}
              </button>
            </div>
          </div>
        ))}
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={t("Add Education")}
            onClick={() =>
              appendEducation({
                university: "",
                degree: "",
                country: "",
                specialty: "",
                date: new Date(),
                certificate: "",
              })
            }
          />
        </div>
        {/* Experience */}
        <h4 className="mt-4 font-semibold">{t("Experience")}</h4>
        {experienceFields.map((field, index) => (
          <div>
            <div className="flex md:flex-col lg:flex-row w-full items-center gap-2">
              <FormInput control={form.control} name={`experience.${index}.hospital`} label={t("Hospital")} />
              <FormInput control={form.control} name={`experience.${index}.country`} label={t("Country")} />
              <FormInput control={form.control} name={`experience.${index}.specialty`} label={t("Specialty")} />
            </div>
            <div key={field.id} className="border  bg-gray-100 rounded p-2 mb-2">
              <FormInput control={form.control} name={`experience.${index}.dateFrom`} label={t("Start Date")} date />
              <FormInput control={form.control} name={`experience.${index}.about`} label={t("Description")} />
              <button type="button" onClick={() => removeExperience(index)}>
                {t("Remove")}
              </button>
            </div>
          </div>
        ))}
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={t("Add Experience")}
            onClick={() =>
              appendExperience({
                hospital: "",
                country: "",
                specialty: "",
                dateFrom: new Date(),
                dateTo: new Date(),
                about: "",
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className=" col-span-1">
            <FileUpload label={t("Upload Practice license ")} name="logo" />
          </div>

          <div className=" col-span-1">
            <FileUpload label={t("Upload CV/Resume")} name="video" />
          </div>
          <div className=" col-span-1">
            <FileUpload label={t("Upload Identification card")} name="video" />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-4 w-fit ">
          <FunctionalButton
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            btnText={t("Post Job")}
            type="submit"
            className="w-full"
          />
        </div>{" "}
      </form>
    </Form>
  );
};

export default ProfileForm;
