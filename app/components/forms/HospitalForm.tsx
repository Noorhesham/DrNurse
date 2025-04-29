"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React, { useEffect, useTransition } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import FileUpload from "../inputsForm/FileUpload";
import FlexWrapper from "../defaults/FlexWrapper";
import CountriesInput from "../inputsForm/CountriesInput";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
const facebookUrlPattern = /facebook/;
const twitterUrlPattern = /x/;
const instagramUrlPattern = /instagram/;
const linkedinUrlPattern = /linkedin/;
const hospitalSchema = z.object({
  business: z.string().min(1, "Hospital Type is required"),
  title: z.string().min(1, "Health Service Provider is required"),
  specialties: z.string().min(1, "Specialities are required"),
  year_founded: z.string().min(1, "You Founded is required"),
  company_size: z.union([z.string().min(1, "Hospital Size is required"), z.number()]),
  branches: z.array(
    z.object({
      name: z.string().min(1, "Branch Name is required"),
      country_id: z.union([z.string().min(1, "Country is required"), z.number()]),
      city_id: z.union([z.string().min(1, "City is required"), z.number()]),
      state_id: z.union([z.string().min(1, "State is required"), z.number()]),
      capacity: z.union([z.string().min(1, "capacity is required"), z.number()]),
    })
  ),
  hospitalPhoneNumber: z.object({
    country_key: z.union([z.string().min(1, "Country Code is required"), z.number()]),
    phone: z.union([z.string().min(1, "Phone Number is required"), z.number()]),
  }),
  email: z.string().email("Invalid email format"),
  commercial_registration_number: z.string().min(1, "Commercial Registration Number is required"),
  social_facebook: z.string().regex(facebookUrlPattern, "Invalid Facebook URL").optional().or(z.literal("")),
  social_twitter: z.string().regex(twitterUrlPattern, "Invalid X URL").optional().or(z.literal("")),
  social_instagram: z.string().regex(instagramUrlPattern, "Invalid Instagram URL").optional().or(z.literal("")),
  social_linkedin: z.string().regex(linkedinUrlPattern, "Invalid LinkedIn URL").optional().or(z.literal("")),

  logo: z.any().optional(),

  description: z.string().optional(),
  commercial_registration: z
    .any()
    .refine((val) => val, {
      message: "Commercial registration is required",
    })
    .optional(),
});
type HospitalFormValues = z.infer<typeof hospitalSchema>;

const HospitalProfileSettings = ({ defaultData }: { defaultData?: any }) => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const { setDates, setLogin } = useAuth();
  console.log(defaultData);
  const form = useZodForm({
    schema: hospitalSchema,
    defaultValues: {
      commercial_registration_number: defaultData?.commercial_registration_number || "",
      business: defaultData?.business || "",
      title: defaultData?.title || "",
      specialties: defaultData?.specialties || "",
      year_founded: defaultData?.year_founded || "",
      company_size: defaultData?.company_size || "",
      branches: defaultData?.branches || [{ name: "", country_id: "", city_id: "", state_id: "", capacity: 0 }],
      email: defaultData?.email || "",
      logo: defaultData?.logo?.[0] || null,
      description: defaultData?.description || "",
      commercial_registration: defaultData?.commercial_registration?.[0] || null,
      hospitalPhoneNumber: { phone: defaultData?.phone || "", country_key: defaultData?.country_key || "" },
      social_facebook: defaultData?.social_facebook || "",
      social_twitter: defaultData?.social_twitter || "",
      social_instagram: defaultData?.social_instagram || "",
      social_linkedin: defaultData?.social_linkedin || "",
    },
  });
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast.error(
        Object.values(form.formState.errors)
          .map((error) => error.message)
          .join(", ")
      );
    }
  }, [form.formState.errors]);
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "branches",
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  console.log(form.formState.errors);
  const onSubmit = (data: HospitalFormValues) => {
    const formData = new FormData();
    //
    if (data.hospitalPhoneNumber) {
      console.log(data.hospitalPhoneNumber);
      formData.append("phone", data.hospitalPhoneNumber.phone.toString());
      formData.append("country_key", data.hospitalPhoneNumber.country_key.toString());
    }
    if (defaultData) formData.append("_method", "PUT");
    const fileFields = ["commercial_registration"];

    const { hospitalPhoneNumber, ...rest } = data;
    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        const value = rest[key as keyof typeof rest];
        // if (fileFields.includes(key) && !(value instanceof File)) {
        //   continue;
        // }
        // Check if the value is not null, undefined, or an empty string
        if (value === null || value === undefined || value === "") {
          continue; // Skip appending empty values
        }

        if (value instanceof Array) {
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              for (const nestedKey in item) {
                if (item[nestedKey] !== null && item[nestedKey] !== undefined && item[nestedKey] !== "") {
                  formData.append(`${key}[${index}][${nestedKey}]`, item[nestedKey]);
                }
              }
            } else if (item !== null && item !== undefined && item !== "") {
              formData.append(`${key}`, item);
            }
          });
        } else if (typeof value === "object" && value !== null && !(value instanceof File)) {
          // If the value is an object, but not a file
          if (key === "logo" || key === "commercial_registration") formData.append(`${key}[]`, value.id);
          if (key !== "logo" && key !== "commercial_registration") formData.append(`${key}`, value);

          // for (const nestedKey in value) {
          //   if (value[nestedKey] !== null && value[nestedKey] !== undefined && value[nestedKey] !== "") {

          //   }
          // }
        } else {
          // Handle file or scalar values, skip if empty
          formData.append(key, value as string | Blob);
        }
      }
    }

    // Start async request
    startTransition(async () => {
      const res = defaultData?.id
        ? await Server({
            resourceName: "update-hospital",
            body: formData,
            formData: true,
            id: defaultData?.id || "",
          })
        : await Server({
            resourceName: "add-hospital",
            body: formData,
            formData: true,
          });
      defaultData?.id
        ? queryClient.invalidateQueries({ queryKey: [`company-${defaultData.id}`] })
        : queryClient.invalidateQueries({ queryKey: [`companies`] });
      console.log(res);
      if (res.status) {
        setDates((prevDates: any) => ({
          ...prevDates,
          last_update_date_user: "",
        }));
        setLogin((l) => !l);
        router.refresh();
        toast.success(res.message);
        !defaultData && cookies.set("hospitalId", res.id);

        !defaultData && redirect(`/dashboard/${res.id}`);
      } else {
        toast.error(res.message);
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, messages]) => {
            if (field === "phone")
              return form.setError("hospitalPhoneNumber", {
                type: "server",
                message: Array.isArray(messages) ? messages[0] : messages, // Handle array or single string
              });
            form.setError(field, {
              type: "server",
              message: Array.isArray(messages) ? messages[0] : messages, // Handle array or single string
            });
          });
        }
        console.log(form.formState.errors);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("hospitalprofilesettings")} />
        {/* Hospital Info */}
        <FlexWrapper max={false}>
          <FormSelect
            className=" lg:w-[20%] w-full"
            options={[
              { label: "HOSPITAL", value: "hospital" },
              { label: "CLINIC", value: "clinic" },
            ]}
            label={t("Hospital Type")}
            name="business"
          />
          <FormInput control={form.control} name="title" label={t("Health Service Provider")} />
        </FlexWrapper>
        <FlexWrapper max={false}>
          <FormInput control={form.control} name="specialties" label={t("Specialities")} />
          <FormInput
            control={form.control}
            name="commercial_registration_number"
            label={t("Commercial Registration Number")}
          />
        </FlexWrapper>
        <FlexWrapper max={false}>
          <FormInput type="number" label={t("You Founded")} name="year_founded" />
          <FormInput type="number" label={t("Hospital Size")} name="company_size" />
        </FlexWrapper>
        {/* Branches */}
        <MiniTitle size="md" boldness="bold" text={t("Branches")} />
        {fields.map((field, index) => (
          <FlexWrapper max={false} key={field.id} className="flex  items-center gap-2 ">
            <FormInput
              width=" w-full lg:w-[40%]"
              control={form.control}
              name={`branches.${index}.name`}
              label={t("Branch Name")}
            />

            <CountriesInput
              countryName={`branches.${index}.country_id`}
              stateName={`branches.${index}.state_id`}
              cityName={`branches.${index}.city_id`}
            />

            <div className=" w-full flex items-center gap-2">
              <FormInput
                optional
                control={form.control}
                name={`branches.${index}.capacity`}
                label={t("Bed Capacity")}
                type="number"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-xl self-center border-2 border-gray-600 p-1 mt-6"
              >
                <XIcon className="w-4 h-4 " />
              </button>
            </div>
          </FlexWrapper>
        ))}
        <FunctionalButton
          size="sm"
          btnText={t("Add Branch")}
          className=" w-fit"
          onClick={() => append({ name: "", country_id: "", city_id: "", state_id: "", capacity: 0 })}
        />
        {/* Contact Info */}
        <div className="  flex flex-col gap-4">
          <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("Contact Info")} />

          <FlexWrapper max={false}>
            <FormInput
              returnFullPhone={false}
              control={form.control}
              name="hospitalPhoneNumber"
              phone
              label={t("Hospital Phone Number")}
            />
            <FormInput control={form.control} optional name="email" label={t("Hospital Email")} type="email" />
          </FlexWrapper>
        </div>
        {/* Social Media */}
        <div className="  flex flex-col gap-4">
          <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("Social Media")} />
          {["social_facebook", "social_linkedin", "social_instagram", "social_twitter"].map((platform) => (
            <FormInput key={platform} control={form.control} name={`${platform}`} optional label={t(platform)} />
          ))}
        </div>
        {/* Logo, Banner,  */}

        <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("Media")} />
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full">
          <FileUpload mimeTypes={["image/*"]} label={t("Upload Logo")} name="logo" />
          <FileUpload
            required
            mimeTypes={["application/pdf"]}
            label={t("Upload Documents")}
            name="commercial_registration"
          />
        </div>
        {/* Hospital Description */}
        <FormInput control={form.control} name="description" optional label={t("Description about Hospital")} area />
        {/* Document Upload */}
        {/* Submit Button */}
        <div className=" w-fit">
          <FunctionalButton
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            btnText={t("Save Settings")}
            type="submit"
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};

export default HospitalProfileSettings;
