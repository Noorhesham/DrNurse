import Container from "@/app/components/Container";
import Meet from "@/app/components/Meet";
import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col gap-5">
      <Container>
        <Meet cancel />
      </Container>
      <Container>
        <Meet cancel />
      </Container>
      <Container>
        <Meet cancel />
      </Container>
      <Container>
        <Meet cancel />
      </Container>
    </div>
  );
};

export default page;
