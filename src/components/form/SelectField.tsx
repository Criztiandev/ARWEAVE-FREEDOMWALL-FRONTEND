import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { FC } from "react";
import { SelectProps } from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectItemProps {
  value: string;
  label: string;
}

interface Props extends SelectProps {
  label?: string;
  options: SelectItemProps[];
}

const SelectField: FC<Props> = ({ label, name, options }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name || ""}
      render={({ field }) => (
        <FormItem className="mb-4">
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((options) => (
                <SelectItem key={options.value} value={options.value}>
                  {options.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
