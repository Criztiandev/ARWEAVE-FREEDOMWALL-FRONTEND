import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DialogProps } from "@radix-ui/react-dialog";
import { FC } from "react";

import { Form } from "@/components/ui/form";

import { RantFormValue } from "@/interface/rant";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextAreaField from "@/components/form/TextAreaField";
import SelectField from "@/components/form/SelectField";
import CheckboxField from "@/components/form/CheckboxField";
import useMutationRant from "@/hooks/useMutationRant";

interface Props extends DialogProps {}

const CreateDrawer: FC<Props> = (props) => {
  const { mutation, form } = useMutationRant();

  const onSubmit = (value: RantFormValue) => {
    mutation.mutate(value);
  };
  return (
    <Drawer {...props}>
      <DrawerContent className="mx-auto h-[90vh] max-w-3xl">
        <ScrollArea className="h-full">
          <DrawerHeader className="flex justify-center items-center flex-col gap-4">
            <DrawerTitle className="text-4xl text-center font-lovelo mt-4">
              Create Rant
            </DrawerTitle>
            <DrawerDescription className="text-center max-w-xl">
              Your rant will be permanently stored on the blockchain. Once
              posted, it cannot be edited or deleted. Think carefully before
              sharing.
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 md:px-[64px]"
            >
              <TextAreaField label="Rant" name="rant" />
              <SelectField
                label="Categories"
                name="category"
                options={[
                  { value: "rant", label: "Rant" },
                  { value: "joke", label: "Joke" },
                  { value: "confession", label: "Confession" },
                ]}
              />

              <div className="flex justify-center items-center flex-col">
                <CheckboxField
                  name="toc"
                  label="I agree that whatever I post on this platform is my
                            sole responsibility, and the owner is not liable for
                            my content"
                />
                <Button className="w-[150px]" disabled={mutation.isPending}>
                  {mutation.isPending ? "Submiting...." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateDrawer;
