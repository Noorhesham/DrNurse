import React, { Suspense, useEffect, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";

import PhotoInput from "./PhotoInput";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import MotionItem from "../defaults/MotionItem";
interface FormInputProps {
  control?: any;
  name: string;
  label?: string;
  type?: string;
  phone?: boolean;
  className?: string;
  description?: string;
  price?: boolean;
  select?: boolean;
  register?: any;
  switchToggle?: boolean;
  desc?: string;
  disabled?: boolean;
  placeholder?: string;
  label2?: string;
  icon?: any;
  password?: boolean;
  optional?: boolean;
  noProgress?: boolean;
  date?: boolean;
  rate?: boolean;
  area?: boolean;
  photo?: boolean;
  noimg?: boolean;
  currency?: boolean;
}
export interface PhoneProps {
  onChange: any;
}
export interface CalendarProps {
  control: any;
  name: string;
  label?: string;
}
type PhoneSearchComponentType = React.ComponentType<PhoneProps>;
type CalendarComponentType = React.ComponentType<CalendarProps>;
const FormInput = ({
  control,
  name,
  label,
  type = "text",
  icon,
  phone,
  className,
  switchToggle = false,
  desc,
  disabled,
  placeholder,
  label2,
  password,
  optional = false,
  noProgress = false,
  date = false,
  rate = false,
  photo = false,
  area = false,
  currency = false,
  noimg = false,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [PhoneSearchComponent, setPhoneSearchComponent] = useState<PhoneSearchComponentType>();
  const [CalendarComponent, setCalendarComponent] = useState<CalendarComponentType>();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak",
    color: "bg-red-500",
    text: "text-red-500",
  });
  const form = useFormContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("Password visibility toggled", showPassword);
  };
  const handlePasswordChange = (value: string) => {};
  useEffect(() => {
    if (phone) {
      const loadPhoneSearch = async () => {
        const { default: PhoneSearch } = await import("./PhoneSearch");
        setPhoneSearchComponent(() => PhoneSearch);
      };
      loadPhoneSearch();
    }
    if (date) {
      const loadCalendar = async () => {
        const { default: CalendarInput } = await import("./CalendarInput");
        //@ts-ignore
        setCalendarComponent(() => CalendarInput);
      };
      loadCalendar();
    }
  }, [phone, date]);

  if (date && CalendarComponent)
    return (
      <Suspense>
        <div className=" relative w-full">
          {!optional && <span className={`absolute right-2 -top-[-40px]  z-10   font-normal text-red-600`}>*</span>}

          <CalendarComponent label={label} name={name || ""} control={control} />
        </div>
      </Suspense>
    );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={` w-full relative`}>
          {!switchToggle && label !== "" && (
            <FormLabel className="uppercase">
              {label} {icon}
            </FormLabel>
          )}
          <div className={`relative  w-full inline-flex items-center justify-center ${className}`}>
            {!optional && <span className={`absolute right-1 -top-[-13px]  z-10   font-normal text-red-600`}>*</span>}
            <FormControl className={`  ${switchToggle ? "" : "   duration-200"} `}>
              {area ? (
                <Textarea placeholder={"MESSAGE"} className="resize-none" {...field} />
              ) : phone && PhoneSearchComponent ? (
                <Suspense>
                  <PhoneSearchComponent name={name} onChange={field.onChange} />
                </Suspense>
              ) : photo ? (
                <PhotoInput noimg={noimg} value={field.value} onChange={field.onChange} />
              ) : switchToggle ? (
                <div className="flex mx-auto   mt-3 gap-2 items-center ">
                  <Label className=" uppercase md:text-sm  text-xs text-muted-foreground" htmlFor="sale">
                    {label2 || ""}
                  </Label>
                  <Switch disabled={disabled} className="" checked={field.value} onCheckedChange={field.onChange} />
                  <Label className="md:text-sm uppercase flex-grow  text-xs  text-muted-foreground" htmlFor="sale">
                    {label || ""}
                  </Label>
                </div>
              ) : (
                <div className=" flex flex-col gap-2 w-full items-start">
                  <Input
                    autoComplete={password ? "off" : "on"}
                    type={
                      type == "password" && !showPassword
                        ? "password"
                        : type === "password" && showPassword
                        ? "text"
                        : type || "text"
                    }
                    className={`${!phone && "bg-white"} mt-auto shadow-sm w-full ${password && "pl-8"} `}
                    placeholder={placeholder}
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e);
                      if (password) handlePasswordChange(e.target.value);
                    }}
                  />
                  {currency && (
                    <span className=" bg-gray-300 text-gray-800 p-2 rounded-lg rounded-l-none absolute right-0 top-0">
                      {form.getValues("currency")}
                    </span>
                  )}
                </div>
              )}
            </FormControl>
            {password && field.value && (
              <span
                className=" absolute left-2 top-[15px]  cursor-pointer hover:text-gray-900 text-gray-800"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
              </span>
            )}
          </div>
          {desc && <FormDescription className=" text-sm text-muted-foreground">{desc}</FormDescription>}
          <FormMessage className=" text-sm dark:text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
