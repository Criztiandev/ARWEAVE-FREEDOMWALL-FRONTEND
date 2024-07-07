/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import rantApi from "@/api/rant.api";
import LoadingBlob from "@/components/loader/LoadingBlob";
import { Form } from "@/components/ui/form";
import TextAreaField from "@/components/form/TextAreaField";
import { Button } from "@/components/ui/button";
import CommentSheet from "./CommentSheet";
import { CommentFormValue, Rant } from "@/interface/rant";
import { Badge } from "@/components/ui/badge";
import useMutationComment from "@/hooks/useMutationComment";

interface Props extends DialogProps {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

const RantModal: React.FC<Props> = ({ selected, setSelected, ...props }) => {
  const [openSheet, setOpenSheet] = React.useState(false);

  const { form, mutation } = useMutationComment(selected || "");

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryFn: () => rantApi.fetchRantById(selected || ""),
    queryKey: [`rant-selected-${selected}`],
    enabled: !!selected,
  });

  const handleOpenChange = (open: boolean) => {
    if (props.onOpenChange) {
      props.onOpenChange(open);
    }
    setSelected(null);
  };

  const onSubmit = (value: CommentFormValue) => {
    mutation.mutate(value);
  };

  return (
    <>
      <Dialog {...props} onOpenChange={handleOpenChange}>
        <DialogContent className=" rounded-[5px] max-w-[520px]">
          {isLoading && (
            <>
              <DialogTitle>Loading</DialogTitle>
              <div className="h-[100px] flex justify-center items-center">
                <LoadingBlob />
              </div>
            </>
          )}

          {isError && (
            <>
              <DialogTitle>Loading</DialogTitle>
              <div>Someting went wrong</div>
            </>
          )}

          {isSuccess && (
            <DialogHeader>
              <DialogTitle className="mb-4 flex gap-2 items-center">
                {isLoading ? "Loading" : isError ? "Error" : "Rant Details"}
                {data && (
                  <Badge className="bg-[#0097e6] capitalize">
                    {(data as Rant)?.category}
                  </Badge>
                )}
              </DialogTitle>

              <div className="h-[150px]">
                <DialogDescription className="text-black overflow-auto break-all">
                  {(data as Rant)?.rant || "Rant"}
                </DialogDescription>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <TextAreaField
                    label="Comment"
                    name="comment"
                    className="h-[100px] md:h-[100px]"
                    placeholder="Enter your comment"
                  />
                  <div className="flex justify-end items-center gap-4">
                    <Button
                      type="button"
                      onClick={() => setOpenSheet((prev) => !prev)}
                    >
                      View Comment
                    </Button>
                    <Button disabled={mutation.isPending}>
                      {mutation.isPending ? "Processing..." : "Comment"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      <CommentSheet
        selected={selected}
        setSelected={setSelected}
        open={openSheet}
        onOpenChange={setOpenSheet}
      />
    </>
  );
};

export default RantModal;
