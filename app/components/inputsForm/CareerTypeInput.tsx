"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ComboboxForm from "./ComboboxForm";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ResourceNameProps, Server } from "@/app/main/Server";

export const useGetEntities = ({
  key,
  resourceName,
  queryParams,
  enable = true,
  id,
  entityName,
}: {
  key: string;
  resourceName: ResourceNameProps;
  queryParams?: URLSearchParams | string;
  enable?: boolean;
  id?: string;
  entityName?: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [key, queryParams, id],
    queryFn: async () => await Server({ resourceName: resourceName, id, cache: Infinity, queryParams, entityName }),
    enabled: enable,
  });
  return { data, isLoading };
};

const CareerInput = ({
  careerType,
  careerSpecialty,
  careerLevel,
  careerTypes,
  loadingCareerTypes,
  onlySpeciality,
  disabled,
}: {
  careerType: string;
  careerSpecialty: string;
  careerLevel: string;
  careerTypes: any[];
  loadingCareerTypes?: boolean;
  onlySpeciality?: boolean;
  disabled?: boolean;
}) => {
  const form = useFormContext();

  const selectedCareerType = form.getValues(careerType);

  const { data: careerSpecialties, isLoading: loadingCareerSpecialties } = useGetEntities({
    resourceName: "getEntity",
    key: "career-specialties",
    id: selectedCareerType,
    entityName: "career-specialties",
    enable: !!selectedCareerType,
    queryParams: `with=careerTypes&career_type=${selectedCareerType}`,
  });

  const selectedCareerSpecialty = form.getValues(careerSpecialty);

  const { data: careerLevels, isLoading: loadingCareerLevels } = useGetEntities({
    resourceName: "getEntity",
    key: "career-levels",
    entityName: "career-levels",
    id: selectedCareerSpecialty,
    enable: !!selectedCareerSpecialty,
    queryParams: `with=careerTypes&career_type=${selectedCareerType}`,
  });

  return (
    <div className="flex w-full gap-4">
      {!onlySpeciality && (
        <ComboboxForm
          name={careerType}
          disabled={loadingCareerTypes}
          label={"Career Type"}
          placeholder={"Select Career Type"}
          options={careerTypes?.data?.map((type: any) => ({
            label: type.title,
            value: type.id,
          }))}
        />
      )}

  
        {(selectedCareerType || onlySpeciality) && (
          <ComboboxForm
            disabled={loadingCareerSpecialties || disabled}
            name={careerSpecialty}
            label={"Career Specialty"}
            placeholder={"Select Career Specialty"}
            options={careerSpecialties?.data?.map((specialty: any) => ({
              label: specialty.title,
              value: specialty.id,
            }))}
          />
        )}

      {selectedCareerSpecialty && careerLevel !== "" && (
        <ComboboxForm
          disabled={loadingCareerLevels}
          name={careerLevel}
          label={"Career Level"}
          placeholder={"Select Career Level"}
          options={careerLevels?.data.map((level: any) => ({
            label: level.title,
            value: level.id,
          }))}
        />
      )}
    </div>
  );
};

export default CareerInput;
