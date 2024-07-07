import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { FC } from "react";

import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";

interface Props extends CheckboxProps {
  label?: string;
}

const CheckboxField: FC<Props> = ({ label, name }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name || ""}
      render={({ field }) => (
        <FormItem className="mb-8 border-none">
          <FormControl>
            <div className="flex  items-start gap-4">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {label && <FormLabel className="text-[14px]">{label}</FormLabel>}
            </div>
          </FormControl>

          <FormMessage className="pl-8" />
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
