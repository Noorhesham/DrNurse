import React from "react";
import { Server } from "@/app/main/Server";
import Profiles from "@/app/components/Profiles";

const page = async ({
  searchParams,
  params: { application },
}: {
  searchParams: any;
  params: { application: string };
}) => {
  const classifications = await Server({ resourceName: "classification", cache: 1000 * 24 * 60 * 60 });
  const {
    job_title,
    career_specialty_id,
    career_type_id,
    available,
    family_status,
    salary_from,
    salary_to,
    page,
    itemsCount,
    active_license_country,
    from_years,
    to_years,
    nationality_id,
    sort,
    current_location_id,
    career_levels,
    gender,
    classification_id,
  } = searchParams;

  const queryParams = new URLSearchParams({
    job_title: job_title || "",
    career_specialty_id: career_specialty_id || "",
    career_type_id: career_type_id || "",
    available: available || "",
    family_status: family_status || "",
    salary_from: salary_from || "",
    salary_to: salary_to || "",
    page: page || "",
    itemsCount: itemsCount || "",
    active_license_country: active_license_country || "",
    from_years: from_years || "",
    to_years: to_years || "",
    sort: sort || "desc",
    gender: gender || "",
    classification_id: classification_id || "",
  });
  if (nationality_id) {
    const nationalityIdsArray = Array.isArray(nationality_id) ? nationality_id : [nationality_id];
    nationalityIdsArray.forEach((id: string) => queryParams.append("nationality_id[]", id));
  }
  if (career_specialty_id) {
    const careerSpecialtyArray = career_specialty_id.split(",");
    careerSpecialtyArray.forEach((value: string) => {
      queryParams.append("career_specialty_id[]", value);
    });
  }
  if (current_location_id) {
    const currentLocationIdsArray = Array.isArray(current_location_id) ? current_location_id : [current_location_id];
    currentLocationIdsArray.forEach((id: string) => queryParams.append("current_location_id[]", id));
  }

  if (career_levels) {
    const careerLevelsArray = Array.isArray(career_levels) ? career_levels : [career_levels];
    careerLevelsArray.forEach((level: string) => queryParams.append("career_levels[]", level));
  }
  queryParams.append("scope", "filter");
  const data = await Server({ resourceName: "applicants", queryParams, id: application, cache: 0 });
  const profiles = data.data.profiles;
  const career_types = data.data.career_types;
  const career_levelsfilter = data.data.career_levels;
  const career_specialties = data.data.career_specialties;
  const locations = data.data.current_locations;
  const nationalities = data.data.nationalities;
  const genders = data.data.genders;
  const availavility = data.data.availabilty;
  const totalPages = Math.ceil(data.data.count / 10);
  const filters = [
    { "Career Type": career_types, filter: "career_type_id" },
    { "Career Specialty": career_specialties, arr: true, filter: "career_specialty_id" },
    { "Career Level": career_levelsfilter, arr: true, filter: "career_levels" },
    { Availability: availavility, filter: "available" },
    { "Current Location": locations, arr: true, filter: "current_location_id" },
    { Nationality: nationalities, arr: true, filter: "nationality_id" },
    { Gender: genders, arr: true, filter: "gender" },
    { Classification: classifications.data, arr: false, filter: "classification_id" },
  ];

  return (
    <Profiles
      jobId={application}
      count={data.data.count}
      doctors={profiles}
      totalPages={totalPages}
      filters={filters}
    />
  );
};

export default page;
