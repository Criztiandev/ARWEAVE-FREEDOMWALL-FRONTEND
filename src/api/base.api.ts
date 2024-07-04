import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://arweave-api.vercel.app/api",
});
