import rantApi from "@/api/rant.api";
import { RantFormValue } from "@/interface/rant";
import { RantValidationSchema } from "@/service/validation/rant.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useMutationRant = () => {
  const queryClient = useQueryClient();
  const form = useForm<RantFormValue>({
    defaultValues: {
      rant: "",
      category: "",
      toc: false,
    },
    resolver: zodResolver(RantValidationSchema),
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

  return { mutation, form };
};

export default useMutationRant;
