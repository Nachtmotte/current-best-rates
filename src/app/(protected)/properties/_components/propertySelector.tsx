"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";

import { PropertySelectorProps } from "@/types/definitions";

export default function PropertySelector({
  form,
  properties,
  userProperties,
  disabled,
}: PropertySelectorProps) {
  const propertyOptions = properties.map(({ name }) => ({
    value: name,
    label: name,
  }));

  const [open, setOpen] = useState(false);

  const formValue = form.getValues("name");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-48 justify-between"
          disabled={disabled}
        >
          {formValue
            ? propertyOptions.find(
                (propertyOption) => propertyOption.value === formValue
              )?.label
            : "Select property..."}
          <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-48 p-0">
        <Command>
          <CommandInput placeholder="Search property..." className="h-9" />
          <CommandList>
            <CommandEmpty>No property found.</CommandEmpty>
            <CommandGroup>
              {propertyOptions.map((propertyOption) => (
                <CommandItem
                  key={propertyOption.value}
                  value={propertyOption.value}
                  disabled={
                    !!userProperties.find(
                      ({ name }) => propertyOption.value === name
                    )
                  }
                  onSelect={(currentValue) => {
                    form.setValue(
                      "name",
                      currentValue === formValue ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {propertyOption.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      formValue === propertyOption.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
