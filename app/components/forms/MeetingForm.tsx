"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import React, { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import Paragraph from "../defaults/Paragraph";
import LocalTime from "../LocalTime";
import { zodResolver } from "@hookform/resolvers/zod";

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

const MeetingForm = ({ invite, userId, jobIdDef }: { invite?: boolean; userId?: string; jobIdDef?: string }) => {
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

  const form = useForm({
    resolver: zodResolver(meetingsSchema),
    mode: "onChange",
    defaultValues: {
      meetings: defaultMeetings,
    },
  });
  React.useEffect(() => {
    if (data?.data) {
      const defaultMeetings = data.data
        .filter((meet: any) => meet.from_date)
        .map((meeting: any) => {
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
        });

      form.reset({
        meetings:
          defaultMeetings.length > 0 ? defaultMeetings : [{ from_date: "", time_date: "00:00", duration: "00:00" }],
      });
    }
  }, [data, form]);
  console.log(form.formState.errors);
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "meetings",
  });

  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

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
  const hasSlots = fields.length > 0;
  if (isLoading || !data || jobLoading) return <Spinner />;

  return (
    <div>
      <MiniTitle boldness="bold" color="black" text={job?.data?.job_title || ""} />
      <Paragraph
        description="Create time slots for others to select from. These slots are shared with all invitees for 
          this job. Please ensure the times are in GMT. "
      />
      <Form {...form}>
        {" "}
        <form className="mt-4 px-5  relative flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {watchedFields.map((field, index) => (
            <div className="flex flex-col gap-3" key={field.id}>
              {" "}
              <div className="flex lg:flex-nowrap flex-wrap w-full items-center gap-5">
                <FormInput
                  disableOldDates
                  label="Start From"
                  control={form.control}
                  name={`meetings.${index}.from_date`}
                  date
                />
                <FormInput label="Time" control={form.control} name={`meetings.${index}.time_date`} type="time" />
                <FormSelect
                  label="Duration"
                  name={`meetings.${index}.duration`}
                  options={[
                    { value: "00:30", label: "30 min (1 Subscription unit)" },
                    { value: "01:00", label: "1 hour (2 Subscription unit)" },
                    { value: "01:30", label: "1.5 hour (3 Subscription unit)" },
                    { value: "02:00", label: "2 hours (4 Subscription unit)" },
                    { value: "02:30", label: "2.5 hour (5 Subscription unit)" },
                    { value: "03:00", label: "3 hours (6 Subscription unit)" },
                  ]}
                />{" "}
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
              <LocalTime time={field.time_date} />
            </div>
          ))}
          {!hasSlots && <div className="text-center text-red-500">Please add at least one slot to proceed.</div>}
          <div className="flex items-center gap-3">
            <div className="flex gap-3 items-center">
              <FunctionalButton
                size="sm"
                disabled={isPending}
                btnText="Add Slot"
                onClick={() => append({ from_date: "", time_date: "", duration: "" })}
              />
              { (
                <FunctionalButton
                  disabled={isPending}
                  size="sm"
                  btnText="Save Slots"
                  onClick={form.handleSubmit(onSubmit)}
                />
              )}
            </div>
          </div>
        </form>
      </Form>
      {invite && hasSlots && (
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
