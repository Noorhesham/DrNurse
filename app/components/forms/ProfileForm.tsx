"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React, { useEffect, useTransition } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { MessageCircleWarningIcon, XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import FileUpload from "../inputsForm/FileUpload";
import FlexWrapper from "../defaults/FlexWrapper";
import { CURRENCY_OPTIONS, FAMILYSTATUS, GENDER } from "@/app/constants";
import CountriesInput from "../inputsForm/CountriesInput";
import CareerInput, { useGetEntities } from "../inputsForm/CareerTypeInput";
import { useGetEntity } from "@/lib/queries";
import ComboboxForm from "../inputsForm/ComboboxForm";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { format } from "date-fns";
import { useAuth } from "@/app/context/AuthContext";

const jobSchema = z
  .object({
    current_job_title: z.string().min(1, "Job title is required"),
    career_type_id: z.union([z.string().min(1, "Career Type is required"), z.number()]),
    career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
    career_level_id: z.union([z.string().min(1, "Career Level is required"), z.number()]),
    // experienceFrom: z.string().min(1, "Start date is required"),
    // experienceTo: z.string().min(1, "End date is required"),
    min_salary: z.union([z.string().min(1, "Min Salary is required"), z.number().min(1, "Min salary is required")]),
    max_salary: z.union([z.string().min(1, "Max Salary is required"), z.number().min(1, "Min salary is required")]),
    show_expected_salary: z.union([z.string().min(1, "Expected Salary is required"), z.number().min(1, "required")]),
    nationality_id: z.union([z.string().min(1, "Nationality Salary is required"), z.number().min(1, "required")]),
    gender: z.string().min(1, "Gender is required"),
    family_status: z.string().min(1, "Family Status is required"),
    address: z.string().min(1, "Current Address is required"),
    current_location_id: z.union([z.string().min(1, "Country is required"), z.number()]),
    city_id: z.union([z.string().min(1, "City is required"), z.number()]),
    state_id: z.union([z.string().min(1, "State is required"), z.number()]),
    available: z.string().min(1, "Employment Availability is required"),
    start_availability_at: z.string().optional(),
    active_license_country: z.string().min(1, "Active License status is required"),
    license_number: z.string().optional(),
    benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
    description: z.string().min(20, "Description is too short"),

    main_education: z.object({
      university_name: z.string().min(1, "University Name is required"),
      country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
      career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
      date: z.string().min(1, " date is required"),
    }),
    education: z
      .array(
        z.object({
          country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
          career_specialty_id: z.union([z.string().min(1, "Specialty is required"), z.number()]),
          date: z.string().min(1, " date is required"),
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
          from: z.string().min(1, "START date is required"),
          to: z.string().min(1, "End date is required"),
          about: z.string().optional(),
          career_level_id: z.union([z.string().min(1, "CAEREER LEVEL is required"), z.number()]),
        })
      )
      .optional(),
    currency: z.string().min(1, "Currency is required"),
    practice_license: z.any().optional(),
    identification_card: z.any(),
    resume: z.any(),
  })
  .refine(
    (data) => {
      const minSalary = Number(data.min_salary);
      const maxSalary = Number(data.max_salary);
      return minSalary < maxSalary;
    },
    {
      message: "Minimum salary must be less than maximum salary",
      path: ["min_salary"],
    }
  );

type JobFormValues = z.infer<typeof jobSchema>;

const ProfileForm = ({ data }: { data?: any }) => {
  console.log(data);
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
      main_education: data?.main_educations?.[0] || {},
      current_job_title: data?.current_job_title || "",
      career_type_id: data?.career_type_id || "",
      career_specialty_id: data?.career_specialty_id || "",
      career_level_id: data?.career_level_id || "",

      min_salary: data?.min_salary || 0,
      max_salary: data?.max_salary || 0,
      show_expected_salary: data?.show_expected_salary.toString() || 0,
      nationality_id: data?.nationality_id || "",
      gender: data?.gender || "",
      family_status: data?.family_status || "",
      address: data?.address || "",
      current_location_id: data?.current_location_id || "",
      city_id: data?.city_id || "",
      state_id: data?.state_id || "",
      available: data?.available || "",
      start_availability_at: data?.start_availability_at || "",
      active_license_country: data?.active_license_country || "",
      license_number: data?.license_number || "",
      description: data?.description || "",
      practice_license: data?.practice_license?.[0] || "",
      identification_card: data?.identification_card?.[0] || "",
      resume: data?.resume[0] || "",
      education:
        data?.educations.length > 0
          ? [
              ...data?.educations.map((d: any) => {
                return { ...d, certificate: d.certificate[0], career_specialty_id: d.career_specialty_id || "" };
              }),
            ]
          : [
              {
                certificate_name: "",
                training_center: "",
                country_id: "",
                career_level_id: "",
                career_specialty_id: "",
                date: "",
                certificate: "",
              },
            ],
      previous_experience: data?.previous_experiences || [
        {
          name: "",
          country_id: "",
          career_level_id: "",
          career_specialty_id: "",
          from: "",
          to: "",
          about: "",
        },
      ],
      currency: data?.currency || "USD",
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

  const queryClient = useQueryClient();
  const {
    append: appendExperience,
    remove: removeExperience,
    fields: experienceFields,
  } = useFieldArray({
    control: form.control,
    name: "previous_experience",
  });
  console.log(form.getValues());
  const { setDates, setLogin } = useAuth();
  const onSubmit = (data: JobFormValues) => {
    const formData = new FormData();
    const fileFields = ["resume", "practice_license", "identification_card", "certificate"];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key as keyof JobFormValues];
        if (fileFields.includes(key) && !(value instanceof File)) {
          // Skip this field if it's not a file
          continue;
        }
        if (value instanceof Array) {
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              for (const nestedKey in item) {
                if (nestedKey === "certificate" && !(item[nestedKey] instanceof File)) continue;
                formData.append(`${key}[${index}][${nestedKey}]`, item[nestedKey]);
              }
            } else {
              formData.append(`${key}[]`, item);
            }
          });
        } else if (typeof value === "object" && value !== null && !(value instanceof File)) {
          // If the value is an object, but not a file, iterate through its properties
          for (const nestedKey in value) {
            if (value instanceof File) {
              formData.append(`${key}[${nestedKey}]`, value);
            } else {
              formData.append(`${key}[${nestedKey}]`, value as string | Blob);
            }
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
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      setDates((prevDates: any) => ({
        ...prevDates,
        last_update_date_user: "",
      }));
      setLogin((l) => !l);
      if (res.status) toast.success(res.message);
      else toast.error(res.message);
    });
  };
  useEffect(() => {
    if (form.getValues("available") === "yes") form.setValue("start_availability_at", format(Date.now(), "yyyy-MM-dd"));
  }, [form, form.getValues("available")]);
  if (isLoading) return <Spinner />;

  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle form size="md" boldness="bold" text={t("ProfileForm")} />
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
          label={t("CURRENT JOB TITLE")}
          placeholder={t("Enter Job Title")}
        />
        {/* Personal Data */}
        <FlexWrapper max={false}>
          <FormSelect label={t("Family Status")} options={FAMILYSTATUS} name="family_status" />
          <FormSelect label={t("Gender")} options={GENDER} name="gender" />
        </FlexWrapper>
        <ComboboxForm
          disabled={isLoading}
          name={"nationality_id"}
          label={t("nationality")}
          placeholder={t("nationality")}
          options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
        {/* Address */}
        <MiniTitle form size="md" boldness="bold" text={t("Current Address")} />
        <CountriesInput countryName="current_location_id" stateName="state_id" cityName="city_id" />
        <FormInput control={form.control} name="address" label="ADDRESS" placeholder={t("WRITE MAIN ADDRESS")} />
        {/* Employment Availability */}
        <MiniTitle form size="md" boldness="bold" text={t("Available for Employment")} />
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
          {form.getValues("available") === "yes from custom time" && (
            <FormInput control={form.control} name="start_availability_at" label={t("Start From")} date />
          )}
        </FlexWrapper>
        {/* License */}
        <MiniTitle form size="md" boldness="bold" text={t("Active License")} />
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
        <MiniTitle form size="md" boldness="bold" text={t("Salary")} />
        <FlexWrapper max={false}>
          <FormInput control={form.control} name="min_salary" currency label={t("Min Salary (USD)")} type="number" />
          <FormInput
            control={form.control}
            name="max_salary"
            currency
            label={t("Max Salary (USD)")}
            type="number"
          />{" "}
          <FormSelect label={t("Currency")} name="currency" options={CURRENCY_OPTIONS} />
          <FormSelect
            label={t("Show Expected Salary")}
            name="show_expected_salary"
            options={[
              { label: "No", value: "0" },
              { label: "Yes", value: "1" },
            ]}
          />
        </FlexWrapper>
        <p className=" text-red-500 mb-4 text-xs md:text-sm font-semibold flex gap-1 items-center">
          <MessageCircleWarningIcon className=" md:block hidden" />A misleading salary will cause you to lose exposure
          in many jobs.
        </p>
        {/* Description */} <MiniTitle form size="md" boldness="bold" text={t("More Info")} />
        <FormInput
          area
          control={form.control}
          name="description"
          label={t("Description")}
          placeholder={t("Enter Description")}
        />
        {/* Education */}
        <div className=" flex flex-col gap-2 mt-4">
          <MiniTitle form size="md" boldness="bold" text={t("Education")} />
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
            <div key={field.id} className=" bg-gray-100 rounded-xl mt-2 p-2 mb-2">
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
              </FlexWrapper>{" "}
              <div className="flex gap-2 px-3 py-2 items-center">
                <FormInput type="file" label={t("Upload certificate")} name={`education.${index}.certificate`} />
                <button
                  className=" border-2  rounded-lg p-1  mt-auto border-gray-800 justify-end"
                  type="button"
                  onClick={() => removeEducation(index)}
                >
                  <XIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={t("Add Education")}
            onClick={() =>
              appendEducation({
                career_specialty_id: "",
                date: "",
                certificate: "",
                certificate_name: "",
                country_id: "",
                training_center: "",
                career_level_id: "",
              })
            }
          />
        </div>
        {/* Experience */}
        <MiniTitle form size="md" boldness="bold" text={t("Experience")} />
        {experienceFields.map((field, index) => (
          <div className="border  bg-gray-100 rounded p-2 flex flex-col gap-2">
            <FlexWrapper max={false}>
              <FormInput control={form.control} name={`previous_experience.${index}.name`} label={t("Hospital")} />
              <ComboboxForm
                name={`previous_experience.${index}.country_id`}
                label={t("Country")}
                disabled={isLoading}
                placeholder={t("Country")}
                options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
              />
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
            <FlexWrapper max={false} key={field.id} className=" mb-2">
              <FormInput
                control={form.control}
                name={`previous_experience.${index}.from`}
                label={t("Start Date")}
                date
              />
              <div className="flex w-full items-center gap-2">
                <FormInput control={form.control} name={`previous_experience.${index}.to`} label={t("End Date")} date />
                <button
                  className=" border-2  rounded-lg p-1  mt-auto border-gray-800 justify-end"
                  type="button"
                  onClick={() => removeExperience(index)}
                >
                  <XIcon />
                </button>
              </div>
            </FlexWrapper>
          </div>
        ))}
        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={t("Add Experience")}
            onClick={() =>
              appendExperience({
                country_id: "",
                career_specialty_id: "",
                from: "",
                to: "",
                about: "",
                career_level_id: "",
                name: "",
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className=" col-span-1">
            <FileUpload mimeTypes={["application/pdf"]} label={t("Upload Practice license ")} name="practice_license" />
          </div>

          <div className=" col-span-1">
            <FileUpload mimeTypes={["application/pdf"]} label={t("Upload CV/Resume")} name="resume" />
          </div>
          <div className=" col-span-1">
            <FileUpload
              mimeTypes={["application/pdf"]}
              label={t("Upload Identification card")}
              name="identification_card"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-4 w-fit ">
          <FunctionalButton
            disabled={isPending}
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
