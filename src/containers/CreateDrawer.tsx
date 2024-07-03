import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { DialogProps } from "@radix-ui/react-dialog";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

interface Props extends DialogProps {}

const createRantSchema = z.object({
  rant: z
    .string()
    .min(1, "Rant is required")
    .max(500, "Rant cannot exceed 500 characters"),
  toc: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValue = z.infer<typeof createRantSchema>;

const CreateDrawer: FC<Props> = (props) => {
  const form = useForm<FormValue>({
    defaultValues: {
      rant: "",
      toc: false,
    },
    resolver: zodResolver(createRantSchema),
  });

  const onSubmit = (value: FormValue) => {
    console.log(value);
  };
  return (
    <Drawer {...props}>
      <DrawerContent className="max-w-4xl mx-auto h-[75vh] px-[32px]">
        <DrawerHeader className="flex justify-center items-center flex-col gap-4">
          <DrawerTitle className="text-4xl text-center font-lovelo mt-4">
            Create Rant
          </DrawerTitle>
          <DrawerDescription className="w-[80%] text-center ">
            Your rant will be permanently stored on the blockchain. Once posted,
            it cannot be edited or deleted. Think carefully before sharing.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" px-[64px]">
            <FormField
              control={form.control}
              name="rant"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Rant</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full h-[300px] "
                      placeholder="Enter your rant"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center items-center flex-col px-[64px]">
              <FormField
                control={form.control}
                name="toc"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex  items-start mb-4  gap-4">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>
                          I agree that whatever I post on this platform is my
                          sole responsibility, and the owner is not liable for
                          my content
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-[150px]">Create</Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateDrawer;
