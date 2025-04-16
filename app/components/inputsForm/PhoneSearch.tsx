"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PhoneProps } from "./FormInput";
import ar from "react-phone-input-2/lang/ar.json";
import { useFormContext } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";

interface ExtendedPhoneProps extends PhoneProps {
  returnFullPhone?: boolean;
  defaultValue?: any;
}

const PhoneSearch = ({ onChange, name, returnFullPhone = true, defaultValue }: ExtendedPhoneProps) => {
  const lang = useLocale();
  const form = useFormContext();
  const t = useTranslations();

  // New state for tracking country code
  const [selectedCountry, setSelectedCountry] = useState("sa");
  const [dialCodeLength, setDialCodeLength] = useState(3); // Egypt's code length

  const currentValue = form.getValues(name) || {};
  const phoneValue = currentValue.phone || "";
  const dialCodeValue = currentValue.country_key || "";

  // Handle country change from dropdown
  const handleCountryChange = useCallback((country: any) => {
    setSelectedCountry(country.countryCode);
    setDialCodeLength(country.dialCode.length);
  }, []);

  // Prevent backspace over country code
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const numericValue = input.value.replace(/\D/g, "");

      if (e.key === "Backspace" && numericValue.length <= dialCodeLength) {
        e.preventDefault();
      }
    },
    [dialCodeLength]
  );

  return (
    <PhoneInput
      enableSearch
      localization={lang === "ar" ? ar : undefined}
      excludeCountries={["il"]}
      searchStyle={{ width: "80%" }}
      country={selectedCountry}
      value={`${dialCodeValue}${phoneValue}`}
      onChange={(value, country) => {
        // Update country info if changed via dropdown
        if (country.countryCode !== selectedCountry) {
          handleCountryChange(country);
        }

        let phoneData;

        if (!returnFullPhone) {
          phoneData = {
            phone: value.slice(country.dialCode.length),
            country_key: country.dialCode,
          };
        } else {
          phoneData = `${value}`;
        }

        onChange(phoneData);
        form.setValue(name, phoneData);
      }}
      placeholder={t("phone")}
      searchPlaceholder="Search"
      inputProps={{
        onKeyDown: handleKeyDown,
        style: {
          padding: "0.5rem 0.5rem",
          outline: "#E6007E",
          boxShadow: "0 0 0 1px #e4e4e7",
          direction: "ltr",
          marginTop: "5px",
        },
      }}
    />
  );
};

export default PhoneSearch;
