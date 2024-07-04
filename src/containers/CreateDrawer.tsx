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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { rantValidationSchema } from "@/service/validation/rant.validation";
import { RantFormValue } from "@/interface/rant";
import rantApi from "@/api/rant.api";
import { AxiosResponse } from "axios";

interface Props extends DialogProps {}

const CreateDrawer: FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const form = useForm<RantFormValue>({
    defaultValues: {
      rant: "",
      toc: false,
    },
    resolver: zodResolver(rantValidationSchema),
  });

  const mutation = useMutation({
    mutationFn: async (value: RantFormValue) => rantApi.createRant(value),
    mutationKey: ["create-rant"],

    onSuccess: (response: AxiosResponse) => {
      form.reset();
      toast.success(response.data?.message || "Created successfully", {
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["rants"],
      });
    },
    onError: () => {
      toast.error("Something went wrong, Please try again later", {
        position: "top-right",
      });
    },
  });

  const onSubmit = (value: RantFormValue) => {
    mutation.mutate(value);
  };
  return (
    <Drawer {...props}>
      <DrawerContent className="mx-auto h-[80vh] max-w-3xl">
        <DrawerHeader className="flex justify-center items-center flex-col gap-4">
          <DrawerTitle className="text-4xl text-center font-lovelo mt-4">
            Create Rant
          </DrawerTitle>
          <DrawerDescription className="text-center max-w-xl">
            Your rant will be permanently stored on the blockchain. Once posted,
            it cannot be edited or deleted. Think carefully before sharing.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 md:px-[64px]"
          >
            <FormField
              control={form.control}
              name="rant"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Rant</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full h-[200px]"
                      placeholder="Enter your rant"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center items-center flex-col">
              <FormField
                control={form.control}
                name="toc"
                render={({ field }) => (
                  <FormItem className="mb-8 border-none">
                    <FormControl>
                      <div className="flex  items-start gap-4">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-[14px]">
                          I agree that whatever I post on this platform is my
                          sole responsibility, and the owner is not liable for
                          my content
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage className="pl-8" />
                  </FormItem>
                )}
              />

              <Button className="w-[150px]" disabled={mutation.isPending}>
                {mutation.isPending ? "Submiting...." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateDrawer;
