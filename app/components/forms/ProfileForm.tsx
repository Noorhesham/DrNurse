"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { MessageCircleWarningIcon, XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import { RadioGroupForm } from "../inputsForm/RadioGroup";
import FileUpload from "../inputsForm/FileUpload";
import FlexWrapper from "../defaults/FlexWrapper";
import { CURRENCY_OPTIONS } from "@/app/constants";
import CountriesInput from "../inputsForm/CountriesInput";
import CareerInput, { useGetEntities } from "../inputsForm/CareerTypeInput";
import { useGetEntity } from "@/lib/queries";
import ComboboxForm from "../inputsForm/ComboboxForm";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";

const jobSchema = z.object({
  current_job_title: z.string().min(1, "Job title is required"),
  career_type_id: z.union([z.string().min(1, "Career Type is required"), z.number()]),
  career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
  career_level_id: z.union([z.string().min(1, "Career Level is required"), z.number()]),
  experienceFrom: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid start date",
  }),
  experienceTo: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid end date",
  }),

  min_salary: z.union([z.string().min(1, "Min Salary is required"), z.number().min(1, "Min salary is required")]),
  max_salary: z.union([z.string().min(1, "Max Salary is required"), z.number().min(1, "Min salary is required")]),
  show_expected_salary: z.union([z.string().min(1, "Expected Salary is required"), z.number().min(1, "required")]),
  nationality_id: z.union([z.string().min(1, "Nationality Salary is required"), z.number().min(1, "required")]),
  gender: z.string().min(1, "Gender is required"),
  family_status: z.string().min(1, "Family Status is required"),
  currentAddress: z.string().min(1, "Current Address is required"),
  current_location_id: z.union([z.string().min(1, "Country is required"), z.number()]),
  city_id: z.union([z.string().min(1, "City is required"), z.number()]),
  state_id: z.union([z.string().min(1, "State is required"), z.number()]),
  available: z.string().min(1, "Employment Availability is required"),
  start_availability_at: z.date().optional(),
  active_license_country: z.string().min(1, "Active License status is required"),
  license_number: z.string().optional(),
  benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
  description: z.string().min(20, "Description is too short"),

  main_education: z.object({
    university_name: z.string().min(1, "University Name is required"),
    country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
    career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
    date: z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date",
    }),
  }),
  education: z
    .array(
      z.object({
        country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
        career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
        date: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid date",
        }),
        certificate_name: z.string().optional(),
        training_center: z.string().optional(),
        career_level_id: z.union([z.string(), z.number()]),
        certificate: z.any().optional(),
      })
    )
    .optional(),

  previous_experience: z
    .array(
      z.object({
        name: z.string().min(1, "Hospital Name is required"),
        country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
        career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
        from: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid start date",
        }),
        to: z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Invalid end date",
        }),
        about: z.string().optional(),
        career_level_id: z.union([z.string(), z.number()]),
      })
    )
    .optional(),
  currency: z.string().min(1, "Currency is required"),
  practice_license: z.any().optional(),
  identification_card: z.any(),
  resume: z.any(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const ProfileForm = () => {
  const [isPending, startTransition] = useTransition();
  const { data: countries, isLoading } = useGetEntity("countries", "countries");
  const { data: careerTypes, isLoading: loadingCareerTypes } = useGetEntities({
    resourceName: "getEntity",
    key: "career-types",
    entityName: "career-types",
  });
  const t = useTranslations();
  const form = useZodForm({
    schema: jobSchema,
    defaultValues: {
      current_job_title: "",
      career_type_id: "",
      career_specialty_id: "",
      career_level_id: "",
      experienceFrom: new Date(),
      experienceTo: new Date(),

      min_salary: 0,
      max_salary: 0,
      show_expected_salary: 0,
      nationality_id: "",
      gender: "",
      family_status: "",
      currentAddress: "",
      current_location_id: "",
      city_id: "",
      state_id: "",
      available: "",
      start_availability_at: new Date(),
      active_license_country: "",
      license_number: "",
      description: "",

      education: [
        {
          certificate_name: "",
          training_center: "",
          country_id: "",
          career_level_id: "",
          career_specialty_id: "",
          date: new Date(),
          certificate: "",
        },
      ],
      previous_experience: [
        {
          name: "",
          country_id: "",
          career_level_id: "",
          career_specialty_id: "",
          from: new Date(),
          to: new Date(),
          about: "",
        },
      ],
      currency: "USD",
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
    name: "previous_experience",
  });

  const onSubmit = (data: JobFormValues) => {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key as keyof JobFormValues];

        if (value instanceof Array) {
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              for (const nestedKey in item) {
                formData.append(`${key}[${index}][${nestedKey}]`, item[nestedKey]);
              }
            } else {
              formData.append(`${key}[]`, item);
            }
          });
        } else if (typeof value === "object" && value !== null && !(value instanceof File)) {
          // If the value is an object, but not a file, iterate through its properties
          for (const nestedKey in value) {
            formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
          }
        } else {
          // If the value is a file (Blob/File)
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      }
    }
    console.log("Form Submitted", data);
    startTransition(async () => {
      const res = await Server({
        resourceName: "add-profile",
        body: formData,
        formData: true,
      });
      console.log(res)
      if (res.status) toast.success(res.message);
      else toast.error(res.message);
    });
  };
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle size="md" boldness="bold" text={t("ProfileForm")} />
        {/* Career Details */}
        <CareerInput
          loadingCareerTypes={loadingCareerTypes}
          careerTypes={careerTypes}
          careerLevel="career_level_id"
          careerSpecialty="career_specialty_id"
          careerType="career_type_id"
        />
        {/* Job Title */}
        <FormInput
          control={form.control}
          name="current_job_title"
          label={t("Job Title")}
          placeholder={t("Enter Job Title")}
        />
        {/* Personal Data */}
        <FlexWrapper max={false}>
          <FormSelect
            label={t("Family Status")}
            options={[
              { label: "Married", value: "married" },
              { label: "Single", value: "single" },
              { label: "Divorced", value: "divorced" },
              { label: "Other", value: "other" },
              { label: "Widow", value: "widow" },
            ]}
            name="family_status"
          />
          <FormSelect
            label={t("Gender")}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            name="gender"
          />

          <ComboboxForm
            disabled={isLoading}
            name={"nationality_id"}
            label={t("nationality")}
            placeholder={t("nationality")}
            options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
          />
        </FlexWrapper>
        {/* Address */}
        <h4 className="mt-4 font-semibold">{t("Current Address")}</h4>
        <CountriesInput countryName="current_location_id" stateName="state_id" cityName="city_id" />
        <FormInput control={form.control} name="currentAddress" label={t("Address")} placeholder={t("Enter Address")} />
        {/* Employment Availability */}
        <MiniTitle size="md" boldness="bold" text={t("Available for Employment")} />
        <FlexWrapper className=" items-center" max={false}>
          <FormSelect
            label={t("Are you available for employment now?")}
            name="available"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Yes From Time", value: "yes from custom time" },
            ]}
          />
          {form.getValues("available") === "Yes From Time" && (
            <FormInput control={form.control} name="start_availability_at" label={t("Start From")} date />
          )}
        </FlexWrapper>
        {/* License */}
        <h4 className="mt-4 font-semibold">{t("Active License")}</h4>
        <FlexWrapper max={false}>
          <FormSelect
            label={t("Do you have an active license?")}
            name="active_license_country"
            options={[
              { label: "No", value: "no" },
              { label: "Saudi Arabia", value: "saudi_arabia" },
              { label: "UAE", value: "uae" },
              { label: "Qatar ", value: "qatar" },
              { label: "Kuwait ", value: "kuwait" },
              { label: "Bahrain ", value: "bahrain" },
              { label: "United Kingdom", value: "united_kingdom" },
              {
                label: "United States of America",
                value: "united_states_of_america",
              },
              { label: "Canada ", value: "canada" },
              { label: "Australia", value: "australia" },
            ]}
          />
          <FormInput
            control={form.control}
            name="license_number"
            label={t("License Number")}
            placeholder={t("Enter License Number")}
          />
        </FlexWrapper>
        {/* Salary */}
        <MiniTitle size="md" boldness="bold" text={t("Salary")} />
        <FlexWrapper max={false}>
          <FormInput control={form.control} name="min_salary" currency label={t("Min Salary (USD)")} type="number" />
          <FormInput control={form.control} name="max_salary" currency label={t("Max Salary (USD)")} type="number" />
          <FormSelect
            label={t("Show Expected Salary (USD)")}
            name="show_expected_salary"
            options={[
              { label: "No", value: "0" },
              { label: "Yes", value: "1" },
            ]}
          />
          <FormSelect label={t("Currency")} name="currency" options={CURRENCY_OPTIONS} />
        </FlexWrapper>
        <p className=" text-red-500 mb-4 text-sm font-semibold flex gap-1 items-center">
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
        <div className=" flex flex-col gap-2 mt-4">
          <MiniTitle size="md" boldness="bold" text={t("Education")} />
          <FlexWrapper max={false}>
            <FormInput
              control={form.control}
              name="main_education.university_name"
              label={t("University")}
              placeholder={t("Enter University Name")}
            />
            <ComboboxForm
              name="main_education.country_id"
              label={t("Country")}
              disabled={isLoading}
              placeholder={t("nationality")}
              options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
            />
            <CareerInput
              disabled={!form.getValues("career_type_id")}
              loadingCareerTypes={loadingCareerTypes}
              careerTypes={careerTypes}
              careerLevel=""
              careerSpecialty="main_education.career_specialty_id"
              careerType="career_type_id"
              onlySpeciality
            />{" "}
            <FormInput control={form.control} name={`main_education.date`} label={t("Date")} date />
          </FlexWrapper>

          {educationFields.map((field, index) => (
            <div key={field.id} className=" bg-gray-100 rounded p-2 mb-2">
              <FlexWrapper
                max={false}
                key={field.id}
                className=" flex items-center gap-2  bg-gray-100 rounded p-2 mb-2"
              >
                {" "}
                <FormInput
                  control={form.control}
                  name={`education.${index}.certificate_name`}
                  label={t("Bachelor's/Master/Board certificate Name")}
                />
                <FormInput
                  control={form.control}
                  name={`education.${index}.training_center`}
                  label={t("Training Center")}
                />{" "}
              </FlexWrapper>
              <FlexWrapper
                max={false}
                key={field.id}
                className=" flex items-center gap-2  bg-gray-100 rounded p-2 mb-2"
              >
                <ComboboxForm
                  name={`education.${index}.country_id`}
                  label={t("Country")}
                  disabled={isLoading}
                  placeholder={t("nationality")}
                  options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
                />
                <CareerInput
                  onlySpeciality
                  disabled={form.getValues("career_type_id") === ""}
                  loadingCareerTypes={loadingCareerTypes}
                  careerTypes={careerTypes}
                  careerLevel={`education.${index}.career_level_id`}
                  careerSpecialty={`education.${index}.career_specialty_id`}
                  careerType="career_type_id"
                />
                <FormInput control={form.control} name={`education.${index}.date`} label={t("Date")} date />

                <FileUpload noicon={true} label={t("Upload certificate")} name={`education.${index}.certificate`} />
                <button
                  className=" border-2  rounded-lg p-1  mt-auto border-gray-800 justify-end"
                  type="button"
                  onClick={() => removeEducation(index)}
                >
                  <XIcon />
                </button>
              </FlexWrapper>
            </div>
          ))}
        </div>
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={t("Add Education")}
            onClick={() =>
              appendEducation({
                specialty: "",
                date: new Date(),
                certificate: "",
              })
            }
          />
        </div>
        {/* Experience */}
        <MiniTitle size="md" boldness="bold" text={t("Experience")} />
        {experienceFields.map((field, index) => (
          <div className=" flex flex-col gap-2">
            <FlexWrapper max={false}>
              <FormInput control={form.control} name={`previous_experience.${index}.name`} label={t("Hospital")} />
              <ComboboxForm
                name={`previous_experience.${index}.country_id`}
                label={t("Country")}
                disabled={isLoading}
                placeholder={t("Country")}
                options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
              />{" "}
              <CareerInput
                onlySpeciality
                disabled={form.getValues("career_type_id") === ""}
                loadingCareerTypes={loadingCareerTypes}
                careerTypes={careerTypes}
                careerLevel={`previous_experience.${index}.career_level_id`}
                careerSpecialty={`previous_experience.${index}.career_specialty_id`}
                careerType="career_type_id"
              />
            </FlexWrapper>
            <FlexWrapper max={false} key={field.id} className="border  bg-gray-100 rounded p-2 mb-2">
              <FormInput
                control={form.control}
                name={`previous_experience.${index}.from`}
                label={t("Start Date")}
                date
              />
              <FormInput control={form.control} name={`previous_experience.${index}.to`} label={t("End Date")} date />
              <FormInput control={form.control} name={`previous_experience.${index}.about`} label={t("Description")} />

              <button
                className=" border-2  rounded-lg p-1  mt-auto border-gray-800 justify-end"
                type="button"
                onClick={() => removeExperience(index)}
              >
                <XIcon />
              </button>
            </FlexWrapper>
          </div>
        ))}
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={t("Add Experience")}
            onClick={() =>
              appendExperience({
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
            <FileUpload label={t("Upload Practice license ")} name="practice_license" />
          </div>

          <div className=" col-span-1">
            <FileUpload label={t("Upload CV/Resume")} name="resume" />
          </div>
          <div className=" col-span-1">
            <FileUpload label={t("Upload Identification card")} name="identification_card" />
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
