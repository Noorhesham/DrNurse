import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import PostJob from "@/app/components/forms/PostJob";
import { Server } from "@/app/main/Server";
import React from "react";

const page = async ({ params: { job } }: { params: { job: string } }) => {
  const data = await Server({ resourceName: "job", id: job });

  return (
    <MaxWidthWrapper>
      <PostJob defaultData={data.data} />
    </MaxWidthWrapper>
  );
};

export default page;
