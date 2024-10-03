"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";
import Spinner from "../Spinner";

export default function ComboboxForm({
  options,
  name,
  label,
  placeholder,
  onChange,
  disabled,
  loading,
}: {
  options: any;
  name: string;
  label?: string;
  placeholder: any;
  onChange?: any;
  disabled?: boolean;
  loading?: boolean;
}) {
  const form = useFormContext();
  return (
    <>
      <FormField
        disabled={disabled}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={`relative  w-full`}>
            {label && <FormLabel>{label}</FormLabel>}
            {loading ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
            <Popover>
              <PopoverTrigger disabled={disabled} className=" w-full" asChild>
                <FormControl className=" w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    style={{ width: "100%" }}
                    className={cn("w-full  px-4  justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? options?.find((language: any) => language.value === field.value)?.label
                      : placeholder || ""}
                    <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" w-full min-w-[200px] ">
                <Command>
                  <CommandInput placeholder=" ابحث ..." className="h-9 " />
                  <CommandList className=" overflow-y-scroll">
                    {disabled ? (
                      <FaSpinner className="h-4 w-4 mx-auto animate-spin text-main" />
                    ) : (
                      <>
                        <CommandEmpty>لم يتم ايجاد نتائج</CommandEmpty>

                        <CommandGroup>
                          {options?.map((option: any) => (
                            <CommandItem
                              className=" justify-between"
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                form.setValue(name, option.value);
                                form.trigger(name);
                                if (onChange) onChange(option.value);
                              }}
                            >
                              {option.label}
                              <CheckIcon
                                className={cn(
                                  "mr-auto h-4 w-4",
                                  option.value === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>{" "}
                {disabled && (
                  <div className="  ">
                    <Spinner />
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
