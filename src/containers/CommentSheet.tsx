import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
import React, { FC } from "react";

interface Props extends DialogProps {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentSheet: FC<Props> = (props) => {
  return (
    <Sheet {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
