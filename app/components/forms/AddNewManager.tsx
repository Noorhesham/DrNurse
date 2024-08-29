"use client";

import React from "react";
import { z } from "zod";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useFieldArray } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormFlexContainer from "./FormFlexContainer";
import FunctionalButton from "../FunctionalButton";
import MiniTitle from "../MiniTitle";
import { MultiSelect } from "../MultiSelect";
import { XIcon } from "lucide-react";

// Schema for a single manager
const managerSchema = z.object({
  email: z.string().email("Invalid email address"),
  controls: z.array(z.string()).min(1, "At least one control must be selected"),
});

// Schema for the array of managers
const managersArraySchema = z.object({
  managers: z.array(managerSchema).min(1, "At least one manager must be added"),
});

type ManagerFormValues = z.infer<typeof managersArraySchema>;

const AddNewManager = () => {
  const form = useZodForm({
    schema: managersArraySchema,
    defaultValues: {
      managers: [
        { email: "", controls: [] }, // Initial empty manager
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "managers",
  });

  const onSubmit = (data: ManagerFormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle size="lg" boldness="bold" text="Add New Managers" />

        {fields.map((field, index) => (
          <FormFlexContainer className="items-stretch gap-4" key={field.id}>
            {/* Email Input */}
            <FormInput
              control={form.control}
              name={`managers.${index}.email`}
              label={`Manager ${index + 1} Email`}
              placeholder="Enter Manager's Email"
              type="email"
            />

            {/* Multi-Select for Controls */}
            <MultiSelect
              name={`managers.${index}.controls`}
              options={[
                { value: "controlPosts", label: "Control Posts" },
                { value: "controlManagers", label: "Control Managers" },
              ]}
              onValueChange={(val) => form.setValue(`managers.${index}.controls`, val)}
              defaultValue={field.controls || []}
            />

            {/* Remove Manager Button */}
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="rounded-xl border-2 border-gray-600 p-2">
                <XIcon />
              </button>
            )}
          </FormFlexContainer>
        ))}

        {/* Add Manager Button */}

        <div className="my-4">
          <FunctionalButton
            size="sm"
            btnText={"Add Another Manager"}
            onClick={() => append({ email: "", controls: [] })}
          />
        </div>
        {/* Submit Button */}
        <div className="mt-4 w-fit">
          <FunctionalButton
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            btnText="Submit Managers"
            type="submit"
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};

export default AddNewManager;
