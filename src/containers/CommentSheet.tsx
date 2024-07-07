/* eslint-disable @typescript-eslint/no-explicit-any */
import rantApi from "@/api/rant.api";
import CommentCard from "@/components/card/CommentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { toast } from "sonner";

interface Props extends DialogProps {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentSheet: FC<Props> = ({ selected, ...props }) => {
  const { isLoading, isError, data, isSuccess } = useQuery({
    queryFn: async () => await rantApi.fetchAllRantComment(selected || ""),
    queryKey: [`comment-${selected}`],
    refetchInterval: 500,
    enabled: !!selected,
  });

  if (isError) {
    toast.error("Something went wrong, Please try again later", {
      position: "top-right",
    });
  }

  return (
    <Sheet {...props}>
      <SheetContent className="p-0">
        <ScrollArea className="h-screen p-6">
          {isLoading && <div>Loading</div>}
          {isSuccess && (
            <SheetHeader>
              <SheetTitle>Comments</SheetTitle>
              <div className="flex flex-col gap-4">
                {data?.comment?.map((items: any, index: number) => (
                  <CommentCard key={index} comment={items.comment} />
                ))}
              </div>
            </SheetHeader>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
