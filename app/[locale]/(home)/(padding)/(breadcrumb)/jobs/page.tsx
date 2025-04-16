import React from "react";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { Server } from "@/app/main/Server";

import JobsList from "@/app/components/Jobs";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  const {
    experience_from,
    experience_to,
    career_type_id,
    country_ids,
    page,
    sort,
    career_specialty_id,
    career_levels,
    query,
  } = searchParams;

  const queryParams = new URLSearchParams({
    page: page || "",
    experience_from: experience_from || "",
    experience_to: experience_to || "",
    career_type_id: career_type_id || "",
    career_specialty_id: career_specialty_id || "",
    search: query || "",
    sort: "desc",
  });
  if (country_ids) {
    const countryIdsArray = country_ids.split(",");
    countryIdsArray.forEach((value: string) => {
      queryParams.append("country_ids[]", value);
    });
  }
  if (career_levels) {
    const careerLevelsArray = career_levels.split(",");
    careerLevelsArray.forEach((value: string) => {
      queryParams.append("career_levels[]", value);
    });
  }
  if (career_specialty_id) {
    const careerSpecialtyArray = career_specialty_id.split(",");
    careerSpecialtyArray.forEach((value: string) => {
      queryParams.append("career_specialty_id[]", value);
    });
  }
  const data = await Server({ resourceName: "getJobs", queryParams });
  const jobs = data?.data.jobs;
  const career_types = data.data.career_types;
  const career_levelsfilter = data.data.career_levels;
  const countries = data.data.countries;
  const career_specialties = data.data.career_specialties;

  const totalPages = Math.ceil(data.data.count / 10);
  const filters = [
    { "Career Type": career_types, filter: "career_type_id" },
    { "Career Specialty": career_specialties, arr: true, filter: "career_specialty_id" },
    { "Career Level": career_levelsfilter, arr: true, filter: "career_levels" },
    { Country: countries, arr: true, filter: "country_ids" },
  ];
  return (
    <MaxWidthWrapper>
      <JobsList disabled filters={filters} query={query} jobs={jobs} totalPages={totalPages} />
    </MaxWidthWrapper>
  );
};

export default page;
