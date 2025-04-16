"use client";
import AddToWishlist from "@/app/components/AddToWishlist";
import BreadCrumb from "@/app/components/BreadCrumb";
import Empty from "@/app/components/Empty";
import FunctionalButton from "@/app/components/FunctionalButton";
import JobBenefits from "@/app/components/JobBenefits";
import JobCard from "@/app/components/JobCard";
import JobInfo from "@/app/components/JobInfo";
import MainProfile from "@/app/components/MainProfile";
import Share from "@/app/components/Share";
import Spinner from "@/app/components/Spinner";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { useAuth } from "@/app/context/AuthContext";
import { Server } from "@/app/main/Server";
import { Job } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useGetEntity } from "@/lib/queries";
import { convertToHTML } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading } = useGetEntity("job", `job-${id}`, id, { nocompany: true });
  const [isPending, startTransition] = useTransition();
  const { userSettings, loading } = useAuth();

  if (isLoading || !data || loading || !userSettings) return <Spinner />;
  const job = data.data;
  const doctor = {
    name: job.job_title,
    image: "/Frame 48097786 (3).svg",
    speciality: [job?.career_type?.title, job?.career_specialty?.title, job?.career_level?.title]
      .filter(Boolean)
      .join(", "),
    address: job.branch?.address ? `${job.branch?.country?.title || ""}, ${job.branch?.state?.title || ""}` : "",
  };
  const queryClient = useQueryClient();
  const handleApply = () => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "apply-job",
        body: {
          job_id: job.id,
        },
      });
      queryClient.invalidateQueries({ queryKey: [`job-${id}`] });
      if (res.status) toast.success(res.message);
      else toast.error(res.message);
    });
  };
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";
  if (job.status === "draft")
    return (
      <div className=" pt-36">
        <Empty text="This is a draft job , it must be edited  or published" />
      </div>
    );
  return (
    <section className=" pt-36">
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: `/person`, text: "Dashboard" },
          { href: `/job/${id}`, text: job.job_title },
        ]}
      />
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile h1={true} user={doctor}>
            <div className="flex  items-center gap-2">
              {!userSettings?.has_profile ? (
                <FunctionalButton
                  btnText={"APPLY FOR JOB"}
                  icon={null}
                  content={
                    <div className="flex flex-col gap-5 justify-center items-center">
                      <FaExclamationCircle size={40} className=" text-main" />
                      <h2 className=" text-main text-lg font-semibold">SORRY !</h2>
                      <p className=" max-w-md text-center  text-base">
                        {" "}
                        YOUR PROFILE IS INCOMPLETE OR NOT YET ACTIVATED. PLEASE REVIEW YOUR PROFILE TO APPLY FOR THIS
                        JOB
                      </p>
                      <div className="flex  gap-2">
                        <Link href="/person/create-profile">
                          {" "}
                          <Button size="sm" className="rounded-full">
                            UPDATE PROFILE
                          </Button>
                        </Link>
                        <DialogClose asChild>
                          <Button size="sm" className="rounded-full">
                            Close
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  }
                />
              ) : (
                <div className="flex items-center gap-2">
                  {" "}
                  <FunctionalButton
                    noclick={job.is_applied}
                    disabled={isPending}
                    btnText={job.is_applied ? "ALREADY APPLIED" : "APPLY FOR JOB"}
                    onClick={handleApply}
                    icon={job.is_applied ? <XCircle /> : null}
                  />
                  <div className="   bg-gray-200 p-3 rounded-2xl">
                    <AddToWishlist wishlistStatus={job.bookmarked} id={job.id} />
                  </div>
                </div>
              )}
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            <section className=" flex flex-col gap-2 ">
              <MiniTitle boldness="bold" color=" text-main2" text="JOB DESCRIPTION" />
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_description || "") }}
                className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
              />
              <JobBenefits job={job} />
              <div className="flex gap-1 mt-5 items-start flex-col">
                <MiniTitle boldness="bold" color=" text-main2" text="Responsibilities" />
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_requirements || "") }}
                  className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium leading-[1.7] `}
                />
              </div>
              {job && (
                <div className=" flex items-center lg:flex-nowrap flex-wrap gap-2 mt-2">
                  <Share title={job.job_title} image={job.image} />
                </div>
              )}
            </section>
          </div>
          <JobInfo job={job} timeAgo={timeAgo} />
        </GridContainer>
        <section className="mt-20">
          <MiniTitle boldness="bold" color=" text-main2" text="RELATED JOBS" />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            {job.related_jobs?.map((job: Job, i: number) => (
              <JobCard bookmarked={job.bookmarked} parentId={id.toString()} i={i} key={job.id} job={job} />
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
