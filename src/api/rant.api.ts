import { RantFormValue } from "@/interface/rant";
import { AxiosInstance } from "./base.api";

export default {
  fetchAllRant: async () => {
    try {
      const result = await AxiosInstance.get("/rant/get-all");
      return result.data.payload;
    } catch (e) {
      console.log(e);
      return [];
    }
  },

  createRant: async (value: RantFormValue) => {
    return await AxiosInstance.post("/rant/create", value);
  },
};
