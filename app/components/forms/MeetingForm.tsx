"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import React, { useTransition } from "react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import MiniTitle from "../defaults/MiniTitle";
import { Form } from "@/components/ui/form";
import { MessageCircleIcon, XIcon } from "lucide-react";
import FunctionalButton from "../FunctionalButton";
import FormInput from "../inputsForm/FormInput";
import { useParams, useSearchParams } from "next/navigation";
import Spinner from "../Spinner";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useGetEntity } from "@/lib/queries";
import { format, parse, set } from "date-fns";
import FormSelect from "../inputsForm/FormSelect";

const meetingsSchema = z.object({
  meetings: z.array(
    z.object({
      from_date: z.union([z.string().min(1, "From date is required"), z.number()]),
      time_date: z.string().min(1, "Time is required"),
      duration: z
        .string()
        .min(1, "Duration is required")
        .regex(/^\d{2}:\d{2}$/, "Duration must be in H:i format"),
      id: z.any().optional(),
      manager_email: z.string().email().optional(),
    })
  ),
});

const MeetingForm = ({
  invite,
  userId,
  jobIdDef,
  jobTitle,
}: {
  invite?: boolean;
  userId?: string;
  jobIdDef?: string;
  jobTitle?: String;
}) => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job") || jobIdDef || "";
  const { data: job, isLoading: jobLoading } = useGetEntity("job", `job-${jobId || 0}`, jobId, {
    enabled: !!jobId,
  });
  const params = useParams();
  console.log(params);
  const { data, isLoading } = useGetEntity("slots", `slots-${jobId || 0}`, jobId || "0", {}, `company_id=${params.id}`);

  const defaultMeetings = data?.data
    ?.filter((meet) => meet.from_date)
    .map((meeting: any) => {
      if (!meeting.from_date) return;
      let duration = "00:00";
      if (meeting.duration) {
        const [hours, minutes] = meeting.duration.split(":");
        if (hours && minutes) {
          duration = format(new Date(0, 0, 0, hours, minutes), "HH:mm");
        }
      }
      const time = format(meeting.from_date, "HH:mm");
      return {
        ...meeting,
        time_date: time,
        id: meeting.id,
        duration,
      };
    }) || [{ from_date: "", time_date: "00:00", duration: "00:00" }];

  const form = useZodForm({
    schema: meetingsSchema,
    defaultValues: {
      meetings: defaultMeetings,
    },
  });
  console.log(form.formState.errors);
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "meetings",
  });

  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  if (isLoading || !data || jobLoading) return <Spinner />;

  const onSubmit = (data: any) => {
    startTransition(async () => {
      data.meetings.map((field: any, index: number) => {
        const { from_date, time_date } = field;

        let parsedDate;
        try {
          parsedDate = parse(from_date, "yyyy-MM-dd HH:mm:ss", new Date());
          if (isNaN(parsedDate.getTime())) {
            parsedDate = new Date(from_date);
          }
          if (isNaN(parsedDate.getTime())) {
            return;
          }
        } catch (e) {
          return;
        }

        if (time_date) {
          const [hours, minutes] = time_date.split(":").map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
            try {
              const updatedFromDate = set(parsedDate, { hours, minutes });
              if (isNaN(updatedFromDate.getTime())) {
                return;
              }
              const formattedFromDate = format(updatedFromDate, "yyyy-MM-dd HH:mm");
              field.from_date = formattedFromDate;
            } catch (e) {
              console.error(`Error setting time for from_date: ${from_date}`, e);
              if (field.duration) {
                const [hours, minutes] = field.duration.split(":");
                if (hours && minutes) {
                  field.duration = format(new Date(0, 0, 0, hours, minutes), "HH:mm");
                }
              }
            }
          }
        }
      });
      const res = await Server({
        resourceName: "add-slot",
        body: !jobId
          ? { user_id: userId, status: "available", slots: data.meetings }
          : {
              req_job_post_id: jobId,
              user_id: userId,
              status: "available",
              slots: data.meetings,
            },
      });
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: [`slots-${jobId}`] });
      } else {
        toast.error(res.message);
      }
    });
  };

  const watchedFields = form.watch("meetings", fields);
  console.log(data);
  return (
    <div>
      <MiniTitle boldness="bold" color="black" text={job?.data?.job_title || ""} />
      <Form {...form}>
        {" "}
        <form className="mt-4 px-5  relative flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {watchedFields.map((field, index) => (
            <div className="flex lg:flex-nowrap flex-wrap w-full items-center gap-5" key={index}>
              <FormInput label="Start From" control={form.control} name={`meetings.${index}.from_date`} date />
              <FormInput label="Time" control={form.control} name={`meetings.${index}.time_date`} type="time" />
              <FormSelect
                label="Duration"
                control={form.control}
                name={`meetings.${index}.duration`}
                options={[
                  { value: "00:30", label: "30 min" },
                  { value: "01:00", label: "1 hour" },
                  { value: "01:30", label: "1.5 hour" },
                  { value: "02:00", label: "2 hours" },
                  { value: "02:30", label: "2.5 hour" },
                  { value: "03:00", label: "3 hours" },
                ]}
              />
              <div className="flex w-full items-center gap-1">
                <FormInput
                  label="MANAGER EMAIL"
                  optional
                  control={form.control}
                  name={`meetings.${index}.manager_email`}
                />
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                    startTransition(() => {
                      startTransition(async () => {
                        const res = await Server({
                          resourceName: "delete-slot",
                          id: field.id,
                        });
                        if (res.status) {
                          toast.success(res.message);
                          queryClient.invalidateQueries({ queryKey: [`slots-${jobId}`] });
                        } else toast.error(res.message);
                      });
                    });
                  }}
                  className="rounded-xl self-center border-2 border-gray-600 p-1 my-auto"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-fit my-5">
              <FunctionalButton
                size="sm"
                btnText="ADD ANOTHER"
                onClick={() => append({ from_date: "", time_date: "00:00", duration: "00:00" })}
              />
            </div>
            <FunctionalButton
              className="w-[60%] mx-auto"
              size="sm"
              disabled={isPending}
              btnText="SAVE SLOTS"
              onClick={form.handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </Form>
      {invite && (
        <FunctionalButton
          disabled={isPending}
          className="w-[60%] mt-14 ml-auto"
          size="sm"
          btnText="Send Invitation"
          icon={<MessageCircleIcon />}
          onClick={() => {
            startTransition(async () => {
              const res = await Server({
                resourceName: "sendInvite",
                body: jobId ? { job_id: jobId, user_id: userId } : { user_id: userId },
              });
              if (res.status) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: [`person-meetings`] });
              } else toast.error(res.message);
            });
          }}
        />
      )}
    </div>
  );
};

export default MeetingForm;
