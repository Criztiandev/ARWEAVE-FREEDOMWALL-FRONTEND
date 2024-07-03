import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

interface Props extends DialogProps {}

const RantModal: React.FC<Props> = (props) => {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4">Rant #1</DialogTitle>
          <DialogDescription>
            Your voice matters, and now it can echo through time. This freedom
            wall, powered by Arweave's permanent storage, ensures your thoughts,
            ideas, and expressions will remain uncensored and accessible
            forever. Before you post, remember: your words will become an
            immutable part of history. Use this platform wisely to share what
            truly deserves to be eternal.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RantModal;
