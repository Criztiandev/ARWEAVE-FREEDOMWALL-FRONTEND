/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentFormValue, Rant, RantFormValue } from "@/interface/rant";
import { AxiosInstance } from "./base.api";

interface ErrorResponse {
  error: boolean;
  message: string;
}

export default {
  fetchAllRant: async (page: number = 1, limit: number = 10) => {
    const result = await AxiosInstance.get(
      `/rant/get-all?page=${page}&limit=${limit}`
    );
    return result.data?.payload;
  },

  fetchRantById: async (id: string): Promise<Rant | ErrorResponse> => {
    const result = await AxiosInstance.get<Rant>(`/rant/details/${id}`);
    return result.data;
  },

  createRant: async (value: RantFormValue) => {
    return await AxiosInstance.post("/rant/create", value);
  },

  commentRant: async (id: string, comment: CommentFormValue) => {
    return await AxiosInstance.post(`/rant/comment/${id}`, comment);
  },
};
