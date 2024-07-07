import rantApi from "@/api/rant.api";
import { CommentFormValue } from "@/interface/rant";
import { CommentValidation } from "@/service/validation/rant.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useMutationComment = (id: string) => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: { comment: "" },
    resolver: zodResolver(CommentValidation),
  });

  const mutation = useMutation({
    mutationFn: async (value: CommentFormValue) =>
      rantApi.commentRant(id, value),
    mutationKey: ["comment-mutation"],

    onSuccess: (response: AxiosResponse) => {
      form.reset();
      toast.success(response.data?.message || "Created successfully", {
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["comment-mutation"],
      });
    },
    onError: () => {
      toast.error("Something went wrong, Please try again later", {
        position: "top-right",
      });
    },
  });

  return { form, mutation };
};

export default useMutationComment;
