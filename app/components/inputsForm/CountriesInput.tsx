"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ComboboxForm from "./ComboboxForm";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ResourceNameProps, Server } from "@/app/main/Server";

const useGetEntities = ({
  key,
  resourceName,
  queryParams,
  enable = true,
  id,
}: {
  key: string;
  resourceName: ResourceNameProps;
  queryParams?: URLSearchParams;
  enable?: boolean;
  id?: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [key, queryParams, id],
    queryFn: async () => await Server({ resourceName: resourceName, id, cache: Infinity }),
    enabled: enable,
  });
  return { data, isLoading };
};

const CountriesInput = ({
  countryName,
  stateName,
  cityName,
}: {
  countryName: string;
  stateName: string;
  cityName?: string;
}) => {
  const form = useFormContext();
  const t = useTranslations("CountriesInput"); // Get translations for this component
  const { data: countries, isLoading } = useGetEntities({
    resourceName: "countries",
    key: "countries",
  });
  const selectedCountryCode = form.getValues(countryName);
  const { data: states, isLoading: statesLoading } = useGetEntities({
    resourceName: "states",
    id: selectedCountryCode,
    key: "states",
    enable: !!selectedCountryCode,
  });
  const selectedStateCode = form.getValues(stateName);
  const { data: cities, isLoading: citiesLoading } = useGetEntities({
    resourceName: "cities",
    id: selectedStateCode,
    key: "cities",
    enable: !!selectedStateCode && cityName !== "",
  });

  return (
    <div className="flex  w-full gap-4">
      {!isLoading && (
        <ComboboxForm
          name={countryName}
          label={t("countryLabel")}
          placeholder={t("selectCountry")}
          options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
      {selectedCountryCode && (
        <ComboboxForm
          loading={statesLoading}
          disabled={statesLoading}
          name={stateName}
          label={t("stateLabel")}
          placeholder={t("selectState")}
          options={states?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
      {selectedStateCode && cityName && (
        <ComboboxForm
          disabled={citiesLoading}
          loading={citiesLoading}
          name={cityName}
          label={t("cityLabel")}
          placeholder={t("selectCity")}
          options={cities?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
    </div>
  );
};

export default CountriesInput;
