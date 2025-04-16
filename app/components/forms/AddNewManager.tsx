"use client";

import React, { useTransition } from "react";
import { z } from "zod";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useFieldArray } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { MultiSelect } from "../inputsForm/MultiSelect";
import { MinusCircle, XIcon } from "lucide-react";
import FlexWrapper from "../defaults/FlexWrapper";
import { useQueryClient } from "@tanstack/react-query";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import MiniTitle from "../defaults/MiniTitle";
import Manager from "../Manager";

// Schema for a single manager
const managerSchema = z.object({
  email: z.string().email("Invalid email address"),
  permissions: z.array(z.string()).min(1, "At least one control must be selected"),
});

// Schema for the array of managers
const managersArraySchema = z.object({
  managers: z.array(managerSchema).min(1, "At least one manager must be added"),
});

type ManagerFormValues = z.infer<typeof managersArraySchema>;

const AddNewManager = ({ data, id }: { data: any; id?: string }) => {
  if (!data?.status) return <p className=" text-center text-base text-red-500 font-semibold">{data?.message}</p>;
  const form = useZodForm({
    schema: managersArraySchema,
    defaultValues: {
      //@ts-ignore
      managers: [...data?.data.map((e: any) => ({ email: e.email, permissions: JSON.parse(e.pivot.permissions) }))] || [
        { email: "", permissions: [] },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "managers",
  });
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: ManagerFormValues) => {
    console.log("Form Submitted", data);
    startTransition(async () => {
      const res = await Server({
        resourceName: "update-managers",
        body: data,
      });
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: [`control_managers-${id}`] });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Form {...form}>
      {" "}
      <MiniTitle boldness="bold" size="lg" text="CONTROL MANAGERS" />
      <div className=" mt-5 flex items-start gap-6  md:gap-4 flex-col">
        {/* {data.map((manager) => (
          <Manager key={manager.id} manager={manager} />
        ))} */}
      </div>
      <form className="flex flex-col  py-2.5 w-full md:items-stretch gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div className=" flex  items-end gap-4" key={field.id}>
            {/* Email Input */}
            <FlexWrapper className="  w-full" max={false}>
              <FormInput
                control={form.control}
                name={`managers.${index}.email`}
                label={`Manager ${index + 1} Email`}
                placeholder="Enter Manager's Email"
                type="email"
              />

              {/* Multi-Select for permissions */}
              <MultiSelect
                name={`managers.${index}.permissions`}
                options={[
                  { value: "mangers-view", label: "View Managers" },
                  { value: "update-mangers", label: "Update Managers" },
                ]}
                onValueChange={(val) => form.setValue(`managers.${index}.permissions`, val)}
                defaultValue={field.permissions || []}
              />
              {fields.length > 1 && (
                <FunctionalButton
                  icon={<MinusCircle className=" mr-2" />}
                  className=" text-xs lg:mt-8 rounded-full"
                  size={"sm"}
                  variant={"destructive"}
                  btnText="DELETE"
                  onClick={() => {
                    remove(index);
                  }}
                />
              )}
            </FlexWrapper>
            {/* Remove Manager Button */}
          </div>
        ))}

        {/* Add Manager Button */}
        <MiniTitle boldness="bold" size="lg" text="ADD NEW MANAGER" />
        <div className="my-4">
          <FunctionalButton
            size="sm" className=" uppercase"
            btnText={"Add Another Manager"}
            onClick={() => append({ email: "", permissions: [] })}
          />
        </div>
        {/* Submit Button */}
        <div className="mt-4 w-fit">
          <FunctionalButton disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            btnText="Submit Managers"
            type="submit"
            className="w-full uppercase"
          />
        </div>
      </form>
    </Form>
  );
};

export default AddNewManager;
