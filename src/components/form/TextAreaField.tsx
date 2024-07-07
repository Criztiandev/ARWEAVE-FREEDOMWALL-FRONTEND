import { Textarea, TextareaProps } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface Props extends TextareaProps {
  label?: string;
}

const TextAreaField: FC<Props> = ({ label, name, className }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name || ""}
      render={({ field }) => (
        <FormItem className="mb-4">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              className={cn("w-full h-[200px] md:h-[300px]", className)}
              placeholder="Enter your rant"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaField;
